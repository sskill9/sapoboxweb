// ===== [builder.js：ヘッダー] =====
/*
  builder.js
  - MCQツール：作成ツール（testpack 生成）
  - 仕様書準拠：
    - JSONファイルは使わず、JSファイル（testpack_*.js）として出力
    - window.TESTPACKS（配列）へ push する形式（複数読込の正本）
    - 平文正解を保持しない（answerEnc のみ）
    - 暗号：CryptoJS / AES-CBC + PBKDF2(SHA-256) / MACなし
    - SVキー：数字4桁（正規化ルールあり）
  依存：
    - CryptoJS が window.CryptoJS に存在すること（libs/crypto-js/ を読み込み）
*/
// ===== [builder.js：ヘッダーここまで] =====

// ===== [builder.js：即時関数スコープ] =====
(function () {
  'use strict';

  // ===== [builder.js：ユーティリティ] =====
  function padLeftZeros(str, len) {
    var s = String(str);
    while (s.length < len) s = '0' + s;
    return s;
  }

  function isFiniteNumber(n) {
    return typeof n === 'number' && isFinite(n);
  }

  function toJstIsoString(dateObj) {
    var d = dateObj instanceof Date ? dateObj : new Date();
    var t = d.getTime();
    // JST(+09:00)
    var jst = new Date(t + (9 * 60 * 60 * 1000));
    var y = jst.getUTCFullYear();
    var m = padLeftZeros(jst.getUTCMonth() + 1, 2);
    var da = padLeftZeros(jst.getUTCDate(), 2);
    var hh = padLeftZeros(jst.getUTCHours(), 2);
    var mm = padLeftZeros(jst.getUTCMinutes(), 2);
    var ss = padLeftZeros(jst.getUTCSeconds(), 2);
    return y + '-' + m + '-' + da + 'T' + hh + ':' + mm + ':' + ss + '+09:00';
  }

  function toJstCompactTimestamp(dateObj) {
    var d = dateObj instanceof Date ? dateObj : new Date();
    var t = d.getTime();
    // JST(+09:00)
    var jst = new Date(t + (9 * 60 * 60 * 1000));
    var y = jst.getUTCFullYear();
    var m = padLeftZeros(jst.getUTCMonth() + 1, 2);
    var da = padLeftZeros(jst.getUTCDate(), 2);
    var hh = padLeftZeros(jst.getUTCHours(), 2);
    var mi = padLeftZeros(jst.getUTCMinutes(), 2);
    var ss = padLeftZeros(jst.getUTCSeconds(), 2);
    return String(y) + String(m) + String(da) + '_' + String(hh) + String(mi) + String(ss);
  }

  function escapeHtml(str) {
    var s = String(str == null ? '' : str);
    return s
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function bytesToBase64(bytes) {
    var bin = '';
    var i;
    for (i = 0; i < bytes.length; i++) {
      bin += String.fromCharCode(bytes[i]);
    }
    return btoa(bin);
  }

  function randomBytesBase64(byteLen) {
    var u8 = new Uint8Array(Number(byteLen || 0));
    window.crypto.getRandomValues(u8);
    return bytesToBase64(u8);
  }

  function hasMcqCrypto() {
    return !!(window.MCQCrypto
      && typeof window.MCQCrypto.encryptJsonAnswerArray === 'function'
      && typeof window.MCQCrypto.decryptJsonAnswerArray === 'function');
  }

  function requireCryptoJs() {
    if (!window.CryptoJS) {
      return { ok: false, error: 'CryptoJS が見つかりません（libs/crypto-js を読み込んでください）' };
    }
    return { ok: true, error: '' };
  }

  function wordArrayFromB64(b64) {
    return window.CryptoJS.enc.Base64.parse(b64);
  }

  function wordArrayToB64(wa) {
    return wa.toString(window.CryptoJS.enc.Base64);
  }

  function randomBytesWordArray(byteLen) {
    return window.CryptoJS.lib.WordArray.random(byteLen);
  }

  function pbkdf2KeyFromSvKey(svKeyNormalized, saltWordArray, iterations, keyBits) {
    var keySizeWords = (keyBits / 32); // 256bit => 8 words
    var key = window.CryptoJS.PBKDF2(svKeyNormalized, saltWordArray, {
      keySize: keySizeWords,
      iterations: iterations,
      hasher: window.CryptoJS.algo.SHA256
    });
    return key;
  }

  function aesCbcEncryptToB64(plaintextUtf8, keyWordArray, ivWordArray) {
    var encrypted = window.CryptoJS.AES.encrypt(plaintextUtf8, keyWordArray, {
      iv: ivWordArray,
      mode: window.CryptoJS.mode.CBC,
      padding: window.CryptoJS.pad.Pkcs7
    });
    // encrypted.ciphertext は WordArray
    return encrypted.ciphertext.toString(window.CryptoJS.enc.Base64);
  }

  function downloadTextFile(fileName, textContent) {
    var blob = new Blob([textContent], { type: 'text/plain;charset=utf-8' });
    var a = document.createElement('a');
    var url = URL.createObjectURL(blob);
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(function () {
      try { URL.revokeObjectURL(url); } catch (e) {}
    }, 1000);
  }

  function makeElem(tag, className, htmlOrNull) {
    var el = document.createElement(tag);
    if (className) el.className = className;
    if (htmlOrNull !== null && htmlOrNull !== undefined) {
      el.innerHTML = htmlOrNull;
    }
    return el;
  }

  function sanitizeFileNamePart(str) {
    var s = String(str || '');
    // Windows でも安全な範囲に
    s = s.replace(/[\\\/:\*\?"<>\|]/g, '_');
    s = s.replace(/\s+/g, '_');
    s = s.replace(/_+/g, '_');
    s = s.replace(/^_+|_+$/g, '');
    if (!s) s = 'test';
    return s;
  }
  // ===== [builder.js：ユーティリティここまで] =====

  // ===== [builder.js：SVキー正規化] =====
  function normalizeSvKey(input) {
    var raw = String(input == null ? '' : input);
    raw = raw.replace(/\s+/g, '');
    if (!raw) return { ok: false, error: 'SVキーを入力してください（数字4桁）' };
    if (!/^\d+$/.test(raw)) return { ok: false, error: 'SVキーは数字のみです（数字4桁）' };
    if (raw.length > 4) return { ok: false, error: 'SVキーは4桁です（入力が長すぎます）' };
    // 4桁未満は左ゼロ埋め
    var normalized = padLeftZeros(raw, 4);
    return { ok: true, error: '', value: raw, keyNormalized: normalized };
  }
  // ===== [builder.js：SVキー正規化ここまで] =====

  // ===== [builder.js：状態（state）] =====
  var state = {
    meta: {
      formatVersion: '1.0',
      testId: '',
      testName: '',
      passLinePercent: 80,
      shuffleQuestions: true,
      shuffleChoices: true,
      locale: 'ja-JP'
    },
    security: {
      scheme: 'cj-aes-cbc-pbkdf2',
      kdf: {
        name: 'PBKDF2',
        hash: 'SHA-256',
        iterations: 300000
      },
      cipher: {
        name: 'AES-CBC',
        keyLength: 256
      },
      saltB64: '' // 作成時に生成
    },
    questions: []
  };

  function makeDefaultQuestion(index1based) {
    var qid = 'Q' + padLeftZeros(index1based, 3);
    return {
      qid: qid,
      type: 'single', // 'single' | 'multi'
      body: '',
      explanation: '',
      choices: [
        { cid: 'A', text: '' },
        { cid: 'B', text: '' },
        { cid: 'C', text: '' },
        { cid: 'D', text: '' }
      ],
      correctCids: [] // ['A'] or ['A','C']
    };
  }

  function ensureAtLeastOneQuestion() {
    if (!Array.isArray(state.questions) || state.questions.length === 0) {
      state.questions = [makeDefaultQuestion(1)];
    }
  }

  function rebuildQidsSequential() {
    for (var i = 0; i < state.questions.length; i++) {
      state.questions[i].qid = 'Q' + padLeftZeros(i + 1, 3);
    }
  }
  // ===== [builder.js：状態（state）ここまで] =====

  // ===== [builder.js：CID正規化] =====
  function normalizeCidArray(arr) {
    var a = Array.isArray(arr) ? arr : [];
    var out = [];
    var seen = {};
    for (var i = 0; i < a.length; i++) {
      var cid = String(a[i] || '').trim().toUpperCase();
      if (!cid) continue;
      if (seen[cid]) continue;
      seen[cid] = true;
      out.push(cid);
    }
    out.sort();
    return out;
  }
  // ===== [builder.js：CID正規化ここまで] =====

  // ===== [builder.js：バリデーション] =====
  function validateMeta() {
    var errors = [];
    var testId = String(state.meta.testId || '').trim();
    var testName = String(state.meta.testName || '').trim();

    if (!testId) errors.push('testId を入力してください');
    if (!testName) errors.push('testName を入力してください');

    var pass = Number(state.meta.passLinePercent);
    if (!isFiniteNumber(pass) || pass < 0 || pass > 100) errors.push('passLinePercent は 0〜100 の数値です');

    if (!String(state.meta.locale || '').trim()) errors.push('locale を入力してください');

    return errors;
  }

  function validateQuestions() {
    var errors = [];
    if (!Array.isArray(state.questions) || state.questions.length === 0) {
      errors.push('questions がありません');
      return errors;
    }

    for (var i = 0; i < state.questions.length; i++) {
      var q = state.questions[i];
      var idx = i + 1;

      if (!String(q.qid || '').trim()) errors.push('Q' + String(idx) + '：qid が空です');
      if (!String(q.type || '').trim()) errors.push(String(q.qid) + '：type が空です');
      if (String(q.type) !== 'single' && String(q.type) !== 'multi') errors.push(String(q.qid) + '：type は single/multi のみです');
      if (!String(q.body || '').trim()) errors.push(String(q.qid) + '：body（設問文）が空です');

      if (!Array.isArray(q.choices) || q.choices.length < 2) {
        errors.push(String(q.qid) + '：choices が不足しています');
      } else {
        var cids = {};
        for (var c = 0; c < q.choices.length; c++) {
          var cid = String(q.choices[c].cid || '').trim().toUpperCase();
          var txt = String(q.choices[c].text || '').trim();
          if (!cid) errors.push(String(q.qid) + '：choice[' + String(c) + '] の cid が空です');
          if (!txt) errors.push(String(q.qid) + '：choice[' + String(cid || c) + '] の text が空です');
          if (cid) {
            if (cids[cid]) errors.push(String(q.qid) + '：cid[' + cid + '] が重複しています');
            cids[cid] = true;
          }
        }
      }

      var correct = normalizeCidArray(q.correctCids || []);
      if (correct.length === 0) errors.push(String(q.qid) + '：正解が選択されていません');

      // correctCids が choices に含まれるか
      var choiceMap = {};
      for (var k = 0; k < q.choices.length; k++) {
        choiceMap[String(q.choices[k].cid || '').trim().toUpperCase()] = true;
      }
      for (var j = 0; j < correct.length; j++) {
        if (!choiceMap[correct[j]]) {
          errors.push(String(q.qid) + '：正解CID[' + String(correct[j]) + ']が選択肢に存在しません');
        }
      }
    }

    return errors;
  }

  function validateAll() {
    var errs = [];
    errs = errs.concat(validateMeta());
    errs = errs.concat(validateQuestions());
    return errs;
  }
  // ===== [builder.js：バリデーションここまで] =====

  // ===== [builder.js：testpack生成（暗号化）] =====
  function buildTestpackObjectCryptoJs(svKeyNormalized) {
    // CryptoJS 必須
    var ck = requireCryptoJs();
    if (!ck.ok) {
      return { ok: false, pack: null, error: ck.error };
    }

    // salt（テスト全体共通）
    var saltB64 = String(state.security.saltB64 || '');
    if (!saltB64) {
      // 16 bytes
      var saltWa = randomBytesWordArray(16);
      saltB64 = wordArrayToB64(saltWa);
    }
    var saltWa2 = wordArrayFromB64(saltB64);

    // key 導出
    var iterations = Number(state.security.kdf.iterations);
    var keyBits = Number(state.security.cipher.keyLength);
    var keyWa = pbkdf2KeyFromSvKey(svKeyNormalized, saltWa2, iterations, keyBits);

    // questions を output 用に変換
    var outQuestions = [];
    for (var i = 0; i < state.questions.length; i++) {
      var q = state.questions[i];

      // 正解CID配列を正規化して暗号化
      var normalizedCorrect = normalizeCidArray(q.correctCids || []);
      var plaintext = JSON.stringify(normalizedCorrect); // UTF-8 前提（JS文字列）

      var ivWa = randomBytesWordArray(16);
      var ivB64 = wordArrayToB64(ivWa);

      var dataB64 = aesCbcEncryptToB64(plaintext, keyWa, ivWa);

      // 出力用 question
      outQuestions.push({
        qid: String(q.qid),
        type: String(q.type),
        body: String(q.body),
        choices: (function () {
          var arr = [];
          for (var c = 0; c < q.choices.length; c++) {
            arr.push({
              cid: String(q.choices[c].cid),
              text: String(q.choices[c].text)
            });
          }
          return arr;
        })(),
        // explanation は保持のみ（結果TXTには出さない前提）
        explanation: String(q.explanation || ''),
        answerEnc: {
          alg: 'AES-CBC',
          ivB64: ivB64,
          dataB64: dataB64
        }
      });
    }

    // meta 作成
    var now = new Date();
    var meta = {
      formatVersion: String(state.meta.formatVersion || '1.0'),
      testId: String(state.meta.testId),
      testName: String(state.meta.testName),
      createdAt: toJstIsoString(now),
      passLinePercent: Number(state.meta.passLinePercent),
      shuffleQuestions: !!state.meta.shuffleQuestions,
      shuffleChoices: !!state.meta.shuffleChoices,
      locale: String(state.meta.locale || 'ja-JP')
    };

    var security = {
      scheme: String(state.security.scheme),
      kdf: {
        name: String(state.security.kdf.name),
        hash: String(state.security.kdf.hash),
        iterations: Number(state.security.kdf.iterations)
      },
      cipher: {
        name: String(state.security.cipher.name),
        keyLength: Number(state.security.cipher.keyLength)
      },
      saltB64: saltB64
    };

    var pack = {
      meta: meta,
      security: security,
      questions: outQuestions
    };

    return { ok: true, pack: pack, error: '' };
  }

  async function buildTestpackObjectWebCrypto(svKeyNormalized) {
    if (!hasMcqCrypto()) {
      return { ok: false, pack: null, error: 'MCQCrypto が見つかりません（crypto.js を読み込んでください）' };
    }

    // keyLength は 256 固定（WebCrypto 実装側も 32 bytes）
    var keyBits = Number(state.security.cipher.keyLength);
    if (keyBits !== 256) {
      return { ok: false, pack: null, error: 'keyLength は 256 のみ対応です（現在：' + String(keyBits) + '）' };
    }

    // salt（テスト全体共通）
    var saltB64 = String(state.security.saltB64 || '');
    if (!saltB64) {
      // 16 bytes
      saltB64 = randomBytesBase64(16);
    }

    // questions を output 用に変換（正解CID配列を暗号化）
    var outQuestions = [];
    var iterations = Number(state.security.kdf.iterations);

    for (var i = 0; i < state.questions.length; i++) {
      var q = state.questions[i];

      var normalizedCorrect = normalizeCidArray(q.correctCids || []);

      try {
        var enc = await window.MCQCrypto.encryptJsonAnswerArray(
          normalizedCorrect,
          String(svKeyNormalized),
          String(saltB64),
          Number(iterations)
        );

        var ivB64 = String(enc.ivB64 || '');
        var ctB64 = String(enc.ctB64 || '');

        outQuestions.push({
          qid: String(q.qid),
          type: String(q.type),
          body: String(q.body),
          choices: (function () {
            var arr = [];
            for (var c = 0; c < q.choices.length; c++) {
              arr.push({
                cid: String(q.choices[c].cid),
                text: String(q.choices[c].text)
              });
            }
            return arr;
          })(),
          // explanation は保持のみ（結果TXTには出さない前提）
          explanation: String(q.explanation || ''),
          answerEnc: {
            alg: 'AES-CBC',
            ivB64: ivB64,
            // 既存実装との互換を考慮し、dataB64 と ctB64 を両方持つ
            dataB64: ctB64,
            ctB64: ctB64
          }
        });
      } catch (e) {
        return { ok: false, pack: null, error: '暗号化に失敗しました：' + String(e && e.message ? e.message : e) };
      }
    }

    // meta 作成
    var now = new Date();
    var meta = {
      formatVersion: String(state.meta.formatVersion || '1.0'),
      testId: String(state.meta.testId),
      testName: String(state.meta.testName),
      createdAt: toJstIsoString(now),
      passLinePercent: Number(state.meta.passLinePercent),
      shuffleQuestions: !!state.meta.shuffleQuestions,
      shuffleChoices: !!state.meta.shuffleChoices,
      locale: String(state.meta.locale || 'ja-JP')
    };

    var security = {
      scheme: String(state.security.scheme),
      kdf: {
        name: String(state.security.kdf.name),
        hash: String(state.security.kdf.hash),
        iterations: Number(state.security.kdf.iterations)
      },
      cipher: {
        name: String(state.security.cipher.name),
        keyLength: Number(state.security.cipher.keyLength)
      },
      saltB64: String(saltB64)
    };

    var pack = {
      meta: meta,
      security: security,
      questions: outQuestions
    };

    return { ok: true, pack: pack, error: '' };
  }

  async function buildTestpackObjectAsync(svKeyNormalized) {
    // CryptoJS があれば従来通り（同期）
    var ck = requireCryptoJs();
    if (ck.ok) {
      return buildTestpackObjectCryptoJs(svKeyNormalized);
    }
    // CryptoJS が無ければ WebCrypto 実装（crypto.js / MCQCrypto）へフォールバック
    return await buildTestpackObjectWebCrypto(svKeyNormalized);
  }

  function generateTestpackJsText(packObj) {
    // window.TESTPACKS push 形式（重複 testId は拒否）
    var packJson = JSON.stringify(packObj, null, 2);

    var js = '';
    js += '(function(){\n';
    js += '  \'use strict\';\n';
    js += '  if (!window.TESTPACKS) window.TESTPACKS = [];\n';
    js += '  var pack = ' + packJson + ';\n';
    js += '  var exists = false;\n';
    js += '  try {\n';
    js += '    for (var i=0;i<window.TESTPACKS.length;i++){\n';
    js += '      if (window.TESTPACKS[i] && window.TESTPACKS[i].meta && window.TESTPACKS[i].meta.testId === pack.meta.testId) { exists = true; break; }\n';
    js += '    }\n';
    js += '  } catch (e) {}\n';
    js += '  if (!exists) {\n';
    js += '    window.TESTPACKS.push(pack);\n';
    js += '  }\n';
    js += '})();\n';
    return js;
  }
  // ===== [builder.js：testpack生成（暗号化）ここまで] =====

  // ===== [builder.js：UI描画] =====
  function mount(container) {
    ensureAtLeastOneQuestion();

    var root = container;
    if (typeof container === 'string') {
      root = document.querySelector(container);
    }
    if (!root) {
      throw new Error('builder.js: mount 先の要素が見つかりません');
    }

    // 既存をクリア
    while (root.firstChild) root.removeChild(root.firstChild);

    var wrapper = makeElem('div', 'mcq-builder');

    // タイトル
    var title = makeElem(
      'div',
      'mb-3',
      '<h4 class="mb-1">作成（builder）</h4>'
      + '<div class="text-muted small">testpack を生成してダウンロードします（JSONは使用しません）</div>'
    );
    wrapper.appendChild(title);

    // エラーボックス
    var alertBox = makeElem('div', 'alert alert-danger d-none', '');
    wrapper.appendChild(alertBox);

    function showError(msg) {
      alertBox.classList.remove('d-none');
      alertBox.innerHTML = escapeHtml(msg).replace(/\n/g, '<br>');
    }

    function hideError() {
      alertBox.classList.add('d-none');
      alertBox.innerHTML = '';
    }

    // META カード
    var metaCard = makeElem('div', 'card mb-3', '');
    metaCard.appendChild(makeElem('div', 'card-header', '<strong>meta</strong>'));
    var metaBody = makeElem('div', 'card-body', '');
    metaCard.appendChild(metaBody);

    var metaRow1 = makeElem('div', 'row g-3', '');
    var colTestName = makeElem('div', 'col-md-6', '');
    var inputTestName = makeElem('input', 'form-control', null);
    inputTestName.type = 'text';
    inputTestName.placeholder = '例：個人情報保護 基礎';
    inputTestName.value = state.meta.testName;

    colTestName.appendChild(makeElem('label', 'form-label', 'testName'));
    colTestName.appendChild(inputTestName);
    metaRow1.appendChild(colTestName);

    var colTestId = makeElem('div', 'col-md-6', '');
    var inputTestId = makeElem('input', 'form-control', null);
    inputTestId.type = 'text';
    inputTestId.placeholder = '例：pc_basic_01';
    inputTestId.value = state.meta.testId;

    colTestId.appendChild(makeElem('label', 'form-label', 'testId'));
    colTestId.appendChild(inputTestId);
    metaRow1.appendChild(colTestId);

    metaBody.appendChild(metaRow1);

    var metaRow2 = makeElem('div', 'row g-3 mt-0', '');

    var colPass = makeElem('div', 'col-md-3', '');
    var inputPass = makeElem('input', 'form-control', null);
    inputPass.type = 'number';
    inputPass.min = '0';
    inputPass.max = '100';
    inputPass.step = '1';
    inputPass.value = String(state.meta.passLinePercent);

    colPass.appendChild(makeElem('label', 'form-label', 'passLinePercent'));
    colPass.appendChild(inputPass);
    metaRow2.appendChild(colPass);

    var colLocale = makeElem('div', 'col-md-3', '');
    var inputLocale = makeElem('input', 'form-control', null);
    inputLocale.type = 'text';
    inputLocale.value = state.meta.locale;

    colLocale.appendChild(makeElem('label', 'form-label', 'locale'));
    colLocale.appendChild(inputLocale);
    metaRow2.appendChild(colLocale);

    var colShuffleQ = makeElem('div', 'col-md-3', '');
    var chkShuffleQ = makeElem('input', 'form-check-input', null);
    chkShuffleQ.type = 'checkbox';
    chkShuffleQ.checked = !!state.meta.shuffleQuestions;
    var wrapShuffleQ = makeElem('div', 'form-check mt-4', '');
    wrapShuffleQ.appendChild(chkShuffleQ);
    wrapShuffleQ.appendChild(makeElem('label', 'form-check-label ms-2', 'shuffleQuestions'));
    colShuffleQ.appendChild(wrapShuffleQ);
    metaRow2.appendChild(colShuffleQ);

    var colShuffleC = makeElem('div', 'col-md-3', '');
    var chkShuffleC = makeElem('input', 'form-check-input', null);
    chkShuffleC.type = 'checkbox';
    chkShuffleC.checked = !!state.meta.shuffleChoices;
    var wrapShuffleC = makeElem('div', 'form-check mt-4', '');
    wrapShuffleC.appendChild(chkShuffleC);
    wrapShuffleC.appendChild(makeElem('label', 'form-check-label ms-2', 'shuffleChoices'));
    colShuffleC.appendChild(wrapShuffleC);
    metaRow2.appendChild(colShuffleC);

    metaBody.appendChild(metaRow2);

    var metaRow3 = makeElem('div', 'row g-3 mt-0', '');
    var colFmt = makeElem('div', 'col-md-4', '');
    var inputFmt = makeElem('input', 'form-control', null);
    inputFmt.type = 'text';
    inputFmt.value = state.meta.formatVersion;

    colFmt.appendChild(makeElem('label', 'form-label', 'formatVersion'));
    colFmt.appendChild(inputFmt);
    metaRow3.appendChild(colFmt);

    var colInfo = makeElem('div', 'col-md-4', '');
    colInfo.appendChild(makeElem('div', 'form-text mt-4', 'createdAt はダウンロード生成時に JST(+09:00) で自動設定します'));
    metaRow3.appendChild(colInfo);

    metaBody.appendChild(metaRow3);

    wrapper.appendChild(metaCard);

    // 質問リスト
    var qHeaderRow = makeElem('div', 'd-flex align-items-center justify-content-between mb-2', '');
    qHeaderRow.appendChild(makeElem('h5', 'mb-0', 'questions'));
    var btnAddQ = makeElem('button', 'btn btn-sm btn-primary', '＋ 設問を追加');
    btnAddQ.type = 'button';
    qHeaderRow.appendChild(btnAddQ);
    wrapper.appendChild(qHeaderRow);

    var qList = makeElem('div', '', '');
    wrapper.appendChild(qList);

    function renderQuestions() {
      while (qList.firstChild) qList.removeChild(qList.firstChild);

      for (var i = 0; i < state.questions.length; i++) {
        (function (idx) {
          var q = state.questions[idx];

          var card = makeElem('div', 'card mb-3', '');
          card.appendChild(makeElem('div', 'card-header', '<strong>' + escapeHtml(q.qid) + '</strong>'));

          var body = makeElem('div', 'card-body', '');
          card.appendChild(body);

          // type
          var rowTop = makeElem('div', 'row g-3', '');

          var colType = makeElem('div', 'col-md-4', '');
          colType.appendChild(makeElem('label', 'form-label', 'type'));
          var selType = makeElem('select', 'form-select', '');
          selType.innerHTML =
            '<option value="single">single</option>'
            + '<option value="multi">multi</option>';
          selType.value = String(q.type);
          colType.appendChild(selType);

          var colBtns = makeElem('div', 'col-md-8', '');
          var btnRow = makeElem('div', 'd-flex gap-2 mt-4 justify-content-end', '');
          var btnDel = makeElem('button', 'btn btn-outline-danger btn-sm', '削除');
          btnDel.type = 'button';

          var btnUp = makeElem('button', 'btn btn-outline-secondary btn-sm', '↑');
          btnUp.type = 'button';
          var btnDown = makeElem('button', 'btn btn-outline-secondary btn-sm', '↓');
          btnDown.type = 'button';

          btnRow.appendChild(btnUp);
          btnRow.appendChild(btnDown);
          btnRow.appendChild(btnDel);

          colBtns.appendChild(btnRow);

          rowTop.appendChild(colType);
          rowTop.appendChild(colBtns);

          body.appendChild(rowTop);

          // body
          var rowBody = makeElem('div', 'row g-3 mt-0', '');
          var colBody = makeElem('div', 'col-12', '');
          colBody.appendChild(makeElem('label', 'form-label', 'body'));
          var taBody = makeElem('textarea', 'form-control', null);
          taBody.rows = 3;
          taBody.value = String(q.body || '');
          colBody.appendChild(taBody);
          rowBody.appendChild(colBody);
          body.appendChild(rowBody);

          // explanation
          var rowExp = makeElem('div', 'row g-3 mt-0', '');
          var colExp = makeElem('div', 'col-12', '');
          colExp.appendChild(makeElem('label', 'form-label', 'explanation（任意）'));
          var taExp = makeElem('textarea', 'form-control', null);
          taExp.rows = 2;
          taExp.value = String(q.explanation || '');
          colExp.appendChild(taExp);
          rowExp.appendChild(colExp);
          body.appendChild(rowExp);

          // choices
          var choicesWrap = makeElem('div', 'mt-3', '');
          choicesWrap.appendChild(makeElem('div', 'fw-bold mb-2', 'choices'));

          for (var c = 0; c < q.choices.length; c++) {
            (function (choiceIdx) {
              var ch = q.choices[choiceIdx];

              var rowCh = makeElem('div', 'row g-2 align-items-center mb-2', '');

              var colCid = makeElem('div', 'col-2 col-md-1', '');
              var inputCid = makeElem('input', 'form-control', null);
              inputCid.type = 'text';
              inputCid.value = String(ch.cid || '');
              colCid.appendChild(inputCid);

              var colText = makeElem('div', 'col-10 col-md-7', '');
              var inputTxt = makeElem('input', 'form-control', null);
              inputTxt.type = 'text';
              inputTxt.placeholder = '選択肢の文言';
              inputTxt.value = String(ch.text || '');
              colText.appendChild(inputTxt);

              var colCorrect = makeElem('div', 'col-6 col-md-2', '');
              var wrapCk = makeElem('div', 'form-check', '');
              var ck = makeElem('input', 'form-check-input', null);
              ck.type = (String(q.type) === 'multi') ? 'checkbox' : 'radio';
              ck.name = 'correct_' + String(q.qid);
              ck.checked = (Array.isArray(q.correctCids) && q.correctCids.indexOf(String(ch.cid || '').toUpperCase()) >= 0);
              wrapCk.appendChild(ck);
              wrapCk.appendChild(makeElem('label', 'form-check-label ms-2', '正解'));
              colCorrect.appendChild(wrapCk);

              var colBtns2 = makeElem('div', 'col-6 col-md-2 text-end', '');
              var btnDelCh = makeElem('button', 'btn btn-outline-danger btn-sm', '削除');
              btnDelCh.type = 'button';
              colBtns2.appendChild(btnDelCh);

              rowCh.appendChild(colCid);
              rowCh.appendChild(colText);
              rowCh.appendChild(colCorrect);
              rowCh.appendChild(colBtns2);

              choicesWrap.appendChild(rowCh);

              // handlers
              inputCid.addEventListener('input', function () {
                ch.cid = String(inputCid.value || '').trim().toUpperCase();
                // correct を更新（CID変更時）
                var oldCorrect = normalizeCidArray(q.correctCids || []);
                var newCorrect = [];
                for (var k = 0; k < oldCorrect.length; k++) {
                  if (oldCorrect[k] === String(ch.cid || '').trim().toUpperCase()) {
                    newCorrect.push(oldCorrect[k]);
                  }
                }
                q.correctCids = newCorrect;
              });

              inputTxt.addEventListener('input', function () {
                ch.text = String(inputTxt.value || '');
              });

              ck.addEventListener('change', function () {
                var cidNow = String(ch.cid || '').trim().toUpperCase();
                if (!cidNow) return;
                if (String(q.type) === 'multi') {
                  var arr = normalizeCidArray(q.correctCids || []);
                  if (ck.checked) {
                    arr.push(cidNow);
                  } else {
                    var filtered = [];
                    for (var t = 0; t < arr.length; t++) {
                      if (arr[t] !== cidNow) filtered.push(arr[t]);
                    }
                    arr = filtered;
                  }
                  q.correctCids = normalizeCidArray(arr);
                } else {
                  if (ck.checked) {
                    q.correctCids = [cidNow];
                    // 同一qidのradioを反映（UI上の整合）
                    // ※ DOM上は name 共有なので自然に切り替わるが、念のため
                  }
                }
              });

              btnDelCh.addEventListener('click', function () {
                if (q.choices.length <= 2) {
                  showError('choices は最低2つ必要です');
                  return;
                }
                q.choices.splice(choiceIdx, 1);
                // correct からも削除
                var arr2 = normalizeCidArray(q.correctCids || []);
                var filtered2 = [];
                for (var t2 = 0; t2 < arr2.length; t2++) {
                  if (arr2[t2] !== String(ch.cid || '').trim().toUpperCase()) filtered2.push(arr2[t2]);
                }
                q.correctCids = filtered2;
                renderQuestions();
              });
            })(c);
          }

          var btnAddChoice = makeElem('button', 'btn btn-outline-primary btn-sm mt-2', '＋ 選択肢を追加');
          btnAddChoice.type = 'button';
          choicesWrap.appendChild(btnAddChoice);

          btnAddChoice.addEventListener('click', function () {
            // 次のCIDを推定（A,B,C... / 既存から重複回避）
            var used = {};
            for (var u = 0; u < q.choices.length; u++) {
              used[String(q.choices[u].cid || '').trim().toUpperCase()] = true;
            }
            var letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
            var next = '';
            for (var p = 0; p < letters.length; p++) {
              var cand = letters.charAt(p);
              if (!used[cand]) { next = cand; break; }
            }
            if (!next) next = 'X';
            q.choices.push({ cid: next, text: '' });
            renderQuestions();
          });

          body.appendChild(choicesWrap);

          // footer controls
          var footer = makeElem('div', 'card-footer d-flex justify-content-between align-items-center', '');
          var small = makeElem('div', 'text-muted small', '正解はCIDで保持します（例：A / B）');
          footer.appendChild(small);

          var right = makeElem('div', 'd-flex gap-2', '');
          var btnDup = makeElem('button', 'btn btn-outline-secondary btn-sm', '複製');
          btnDup.type = 'button';
          right.appendChild(btnDup);
          footer.appendChild(right);

          card.appendChild(footer);

          // card handlers
          selType.addEventListener('change', function () {
            q.type = String(selType.value);
            // multi→single の場合、正解を1つに落とす
            if (String(q.type) === 'single') {
              var arr = normalizeCidArray(q.correctCids || []);
              q.correctCids = arr.length > 0 ? [arr[0]] : [];
            }
            renderQuestions();
          });

          taBody.addEventListener('input', function () {
            q.body = String(taBody.value || '');
          });

          taExp.addEventListener('input', function () {
            q.explanation = String(taExp.value || '');
          });

          btnDel.addEventListener('click', function () {
            if (state.questions.length <= 1) {
              showError('設問は最低1つ必要です');
              return;
            }
            state.questions.splice(idx, 1);
            rebuildQidsSequential();
            renderQuestions();
          });

          btnUp.addEventListener('click', function () {
            if (idx <= 0) return;
            var tmp = state.questions[idx - 1];
            state.questions[idx - 1] = state.questions[idx];
            state.questions[idx] = tmp;
            rebuildQidsSequential();
            renderQuestions();
          });

          btnDown.addEventListener('click', function () {
            if (idx >= state.questions.length - 1) return;
            var tmp2 = state.questions[idx + 1];
            state.questions[idx + 1] = state.questions[idx];
            state.questions[idx] = tmp2;
            rebuildQidsSequential();
            renderQuestions();
          });

          btnDup.addEventListener('click', function () {
            var clone = JSON.parse(JSON.stringify(q));
            state.questions.splice(idx + 1, 0, clone);
            rebuildQidsSequential();
            renderQuestions();
          });

          qList.appendChild(card);
        })(i);
      }
    }

    renderQuestions();

    // generate card
    var genCard = makeElem('div', 'card mt-3', '');
    genCard.appendChild(makeElem('div', 'card-header', '<strong>生成</strong>（SVキー入力 → 暗号化 → testpack_*.jsダウンロード）'));
    var genBody = makeElem('div', 'card-body', '');
    genCard.appendChild(genBody);

    var genRow = makeElem('div', 'row g-3', '');

    var colSv = makeElem('div', 'col-md-4', '');
    var inputSv = makeElem('input', 'form-control', null);
    inputSv.type = 'password';
    inputSv.placeholder = '4桁（例：0007）';
    inputSv.autocomplete = 'off';
    inputSv.inputMode = 'numeric';

    colSv.appendChild(makeElem('label', 'form-label', 'SVキー（数字4桁）'));
    colSv.appendChild(inputSv);

    var colBtn = makeElem('div', 'col-md-8', '');
    var btnGen = makeElem('button', 'btn btn-success mt-4', 'testpack を生成してダウンロード');
    btnGen.type = 'button';

    var genHelp = makeElem('div', 'form-text mt-2', '出力されるJSは window.TESTPACKS に push する形式です（同一testIdは重複登録されません）');

    colBtn.appendChild(btnGen);
    colBtn.appendChild(genHelp);

    genRow.appendChild(colSv);
    genRow.appendChild(colBtn);

    genBody.appendChild(genRow);

    wrapper.appendChild(genCard);

    // handlers meta
    inputTestName.addEventListener('input', function () {
      state.meta.testName = String(inputTestName.value || '');
    });

    inputTestId.addEventListener('input', function () {
      state.meta.testId = String(inputTestId.value || '');
    });

    inputPass.addEventListener('input', function () {
      var v = Number(inputPass.value);
      state.meta.passLinePercent = isFiniteNumber(v) ? v : 80;
    });

    inputLocale.addEventListener('input', function () {
      state.meta.locale = String(inputLocale.value || '');
    });

    inputFmt.addEventListener('input', function () {
      state.meta.formatVersion = String(inputFmt.value || '');
    });

    chkShuffleQ.addEventListener('change', function () {
      state.meta.shuffleQuestions = !!chkShuffleQ.checked;
    });

    chkShuffleC.addEventListener('change', function () {
      state.meta.shuffleChoices = !!chkShuffleC.checked;
    });

    // add question
    btnAddQ.addEventListener('click', function () {
      state.questions.push(makeDefaultQuestion(state.questions.length + 1));
      rebuildQidsSequential();
      renderQuestions();
    });

    // generate & download
    btnGen.addEventListener('click', async function () {
      hideError();

      // validate sv key
      var n = normalizeSvKey(inputSv.value);
      if (!n.ok) {
        showError(n.error);
        return;
      }

      // validate all
      var errs = validateAll();
      if (errs.length > 0) {
        showError('入力エラーがあります：\n- ' + errs.join('\n- '));
        return;
      }

      // build pack
      var result = await buildTestpackObjectAsync(n.value);
      if (!result.ok) {
        showError(result.error || 'testpack の生成に失敗しました');
        return;
      }

      var pack = result.pack;

      // file name
      var tid = sanitizeFileNamePart(pack.meta.testId);
      var ts = toJstCompactTimestamp(new Date());
      var fileName = 'testpack_' + tid + '_' + ts + '.js';

      // js content
      var jsText = generateTestpackJsText(pack);

      // download
      downloadTextFile(fileName, jsText);
    });

    root.appendChild(wrapper);
  }
  // ===== [builder.js：UI描画ここまで] =====

  // ===== [builder.js：公開API] =====
  var Builder = {
    mount: function (containerOrSelector) {
      mount(containerOrSelector);
    },
    // デバッグ用途（必要な場合のみ）：現在の入力状態を取得（正解は correctCids を含むため注意）
    // ※ 仕様の「漏えい禁止」は受講・採点側の話だが、気になる場合はこのAPIを使わないこと
    _getStateForDebugOnly: function () {
      return state;
    }
  };

  window.Builder = Builder;

  // ===== [builder.js：自動mount] =====
  function autoMount() {
    try {
      var el = document.querySelector('#pane-builder');
      if (!el) return;
      Builder.mount(el);
    } catch (e) {
      // 初期化失敗は致命ではないため握りつぶし（必要なら console を見て判断）
      try {
        console.warn('builder.js: autoMount failed', e);
      } catch (e2) {}
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', autoMount);
  } else {
    autoMount();
  }
  // ===== [builder.js：自動mountここまで] =====

  // ===== [builder.js：公開APIここまで] =====
})();
// ===== [builder.js：即時関数スコープここまで] =====
