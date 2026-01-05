/* builder.js
   T012_MCQs01 - MCQツール（作成ツール）
   - content.js の作成UI骨組みに対してロジックを提供
   - testpack.js（window.TESTPACK / window.TESTPACKS 形式）を生成してダウンロード
*/
(function () {
  'use strict';

  // ===== [DOMユーティリティ]ブロック =====
  function byId(id) {
    return document.getElementById(id);
  }
  // ===== [DOMユーティリティ]ブロックここまで =====

  // ===== [文字列ユーティリティ]ブロック =====
  function pad3(n) {
    var s = String(n);
    while (s.length < 3) s = '0' + s;
    return s;
  }

  function sanitizeFileName(s) {
    var t = String(s || '').trim();
    // Windows / macOS / Linux の主要禁止文字を除去
    t = t.replace(/[\\\/:\*\?"<>\|]/g, '_');
    // 制御文字を除去
    t = t.replace(/[\x00-\x1f\x7f]/g, '');
    // 連続アンダーバー圧縮
    t = t.replace(/_+/g, '_');
    // 前後のドット/空白は避ける
    t = t.replace(/^[\.\s]+/g, '').replace(/[\.\s]+$/g, '');
    if (t === '') t = 'testpack';
    return t;
  }

  function escapeHtml(s) {
    return String(s || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }
  // ===== [文字列ユーティリティ]ブロックここまで =====

  // ===== [SVキー正規化]ブロック =====
  function normalizeSvKey(raw) {
    var s = String(raw || '').trim();
    if (s === '') return { ok: false, value: '', message: 'SVキーを入力してください' };
    if (!/^\d+$/.test(s)) return { ok: false, value: '', message: '数字以外は入力できません' };
    if (s.length > 4) return { ok: false, value: '', message: 'SVキーは4桁までです' };
    while (s.length < 4) s = '0' + s;
    return { ok: true, value: s, message: '' };
  }
  // ===== [SVキー正規化]ブロックここまで =====

  // ===== [状態]ブロック =====
  var state = {
    questions: []
  };
  // ===== [状態]ブロックここまで =====

  // ===== [ログ表示]ブロック =====
  function setLog(type, msg) {
    var el = byId('builder-log');
    if (!el) return;

    var cls = 'alert-secondary';
    if (type === 'success') cls = 'alert-success';
    if (type === 'danger') cls = 'alert-danger';
    if (type === 'warning') cls = 'alert-warning';

    el.className = 'alert ' + cls + ' mb-0';
    el.innerHTML = '<div class="small">' + escapeHtml(String(msg || '')) + '</div>';
  }
  // ===== [ログ表示]ブロックここまで =====

  // ===== [設問生成]ブロック =====
  function createDefaultChoices() {
    return [
      { label: 'A', text: '' },
      { label: 'B', text: '' },
      { label: 'C', text: '' },
      { label: 'D', text: '' }
    ];
  }

  function nextQid() {
    var n = state.questions.length + 1;
    return 'Q' + pad3(n);
  }

  function addQuestion(qtype) {
    var q = {
      qid: nextQid(),
      type: (qtype === 'multi') ? 'multi' : 'single',
      text: '',
      explanation: '',
      choices: createDefaultChoices(),
      correct: []
    };

    // single は A を初期選択（空のままだと不便なので）
    if (q.type === 'single') q.correct = ['A'];

    state.questions.push(q);
    renderQuestions();
    setLog('secondary', '設問を追加しました：' + q.qid);
  }

  function clearQuestions() {
    state.questions = [];
    renderQuestions();
    setLog('secondary', '設問を全削除しました');
  }
  // ===== [設問生成]ブロックここまで =====

  // ===== [設問UI描画]ブロック =====
  function renderQuestions() {
    var host = byId('builder-questions-area');
    if (!host) return;

    if (!state.questions.length) {
      host.innerHTML = '<div class="text-muted">設問がありません。「単一選択を追加」「複数選択を追加」で追加してください。</div>';
      return;
    }

    var html = '';
    var i;
    for (i = 0; i < state.questions.length; i++) {
      var q = state.questions[i];

      html += ''
        + '<div class="card mb-3" data-qindex="' + String(i) + '">'
        + '  <div class="card-header d-flex justify-content-between align-items-center flex-wrap gap-2">'
        + '    <div class="fw-bold">' + escapeHtml(q.qid) + '（' + (q.type === 'multi' ? '複数選択' : '単一選択') + '）</div>'
        + '    <div class="d-flex gap-2">'
        + '      <button type="button" class="btn btn-sm btn-outline-danger" data-act="remove-q">削除</button>'
        + '    </div>'
        + '  </div>'
        + '  <div class="card-body">'
        + '    <div class="mb-3">'
        + '      <label class="form-label">問題文</label>'
        + '      <textarea class="form-control" rows="2" data-field="text">' + escapeHtml(q.text) + '</textarea>'
        + '    </div>'
        + '    <div class="mb-3">'
        + '      <label class="form-label">説明（解説）</label>'
        + '      <textarea class="form-control" rows="2" data-field="explanation">' + escapeHtml(q.explanation) + '</textarea>'
        + '    </div>'
        + '    <div class="mb-2 fw-bold">選択肢</div>';

      var c;
      for (c = 0; c < q.choices.length; c++) {
        var ch = q.choices[c];
        var checked = (q.correct.indexOf(ch.label) >= 0) ? 'checked' : '';
        var inputType = (q.type === 'multi') ? 'checkbox' : 'radio';

        html += ''
          + '<div class="row g-2 align-items-center mb-2" data-cindex="' + String(c) + '">'
          + '  <div class="col-auto">'
          + '    <div class="form-check">'
          + '      <input class="form-check-input" type="' + inputType + '" name="correct-' + escapeHtml(q.qid) + '" data-field="correct" value="' + escapeHtml(ch.label) + '" ' + checked + '>'
          + '      <label class="form-check-label">' + escapeHtml(ch.label) + '</label>'
          + '    </div>'
          + '  </div>'
          + '  <div class="col">'
          + '    <input type="text" class="form-control" data-field="choice-text" value="' + escapeHtml(ch.text) + '" placeholder="選択肢 ' + escapeHtml(ch.label) + '">'
          + '  </div>'
          + '  <div class="col-auto">'
          + '    <button type="button" class="btn btn-sm btn-outline-secondary" data-act="remove-choice">削除</button>'
          + '  </div>'
          + '</div>';
      }

      html += ''
        + '    <div class="d-flex gap-2 flex-wrap mt-2">'
        + '      <button type="button" class="btn btn-sm btn-outline-primary" data-act="add-choice">選択肢を追加</button>'
        + '    </div>'
        + '  </div>'
        + '</div>';
    }

    host.innerHTML = html;
  }
  // ===== [設問UI描画]ブロックここまで =====

  // ===== [イベント委譲：設問エディタ]ブロック =====
  function onQuestionsAreaInput(e) {
    var host = byId('builder-questions-area');
    if (!host) return;
    var target = e.target;
    if (!target) return;

    var card = target.closest('.card[data-qindex]');
    if (!card) return;

    var qindex = Number(card.getAttribute('data-qindex'));
    if (!Number.isFinite(qindex) || !state.questions[qindex]) return;

    var q = state.questions[qindex];

    var field = target.getAttribute('data-field') || '';

    if (field === 'text') {
      q.text = String(target.value || '');
      return;
    }
    if (field === 'explanation') {
      q.explanation = String(target.value || '');
      return;
    }
    if (field === 'choice-text') {
      var row = target.closest('[data-cindex]');
      if (!row) return;
      var cindex = Number(row.getAttribute('data-cindex'));
      if (!Number.isFinite(cindex) || !q.choices[cindex]) return;
      q.choices[cindex].text = String(target.value || '');
      return;
    }
  }

  function onQuestionsAreaChange(e) {
    var host = byId('builder-questions-area');
    if (!host) return;
    var target = e.target;
    if (!target) return;

    var card = target.closest('.card[data-qindex]');
    if (!card) return;

    var qindex = Number(card.getAttribute('data-qindex'));
    if (!Number.isFinite(qindex) || !state.questions[qindex]) return;

    var q = state.questions[qindex];

    var field = target.getAttribute('data-field') || '';
    if (field === 'correct') {
      var val = String(target.value || '');

      if (q.type === 'multi') {
        if (target.checked) {
          if (q.correct.indexOf(val) < 0) q.correct.push(val);
        } else {
          q.correct = q.correct.filter(function (x) { return x !== val; });
        }
      } else {
        // single
        q.correct = [val];
      }
      return;
    }
  }

  function onQuestionsAreaClick(e) {
    var host = byId('builder-questions-area');
    if (!host) return;
    var target = e.target;
    if (!target) return;

    var act = target.getAttribute('data-act') || '';
    if (!act) return;

    var card = target.closest('.card[data-qindex]');
    if (!card) return;

    var qindex = Number(card.getAttribute('data-qindex'));
    if (!Number.isFinite(qindex) || !state.questions[qindex]) return;

    if (act === 'remove-q') {
      state.questions.splice(qindex, 1);
      // qid を詰め直す（Q001〜連番維持）
      var i;
      for (i = 0; i < state.questions.length; i++) {
        state.questions[i].qid = 'Q' + pad3(i + 1);
      }
      renderQuestions();
      setLog('secondary', '設問を削除しました');
      return;
    }

    var q = state.questions[qindex];

    if (act === 'add-choice') {
      // 次のラベル（A,B,C...）を付与
      var nextLabel = String.fromCharCode('A'.charCodeAt(0) + q.choices.length);
      q.choices.push({ label: nextLabel, text: '' });
      renderQuestions();
      return;
    }

    if (act === 'remove-choice') {
      var row = target.closest('[data-cindex]');
      if (!row) return;
      var cindex = Number(row.getAttribute('data-cindex'));
      if (!Number.isFinite(cindex) || !q.choices[cindex]) return;

      var removed = q.choices[cindex].label;
      q.choices.splice(cindex, 1);

      // 正解からも削除
      q.correct = q.correct.filter(function (x) { return x !== removed; });

      // ラベルを詰め直す（A,B,C...）
      var i2;
      for (i2 = 0; i2 < q.choices.length; i2++) {
        q.choices[i2].label = String.fromCharCode('A'.charCodeAt(0) + i2);
      }

      // single の場合、正解が消えたらAを入れておく
      if (q.type === 'single' && (!q.correct.length) && q.choices.length) {
        q.correct = [q.choices[0].label];
      }

      renderQuestions();
      return;
    }
  }
  // ===== [イベント委譲：設問エディタ]ブロックここまで =====

  // ===== [salt生成]ブロック =====
  function generateSaltB64() {
    if (!window.MCQCrypto || typeof window.MCQCrypto.randomBytes !== 'function') {
      setLog('danger', 'crypto.js が読み込まれていません（salt生成不可）');
      return;
    }
    var saltBytes = window.MCQCrypto.randomBytes(16);
    var b64 = window.MCQCrypto.bytesToBase64(saltBytes);
    var el = byId('b-saltb64');
    if (el) el.value = b64;
    setLog('secondary', 'saltB64 を生成しました');
  }
  // ===== [salt生成]ブロックここまで =====

  // ===== [testpack生成・ダウンロード]ブロック =====
  function validateBeforeBuild(meta, svKey4) {
    var errs = [];

    if (!meta.testName) errs.push('テスト名が未入力です');
    if (!meta.fileName) errs.push('ファイル名が未入力です');

    if (!Array.isArray(state.questions) || !state.questions.length) {
      errs.push('設問がありません');
    }

    var i;
    for (i = 0; i < state.questions.length; i++) {
      var q = state.questions[i];

      if (!q.text.trim()) errs.push(q.qid + '：問題文が未入力です');

      if (!Array.isArray(q.choices) || !q.choices.length) {
        errs.push(q.qid + '：選択肢がありません');
      } else {
        var c;
        for (c = 0; c < q.choices.length; c++) {
          if (!String(q.choices[c].text || '').trim()) {
            errs.push(q.qid + '：選択肢 ' + q.choices[c].label + ' が未入力です');
          }
        }
      }

      if (!Array.isArray(q.correct) || !q.correct.length) {
        errs.push(q.qid + '：正解が未選択です');
      }
    }

    // SVキー確認
    var nk = normalizeSvKey(svKey4);
    if (!nk.ok) errs.push('SVキー：' + nk.message);

    // salt確認
    var saltB64 = byId('b-saltb64') ? String(byId('b-saltb64').value || '').trim() : '';
    if (!saltB64) errs.push('saltB64 が未入力です（生成ボタンで作成してください）');

    return errs;
  }

  async function buildTestPackObject(meta, svKey4) {
    var shuffleQ = !!meta.shuffleQuestions;
    var shuffleC = !!meta.shuffleChoices;

    var saltB64 = String(byId('b-saltb64').value || '').trim();
    var iterations = 300000;

    var pack = {
      meta: {
        testName: meta.testName,
        fileName: meta.fileName,
        passLinePercent: meta.passLinePercent,
        locale: meta.locale || 'ja-JP',
        shuffleQuestions: shuffleQ,
        shuffleChoices: shuffleC
      },
      security: {
        saltB64: saltB64,
        iterations: iterations
      },
      questions: []
    };

    var i;
    for (i = 0; i < state.questions.length; i++) {
      var q = state.questions[i];

      var choices = [];
      var c;
      for (c = 0; c < q.choices.length; c++) {
        choices.push({
          label: q.choices[c].label,
          text: q.choices[c].text
        });
      }

      var answerArr = Array.isArray(q.correct) ? q.correct.slice() : [];
      answerArr.sort();

      var answerEnc = await window.MCQCrypto.encryptJsonAnswerArray(answerArr, svKey4, saltB64, iterations);

      pack.questions.push({
        qid: q.qid,
        type: q.type,
        text: q.text,
        explanation: q.explanation,
        choices: choices,
        answerEnc: answerEnc
      });
    }

    return pack;
  }

  function downloadTextFile(filename, text) {
    var blob = new Blob([text], { type: 'text/javascript;charset=utf-8' });
    var url = URL.createObjectURL(blob);

    var a = document.createElement('a');
    a.href = url;
    a.download = filename;

    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    setTimeout(function () {
      URL.revokeObjectURL(url);
    }, 1000);
  }

  function buildPackJsText(pack) {
    // window.TESTPACK / window.TESTPACKS どちらでも拾えるようにする
    return ''
      + '(function(){\n'
      + '  "use strict";\n'
      + '  var pack = ' + JSON.stringify(pack, null, 2) + ';\n'
      + '  window.TESTPACK = pack;\n'
      + '  window.TESTPACKS = window.TESTPACKS || [];\n'
      + '  window.TESTPACKS.push(pack);\n'
      + '})();\n';
  }

  async function onDownload() {
    if (!window.MCQCrypto) {
      setLog('danger', 'crypto.js が読み込まれていません（暗号化できません）');
      return;
    }

    var testNameEl = byId('b-testname');
    var fileNameEl = byId('b-filename');
    var passLineEl = byId('b-passline');
    var localeEl = byId('b-locale');
    var shuffleQEl = byId('b-shuffleq');
    var shuffleCEl = byId('b-shufflec');
    var svKeyEl = byId('b-svkey');

    if (!testNameEl || !fileNameEl || !passLineEl || !localeEl || !shuffleQEl || !shuffleCEl || !svKeyEl) {
      setLog('danger', '作成UIの要素が見つかりません（content.js のUIが未描画の可能性）');
      return;
    }

    var meta = {
      testName: String(testNameEl.value || '').trim(),
      fileName: String(fileNameEl.value || '').trim(),
      passLinePercent: Number(passLineEl.value || 80),
      locale: String(localeEl.value || 'ja-JP'),
      shuffleQuestions: !!shuffleQEl.checked,
      shuffleChoices: !!shuffleCEl.checked
    };

    var nk = normalizeSvKey(String(svKeyEl.value || ''));
    var errs = validateBeforeBuild(meta, nk.value);

    if (errs.length) {
      setLog('danger', '入力エラー：\n- ' + errs.join('\n- '));
      return;
    }

    // 正規化後のSVキーで暗号化
    var svKey4 = nk.value;

    setLog('secondary', 'testpack.js を生成中です...');
    try {
      var pack = await buildTestPackObject(meta, svKey4);
      var jsText = buildPackJsText(pack);

      var outName = 'testpack_' + sanitizeFileName(meta.fileName) + '.js';
      downloadTextFile(outName, jsText);

      setLog('success', '生成完了：' + outName);
    } catch (e) {
      setLog('danger', '生成に失敗しました：' + (e && e.message ? e.message : String(e)));
    }
  }
  // ===== [testpack生成・ダウンロード]ブロックここまで =====

  // ===== [初期化]ブロック =====
  function init() {
    // builder タブが無い場合は何もしない
    if (!byId('pane-builder')) return;

    // 初期描画
    renderQuestions();
    setLog('secondary', '作成モード：設問を追加してください');

    // ボタン
    var btnSingle = byId('btn-b-add-single');
    var btnMulti = byId('btn-b-add-multi');
    var btnClear = byId('btn-b-clear');
    var btnDownload = byId('btn-b-download');
    var btnSalt = byId('btn-b-gensalt');

    if (btnSingle) btnSingle.addEventListener('click', function () { addQuestion('single'); });
    if (btnMulti) btnMulti.addEventListener('click', function () { addQuestion('multi'); });
    if (btnClear) btnClear.addEventListener('click', function () { clearQuestions(); });
    if (btnSalt) btnSalt.addEventListener('click', function () { generateSaltB64(); });
    if (btnDownload) btnDownload.addEventListener('click', function () { onDownload(); });

    // 設問エリア（委譲）
    var host = byId('builder-questions-area');
    if (host) {
      host.addEventListener('input', onQuestionsAreaInput);
      host.addEventListener('change', onQuestionsAreaChange);
      host.addEventListener('click', onQuestionsAreaClick);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
  // ===== [初期化]ブロックここまで =====
})();
