/* app.js
   T012_MCQs01 - MCQツール（受験・採点ロジック）
   - file:// 前提で動作（CORS回避）
   - content.js がUIを構築し、app.js がロジックを担当
*/
(function () {
  'use strict';

  // ===== [定数]ブロック =====
  var APP_VERSION = '0.1.0';
  // ===== [定数]ブロックここまで =====

  // ===== [DOMユーティリティ]ブロック =====
  function byId(id) {
    return document.getElementById(id);
  }

  function setText(id, text) {
    var el = byId(id);
    if (!el) return;
    el.textContent = (text == null) ? '' : String(text);
  }

  function setHtml(id, html) {
    var el = byId(id);
    if (!el) return;
    el.innerHTML = html;
  }

  function showEl(id) {
    var el = byId(id);
    if (!el) return;
    el.style.display = '';
  }

  function hideEl(id) {
    var el = byId(id);
    if (!el) return;
    el.style.display = 'none';
  }

  function setDisabled(id, disabled) {
    var el = byId(id);
    if (!el) return;
    el.disabled = !!disabled;
  }

  function escapeHtml(s) {
    var str = (s == null) ? '' : String(s);
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }
  // ===== [DOMユーティリティ]ブロックここまで =====

  // ===== [日付ユーティリティ]ブロック =====
  function pad2(n) {
    var s = String(n);
    return (s.length < 2) ? ('0' + s) : s;
  }

  function formatDateTimeReadable(dateObj) {
    if (!dateObj) return '';
    var y = dateObj.getFullYear();
    var m = pad2(dateObj.getMonth() + 1);
    var d = pad2(dateObj.getDate());
    var hh = pad2(dateObj.getHours());
    var mm = pad2(dateObj.getMinutes());
    var ss = pad2(dateObj.getSeconds());
    return y + '/' + m + '/' + d + ' ' + hh + ':' + mm + ':' + ss;
  }
  // ===== [日付ユーティリティ]ブロックここまで =====

  // ===== [ID生成]ブロック =====
  function generateAttemptId(now) {
    // 形式：AT-YYYYMMDD-HHMMSS-XXXXXX（JST）
    // - YYYYMMDD-HHMMSS：受験開始日時（JST）
    // - XXXXXX：6桁ランダム（Base36：0-9A-Z）
    var dt = now ? now : new Date();
    var y = dt.getFullYear();
    var m = pad2(dt.getMonth() + 1);
    var d = pad2(dt.getDate());
    var hh = pad2(dt.getHours());
    var mm = pad2(dt.getMinutes());
    var ss = pad2(dt.getSeconds());

    var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var r = '';
    var i;
    for (i = 0; i < 6; i++) {
      r += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    return 'AT-' + String(y) + String(m) + String(d) + '-' + String(hh) + String(mm) + String(ss) + '-' + r;
  }
  // ===== [ID生成]ブロックここまで =====

  // ===== [SVキー正規化]ブロック =====
  function normalizeSvKey(raw) {
    // ルール：
    // - 数字以外はエラー
    // - 4桁未満は左ゼロ埋め
    // - 4桁超はエラー
    var s = (raw == null) ? '' : String(raw).trim();
    if (s === '') {
      return { ok: false, value: '', message: 'SVキーが未入力です' };
    }
    if (!/^\d+$/.test(s)) {
      return { ok: false, value: '', message: '数字以外は入力できません' };
    }
    if (s.length > 4) {
      return { ok: false, value: '', message: 'SVキーは4桁までです' };
    }
    while (s.length < 4) s = '0' + s;
    return { ok: true, value: s, message: '' };
  }
  // ===== [SVキー正規化]ブロックここまで =====

  // ===== [testpack取得]ブロック =====
  function getAllTestPacksFromGlobal() {
    // content.js / index.html が testpacks/*.js を読み込んでいる想定
    // 形式：window.TESTPACKS = [ { meta, security, questions }, ... ] を想定
    // ただし、無い場合に備えて window.testpacks / window.TESTPACK なども拾う
    var packs = [];

    if (Array.isArray(window.TESTPACKS)) {
      packs = packs.concat(window.TESTPACKS);
    }
    if (Array.isArray(window.testpacks)) {
      packs = packs.concat(window.testpacks);
    }
    if (window.TESTPACK && typeof window.TESTPACK === 'object') {
      packs.push(window.TESTPACK);
    }

    // meta.testId があるものだけ残す
    var out = [];
    var i;
    for (i = 0; i < packs.length; i++) {
      var p = packs[i];
      if (p && p.meta && p.meta.testId) out.push(p);
    }
    return out;
  }
  // ===== [testpack取得]ブロックここまで =====

  // ===== [state]ブロック =====
  var state = {
    packs: [],
    selectedTestId: '',
    selectedPack: null,

    // 受験セッション
    started: false,
    submitted: false,
    attemptId: '',
    startedAt: null,
    submittedAt: null,
    gradedAt: null,
    lastGrade: null,

    // 出題（受験開始時に確定する並び）
    examQuestions: [],

    // 回答
    answers: {}, // { qid: ['A', 'B'] } の配列で保持（singleでも配列）

    // 受講者情報
    empNo: '',
    userName: '',

    // カレント
    currentIndex: 0
  };
  // ===== [state]ブロックここまで =====

  // ===== [UI：テスト選択プルダウン投入]ブロック =====
  function populateTestSelect() {
    var select = byId('exam-test-select');
    var status = byId('exam-testpack-status');

    if (!select) return;

    select.innerHTML = '';

    var packs = state.packs;

    if (!packs || packs.length === 0) {
      select.disabled = true;
      var opt0 = document.createElement('option');
      opt0.value = '';
      opt0.textContent = '（testpack未読み込み）';
      select.appendChild(opt0);

      if (status) status.textContent = 'testpack.js 未読み込み（0件）';
      setText('exam-test-select-status', 'testpack.js 未読み込み（0件）');
      return;
    }

    select.disabled = false;

    var opt = document.createElement('option');
    opt.value = '';
    opt.textContent = '（テストを選択してください）';
    select.appendChild(opt);

    var i;
    for (i = 0; i < packs.length; i++) {
      var p = packs[i];
      var o = document.createElement('option');
      o.value = p.meta.testId;
      o.textContent = p.meta.testName || p.meta.testId;
      select.appendChild(o);
    }

    if (status) status.textContent = 'testpack.js 読み込みOK（' + packs.length + '件）';
    setText('exam-test-select-status', 'testpack.js 読み込みOK（' + packs.length + '件）');
  }
  // ===== [UI：テスト選択プルダウン投入]ブロックここまで =====

  // ===== [UI：テスト情報パネル更新]ブロック =====
  function updateTestInfoPanel() {
    var pack = state.selectedPack;
    if (!pack) {
      setText('exam-testname', '');
      setText('exam-testid', '');
      setText('exam-passline', '');
      setText('exam-questioncount', '');
      return;
    }

    var meta = pack.meta || {};
    var passLine = (typeof meta.passLinePercent === 'number') ? meta.passLinePercent : 80;
    var qcount = (pack.questions && pack.questions.length) ? pack.questions.length : 0;

    setText('exam-testname', meta.testName || '');
    setText('exam-testid', meta.testId || '');
    setText('exam-passline', String(passLine) + '%');
    setText('exam-questioncount', String(qcount));
  }
  // ===== [UI：テスト情報パネル更新]ブロックここまで =====

  // ===== [UI：開始ボタン有効判定]ブロック =====
  function canStartExam() {
    if (!state.selectedPack) return false;

    var emp = byId('exam-empno');
    var name = byId('exam-name');
    if (!emp || !name) return false;

    var empNo = String(emp.value || '').trim();
    var userName = String(name.value || '').trim();
    if (empNo === '' || userName === '') return false;

    return true;
  }

  function getStartExamMissingMessage() {
    var missing = [];

    // テスト未選択
    if (!state.selectedPack) {
      missing.push('実施テストを選択してください');
    }

    // 社員番号
    var emp = byId('exam-empno');
    var empNo = emp ? String(emp.value || '').trim() : '';
    if (empNo === '') {
      missing.push('社員番号を入力してください');
    }

    // 氏名
    var name = byId('exam-name');
    var userName = name ? String(name.value || '').trim() : '';
    if (userName === '') {
      missing.push('氏名を入力してください');
    }

    if (state.started) {
      missing = ['受験開始済みです（再受験はリセットしてください）'];
    }

    if (missing.length === 0) {
      return '受験を開始できます';
    }

    return missing.join(' / ');
  }

  function refreshStartButtonTooltip(message) {
    var wrap = byId('wrap-btn-exam-start');
    if (!wrap) return;

    // data-bs-title を更新（Bootstrap Tooltipの参照先）
    wrap.setAttribute('data-bs-title', message);

    // title も更新（Bootstrap未初期化/無効時のフォールバック）
    wrap.setAttribute('title', message);

    // 既存インスタンスがあれば反映
    if (window.bootstrap && window.bootstrap.Tooltip) {
      var inst = window.bootstrap.Tooltip.getInstance(wrap);
      if (inst) {
        // setContent があれば使う（BS5.2+）
        if (typeof inst.setContent === 'function') {
          inst.setContent({ '.tooltip-inner': message });
        } else {
          // setContent が無い場合は作り直して確実に反映
          inst.dispose();
          new window.bootstrap.Tooltip(wrap);
        }
      }
    }
  }

  function updateStartButtonState() {
    var btn = byId('btn-exam-start');
    if (!btn) return;

    var can = canStartExam() && !state.started;
    btn.disabled = !can;

    // Tooltipメッセージ更新
    var msg = getStartExamMissingMessage();
    refreshStartButtonTooltip(msg);
  }
  // ===== [UI：開始ボタン有効判定]ブロックここまで =====

  // ===== [イベント：テスト選択変更]ブロック =====
  function onTestSelectChanged() {
    var select = byId('exam-test-select');
    if (!select) return;

    var testId = String(select.value || '');
    state.selectedTestId = testId;

    var pack = null;
    var i;
    for (i = 0; i < state.packs.length; i++) {
      if (state.packs[i].meta && state.packs[i].meta.testId === testId) {
        pack = state.packs[i];
        break;
      }
    }
    state.selectedPack = pack;

    updateTestInfoPanel();
    updateStartButtonState();
  }
  // ===== [イベント：テスト選択変更]ブロックここまで =====

  // ===== [イベント：入力変更]ブロック =====
  function onInputChanged() {
    updateStartButtonState();
  }
  // ===== [イベント：入力変更]ブロックここまで =====

  // ===== [シャッフル]ブロック =====
  function shuffleArray(arr) {
    var a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = a[i];
      a[i] = a[j];
      a[j] = t;
    }
    return a;
  }
  // ===== [シャッフル]ブロックここまで =====

  // ===== [受験：出題配列作成]ブロック =====
  function buildExamQuestions(pack) {
    // pack.questions を元に、受験開始時点の「確定した並び」を作る
    // - 問題順：shuffleQ がONならシャッフル
    // - 選択肢：shuffleC がONなら各問でシャッフル
    var qs = [];
    var i;

    for (i = 0; i < pack.questions.length; i++) {
      var q = pack.questions[i];

      // 最小限のコピー（受験表示用）
      var qCopy = {
        qid: q.qid,
        type: q.type,
        text: q.text,
        choices: []
      };

      var c;
      var j;
      for (j = 0; j < q.choices.length; j++) {
        c = q.choices[j];
        qCopy.choices.push({
          cid: c.cid,
          text: c.text
        });
      }

      // 選択肢シャッフル
      if (pack.meta && (pack.meta.shuffleChoices || pack.meta.shuffleC)) {
        qCopy.choices = shuffleArray(qCopy.choices);
      }

      qs.push(qCopy);
    }

    // 問題シャッフル
    if (pack.meta && (pack.meta.shuffleQuestions || pack.meta.shuffleQ)) {
      qs = shuffleArray(qs);
    }

    return qs;
  }
  // ===== [受験：出題配列作成]ブロックここまで =====

// ===== [受験：進捗/ボタン更新]ブロック =====
function getAnsweredCount() {
  var pack = state.selectedPack;
  if (!pack || !state.examQuestions || state.examQuestions.length === 0) return 0;

  var count = 0;
  var i;
  for (i = 0; i < state.examQuestions.length; i++) {
    var qid = state.examQuestions[i].qid;
    var ans = state.answers[qid];
    if (Array.isArray(ans) && ans.length > 0) count++;
  }
  return count;
}

function updateExamNavButtons() {
  var total = state.examQuestions ? state.examQuestions.length : 0;
  var idx = state.currentIndex;

  setText('exam-progress', (total > 0) ? String(idx + 1) + ' / ' + String(total) : '0 / 0');

  // 前へ／次へ
  setDisabled('btn-exam-prev', !(state.started && !state.submitted && idx > 0));
  setDisabled('btn-exam-next', !(state.started && !state.submitted && idx < total - 1));

  // 提出：全問回答済みで有効
  var answered = getAnsweredCount();
  var canSubmit = state.started && !state.submitted && (total > 0) && (answered === total);
  setDisabled('btn-exam-submit', !canSubmit);

  // ===== 提出ボタン Tooltip 制御（未回答あり） =====
  var wrap = byId('wrap-btn-exam-submit');
  if (wrap && window.bootstrap && window.bootstrap.Tooltip) {
    if (!canSubmit && state.started && !state.submitted && total > 0) {
      wrap.setAttribute('data-bs-title', '選択していない設問があります');
      wrap.setAttribute('title', '選択していない設問があります');

      var inst = window.bootstrap.Tooltip.getInstance(wrap);
      if (!inst) {
        new window.bootstrap.Tooltip(wrap);
      }
    } else {
      var inst2 = window.bootstrap.Tooltip.getInstance(wrap);
      if (inst2) inst2.dispose();
      wrap.removeAttribute('data-bs-title');
      wrap.removeAttribute('title');
    }
  }
  // ===== 提出ボタン Tooltip 制御ここまで =====

  // 提出済みならナビ無効
  if (state.submitted) {
    setDisabled('btn-exam-prev', true);
    setDisabled('btn-exam-next', true);
    setDisabled('btn-exam-submit', true);
  }
}
// ===== [受験：進捗/ボタン更新]ブロックここまで =====

  // ===== [受験：回答保持]ブロック =====
  function setAnswer(qid, arr) {
    state.answers[qid] = arr;
    updateExamNavButtons();
  }

  function getAnswer(qid) {
    var a = state.answers[qid];
    return Array.isArray(a) ? a : [];
  }
  // ===== [受験：回答保持]ブロックここまで =====

  // ===== [受験：設問表示]ブロック =====
  function renderCurrentQuestion() {
    var area = byId('exam-question-area');
    if (!area) return;

    if (!state.started || !state.selectedPack) {
      area.innerHTML = '<div class="text-muted">受験を開始してください</div>';
      return;
    }

    var total = state.examQuestions.length;
    if (total === 0) {
      area.innerHTML = '<div class="text-muted">設問がありません</div>';
      return;
    }

    var idx = state.currentIndex;
    if (idx < 0) idx = 0;
    if (idx >= total) idx = total - 1;
    state.currentIndex = idx;

    var q = state.examQuestions[idx];
    var qid = q.qid;
    var type = q.type;
    var text = q.text;

    var ans = getAnswer(qid);

    var html = '';
    html += '<div class="mb-2 fw-bold">設問</div>';
    html += '<div class="mb-3">' + escapeHtml(text) + '</div>';

    // choices
    html += '<div class="mb-3">';
    var i;
    for (i = 0; i < q.choices.length; i++) {
      var c = q.choices[i];
      var cid = c.cid;
      var checked = (ans.indexOf(String(cid).toUpperCase()) >= 0);

      if (type === 'multi') {
        html += '<div class="form-check mb-1">';
        html += '  <input class="form-check-input" type="checkbox" id="ch_' + escapeHtml(qid) + '_' + escapeHtml(cid) + '" data-qid="' + escapeHtml(qid) + '" data-cid="' + escapeHtml(cid) + '"' + (checked ? ' checked' : '') + (state.submitted ? ' disabled' : '') + '>';
        html += '  <label class="form-check-label" for="ch_' + escapeHtml(qid) + '_' + escapeHtml(cid) + '">';
        html += '    <span class="fw-bold me-2">' + escapeHtml(cid) + '</span>' + escapeHtml(c.text);
        html += '  </label>';
        html += '</div>';
      } else {
        html += '<div class="form-check mb-1">';
        html += '  <input class="form-check-input" type="radio" name="r_' + escapeHtml(qid) + '" id="r_' + escapeHtml(qid) + '_' + escapeHtml(cid) + '" data-qid="' + escapeHtml(qid) + '" data-cid="' + escapeHtml(cid) + '"' + (checked ? ' checked' : '') + (state.submitted ? ' disabled' : '') + '>';
        html += '  <label class="form-check-label" for="r_' + escapeHtml(qid) + '_' + escapeHtml(cid) + '">';
        html += '    <span class="fw-bold me-2">' + escapeHtml(cid) + '</span>' + escapeHtml(c.text);
        html += '  </label>';
        html += '</div>';
      }
    }
    html += '</div>';

    area.innerHTML = html;

    // bind choice events
    bindChoiceEventsForCurrentQuestion();
    updateExamNavButtons();
  }

  function bindChoiceEventsForCurrentQuestion() {
    var area = byId('exam-question-area');
    if (!area) return;

    // checkbox / radio の input を拾う
    var inputs = area.querySelectorAll('input.form-check-input');
    if (!inputs) return;

    var i;
    for (i = 0; i < inputs.length; i++) {
      inputs[i].addEventListener('change', function (e) {
        if (state.submitted) return;

        var target = e.target;
        if (!target) return;
        var qid = target.getAttribute('data-qid');
        var cid = target.getAttribute('data-cid');
        if (!qid || !cid) return;

        var q = state.examQuestions[state.currentIndex];
        if (!q) return;

        cid = String(cid).toUpperCase();

        if (q.type === 'multi') {
          // 複数：チェック状態を集める
          var area2 = byId('exam-question-area');
          if (!area2) return;
          var checks = area2.querySelectorAll('input.form-check-input[type="checkbox"][data-qid="' + qid + '"]');
          var arr = [];
          var j;
          for (j = 0; j < checks.length; j++) {
            if (checks[j].checked) {
              arr.push(String(checks[j].getAttribute('data-cid')).toUpperCase());
            }
          }
          setAnswer(qid, arr);
        } else {
          // 単一：それだけ
          setAnswer(qid, [cid]);
        }
      });
    }
  }
  // ===== [受験：設問表示]ブロックここまで =====

  // ===== [受験：移動]ブロック =====
  function prevQuestion() {
    if (!state.started || state.submitted) return;
    if (state.currentIndex > 0) {
      state.currentIndex--;
      renderCurrentQuestion();
    }
  }

  function nextQuestion() {
    if (!state.started || state.submitted) return;
    var total = state.examQuestions ? state.examQuestions.length : 0;
    if (state.currentIndex < total - 1) {
      state.currentIndex++;
      renderCurrentQuestion();
    }
  }
  // ===== [受験：移動]ブロックここまで =====

  // ===== [受験：提出]ブロック =====
  function submitExam() {
    if (!state.started || state.submitted) return;

    var total = state.examQuestions ? state.examQuestions.length : 0;
    if (total === 0) return;

    // 全問未回答なら提出不可（ボタン状態で抑止しているが二重チェック）
    var answered = getAnsweredCount();
    if (answered !== total) {
      updateExamNavButtons();
      return;
    }

    state.submitted = true;

    // 提出時刻を記録
    state.submittedAt = new Date();

    // 受験画面の操作をロック
    updateExamNavButtons();
    renderCurrentQuestion();

    // 提出メッセージ
    setHtml(
      'exam-submit-msg',
      '<div class="alert alert-success mb-0" role="alert">'
        + '<div class="fw-bold">回答を提出しました</div>'
        + '<div class="small">キー入力で採点します（ENTER）。</div>'
        + '</div>'
    );

    // 採点パネルを表示
    showEl('exam-after-submit');

    // 採点結果エリアは初期文に戻す
    setHtml(
      'exam-result-area',
      '<div class="text-muted">キー入力後に合否・正解率（小数第1位）を表示し、結果TXTをダウンロードします。</div>'
    );

    // SV入力へフォーカス
    var sv = byId('sv-key');
    if (sv) {
      try { sv.focus(); } catch (e) {}
    }
  }
  // ===== [受験：提出]ブロックここまで =====

  // ===== [受験開始]ブロック =====
  function startExam() {
    if (state.started) return;

    if (!canStartExam()) {
      updateStartButtonState();
      return;
    }

    var pack = state.selectedPack;
    if (!pack) return;

    var now = new Date();

    state.started = true;
    state.submitted = false;
    state.startedAt = now;
    state.submittedAt = null;
    state.gradedAt = null;
    state.lastGrade = null;

    state.attemptId = generateAttemptId(now);

    // 受講者情報を確定
    state.empNo = String(byId('exam-empno').value || '').trim();
    state.userName = String(byId('exam-name').value || '').trim();

    // 出題配列を作成
    state.examQuestions = buildExamQuestions(pack);

    // 回答初期化
    state.answers = {};
    state.currentIndex = 0;

    // 表示更新
    setText('exam-attemptid', state.attemptId);
    setText('exam-startedat', formatDateTimeReadable(now));

    // 採点パネルは隠す
    hideEl('exam-after-submit');

    // 受験開始後はテスト選択・入力を固定（事故防止）
    setDisabled('exam-empno', true);
    setDisabled('exam-name', true);
    setDisabled('exam-test-select', true);

    // 開始ボタンを無効化（再受験はリセット）
    setDisabled('btn-exam-start', true);

    // 提出メッセージをクリア
    setHtml('exam-submit-msg', '');

    // 設問表示
    renderCurrentQuestion();
    updateExamNavButtons();

    // 提出ボタン周りを有効化（提出は回答状況により制御）
    setDisabled('btn-exam-prev', false);
    setDisabled('btn-exam-next', false);
    setDisabled('btn-exam-submit', true);
  }
  // ===== [受験開始]ブロックここまで =====

   // ===== [リセット]ブロック =====
  function resetExam() {
    // state初期化
    state.started = false;
    state.submitted = false;
    state.attemptId = '';
    state.startedAt = null;
    state.submittedAt = null;
    state.gradedAt = null;
    state.lastGrade = null;
    state.examQuestions = [];
    state.answers = {};
    state.currentIndex = 0;

    // 受講者情報もクリア
    state.empNo = '';
    state.userName = '';

    // 入力解除
    setDisabled('exam-empno', false);
    setDisabled('exam-name', false);

    // 入力値クリア（社員番号／氏名）
    var emp = byId('exam-empno');
    var name = byId('exam-name');
    if (emp) emp.value = '';
    if (name) name.value = '';

    // テスト選択は packs がある限り可能（populate済みなら enabled）
    // ここでは select の disabled は populateTestSelect の結果を尊重しつつ、trueだったら触らない
    var select = byId('exam-test-select');
    if (select && state.packs && state.packs.length > 0) {
      select.disabled = false;
      // 選択を初期へ
      select.value = '';
      state.selectedTestId = '';
      state.selectedPack = null;
      setText('exam-testname', '');
      setText('exam-testid', '');
      setText('exam-passline', '');
      setText('exam-questioncount', '');
    }

    // 画面初期化
    setText('exam-attemptid', '');
    setText('exam-startedat', '');
    setText('exam-progress', '0 / 0');
    setHtml('exam-question-area', '<div class="text-muted">受験を開始してください</div>');
    setHtml('exam-submit-msg', '');
    hideEl('exam-after-submit');
 
    setHtml('exam-result-area', '<div class="text-muted">採点後に合否・正解率（小数第1位）を表示し、結果TXTをダウンロードします。</div>');

    // ボタン状態
    setDisabled('btn-exam-start', false);
    setDisabled('btn-exam-prev', true);
    setDisabled('btn-exam-next', true);
    setDisabled('btn-exam-submit', true);

    updateStartButtonState();
  }
  // ===== [リセット]ブロックここまで =====

  // ===== [ENTERキー処理（骨組み）]ブロック =====
  function handleKeydown(e) {
    // 採点キー入力欄で ENTER → 採点
    if (!e) return;

    var key = e.key || e.code || '';
    if (key !== 'Enter') return;

    var active = document.activeElement;
    if (!active) return;

    if (active.id === 'sv-key') {
      var raw = active.value;
      var nk = normalizeSvKey(raw);
      if (!nk.ok) {
        setHtml(
          'exam-result-area',
          '<div class="alert alert-danger mb-0" role="alert">'
            + '<div class="fw-bold">採点キーエラー</div>'
            + '<div class="small">' + escapeHtml(nk.message) + '</div>'
            + '</div>'
        );
        return;
      }

      // 採点 + 結果TXTダウンロード
      gradeAndDownload(nk.value);
    }
  }
  // ===== [ENTERキー処理（骨組み）]ブロックここまで =====


  // ===== [採点＋結果TXTダウンロード]ブロック =====
  function getQuestionByQid(pack, qid) {
    if (!pack || !pack.questions) return null;
    var i;
    for (i = 0; i < pack.questions.length; i++) {
      if (pack.questions[i].qid === qid) return pack.questions[i];
    }
    return null;
  }

  function normalizeAnswerArray(arr) {
    if (!arr) return [];
    var a = [];
    var i;
    for (i = 0; i < arr.length; i++) {
      var v = String(arr[i] || '').trim().toUpperCase();
      if (v) a.push(v);
    }
    // 重複排除 + ソート
    a.sort();
    var out = [];
    for (i = 0; i < a.length; i++) {
      if (i === 0 || a[i] !== a[i - 1]) out.push(a[i]);
    }
    return out;
  }

  function isCorrectAnswer(userArr, correctArr) {
    var u = normalizeAnswerArray(userArr);
    var c = normalizeAnswerArray(correctArr);
    if (u.length !== c.length) return false;
    var i;
    for (i = 0; i < u.length; i++) {
      if (u[i] !== c[i]) return false;
    }
    return true;
  }

  function getChoiceTextByCid(examQ, cid) {
    if (!examQ || !examQ.choices) return '';
    var i;
    for (i = 0; i < examQ.choices.length; i++) {
      if (String(examQ.choices[i].cid).toUpperCase() === String(cid).toUpperCase()) {
        return examQ.choices[i].text || '';
      }
    }
    return '';
  }

  function sanitizeFileName(name) {
    // Windows/一般的にNGな文字を置換
    var s = String(name || '');
    s = s.replace(/[\\\/:*?"<>|]/g, '_');
    s = s.replace(/\s+/g, '_');
    s = s.replace(/_+/g, '_');
    s = s.replace(/^_+/, '').replace(/_+$/, '');
    if (!s) s = 'result';
    return s;
  }

  function formatDateTimeCompact(dateObj) {
    if (!dateObj) return '';
    var y = dateObj.getFullYear();
    var m = pad2(dateObj.getMonth() + 1);
    var d = pad2(dateObj.getDate());
    var hh = pad2(dateObj.getHours());
    var mm = pad2(dateObj.getMinutes());
    var ss = pad2(dateObj.getSeconds());
    return String(y) + String(m) + String(d) + '_' + String(hh) + String(mm) + String(ss);
  }

  function downloadTextFile(fileName, text) {
    var blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    var url = URL.createObjectURL(blob);

    var a = document.createElement('a');
    a.href = url;
    a.download = fileName;

    // 画面に表示しない（Firefox対策で一瞬DOMへ）
    a.style.display = 'none';
    document.body.appendChild(a);
    a.click();

    setTimeout(function () {
      try { document.body.removeChild(a); } catch (e) {}
      try { URL.revokeObjectURL(url); } catch (e2) {}
    }, 0);
  }

function buildResultTxt(grade, pack, svKey) {
  var lines = [];
  var passLine = (pack && pack.meta && typeof pack.meta.passLinePercent === 'number')
    ? pack.meta.passLinePercent
    : 80;

  var startedAt = state.startedAt ? state.startedAt : null;
  var submittedAt = state.submittedAt ? state.submittedAt : null;
  var gradedAt = state.gradedAt ? state.gradedAt : null;

  lines.push('【MCQ受験結果】');
  lines.push('testName: ' + (pack && pack.meta ? (pack.meta.testName || '') : ''));
  lines.push('testId: ' + (pack && pack.meta ? (pack.meta.testId || '') : ''));
  lines.push('attemptId: ' + (state.attemptId || ''));
  lines.push('empNo: ' + (state.empNo || ''));
  lines.push('name: ' + (state.userName || ''));
  lines.push('startedAt: ' + formatDateTimeReadable(startedAt));
  lines.push('submittedAt: ' + formatDateTimeReadable(submittedAt));
  lines.push('gradedAt: ' + formatDateTimeReadable(gradedAt));
  // ★ SVキーは仕様上、画面表示／ファイル保存禁止のため出力しない
  lines.push('');

  lines.push('result: ' + (grade.passed ? '合格' : '不合格'));
  lines.push('correctRate: ' + String(grade.correctRate.toFixed(1)) + '%');
  lines.push('correctCount: ' + String(grade.correctCount) + '/' + String(grade.total));
  lines.push('passLinePercent: ' + String(passLine) + '%');
  lines.push('');

  if (grade.passed) {
    lines.push('【設問別 正誤一覧】');
    lines.push('');

    var i;
    for (i = 0; i < grade.items.length; i++) {
      var it = grade.items[i];
      lines.push('[' + String(i + 1) + '/' + String(grade.total) + '] ' + it.qid + ' ' + (it.correct ? '○' : '×'));
      lines.push(it.text);
      lines.push('あなたの回答: ' + (it.userAnswerLabel || ''));
      lines.push('正解: ' + (it.correctAnswerLabel || ''));
      lines.push('');
    }
  }

  return lines.join('\r\n');
}

  function gradeCurrentExam(svKey) {
    var pack = state.selectedPack;
    if (!pack) return null;

    var total = state.examQuestions ? state.examQuestions.length : 0;
    if (total === 0) return null;

    var correctCount = 0;
    var items = [];
    var i;

    for (i = 0; i < total; i++) {
      var eq = state.examQuestions[i];
      var qid = eq.qid;
      var qOrig = getQuestionByQid(pack, qid);

      var userArr = state.answers && state.answers[qid] ? state.answers[qid] : [];
      var correctArr = [];
      if (qOrig && Array.isArray(qOrig.answerPlainForDevOnly)) {
        correctArr = qOrig.answerPlainForDevOnly;
      } else if (qOrig && Array.isArray(qOrig.answerPlain)) {
        // 保険（別名フィールド）
        correctArr = qOrig.answerPlain;
      } else {
        correctArr = [];
      }

      var ok = isCorrectAnswer(userArr, correctArr);
      if (ok) correctCount++;

      var userLabel = normalizeAnswerArray(userArr).join(',');
      var correctLabel = normalizeAnswerArray(correctArr).join(',');

      // 表示用：A:〇〇 / B:〇〇
      var uaText = '';
      var caText = '';
      var ua = normalizeAnswerArray(userArr);
      var ca = normalizeAnswerArray(correctArr);
      var j;

      if (ua.length > 0) {
        var uaParts = [];
        for (j = 0; j < ua.length; j++) {
          uaParts.push(ua[j] + ':' + getChoiceTextByCid(eq, ua[j]));
        }
        uaText = uaParts.join(' / ');
      }

      if (ca.length > 0) {
        var caParts = [];
        for (j = 0; j < ca.length; j++) {
          caParts.push(ca[j] + ':' + getChoiceTextByCid(eq, ca[j]));
        }
        caText = caParts.join(' / ');
      }

      items.push({
        qid: qid,
        text: eq.text || '',
        correct: ok,
        userAnswerLabel: uaText ? (userLabel + ' (' + uaText + ')') : (userLabel || ''),
        correctAnswerLabel: caText ? (correctLabel + ' (' + caText + ')') : (correctLabel || '')
      });
    }

    var rate = (total > 0) ? (correctCount / total * 100) : 0;
    rate = Math.round(rate * 10) / 10;

    var passLine = (pack && pack.meta && typeof pack.meta.passLinePercent === 'number')
      ? pack.meta.passLinePercent
      : 80;

    var passed = (rate >= passLine);

    return {
      passed: passed,
      correctRate: rate,
      correctCount: correctCount,
      total: total,
      items: items
    };
  }

  function renderGradeResultHtml(grade, pack) {
    var passLine = (pack && pack.meta && typeof pack.meta.passLinePercent === 'number')
      ? pack.meta.passLinePercent
      : 80;

    var statusTitle = grade.passed ? '合格' : '不合格';
    var cls = grade.passed ? 'alert-success' : 'alert-danger';

    var html = '';
    html += '<div class="alert ' + cls + ' mb-0" role="alert">';
    html += '<div class="fw-bold">' + statusTitle + '</div>';
    html += '<div>正解率：' + String(grade.correctRate.toFixed(1)) + '%（合格ライン：' + String(passLine) + '%）</div>';
    html += '<div>正解数：' + String(grade.correctCount) + ' / ' + String(grade.total) + '</div>';
    html += '<div class="small mt-2">※結果TXTダウンロードが開始されます。</div>';
    html += '</div>';
    return html;
  }

  function gradeAndDownload(svKey) {
    if (!state.started || !state.submitted) return;

    var pack = state.selectedPack;
    if (!pack) return;

    // 採点時刻を記録
    state.gradedAt = new Date();

    var grade = gradeCurrentExam(svKey);
    if (!grade) return;

    state.lastGrade = grade;

    // 画面表示
    setHtml('exam-result-area', renderGradeResultHtml(grade, pack));

    // TXT生成 + ダウンロード
    var txt = buildResultTxt(grade, pack, svKey);

    // ===== [結果TXTファイル名：命名規則]ブロック =====
    // 命名規則：テスト名_社員番号_氏名_合否_採点日時
    // 例：PC基礎_12345_山田太郎_合格_20260103_220501.txt
    var testNameForFile = (pack && pack.meta && pack.meta.testName) ? pack.meta.testName : ((pack && pack.meta && pack.meta.testId) ? pack.meta.testId : 'test');
    var empForFile = state.empNo ? state.empNo : '';
    var nameForFile = state.userName ? state.userName : '';
    var statusForFile = grade.passed ? '合格' : '不合格';
    var gradedAtForFile = state.gradedAt ? formatDateTimeCompact(state.gradedAt) : formatDateTimeCompact(new Date());

    var base = sanitizeFileName(testNameForFile)
      + '_' + sanitizeFileName(empForFile)
      + '_' + sanitizeFileName(nameForFile)
      + '_' + sanitizeFileName(statusForFile)
      + '_' + sanitizeFileName(gradedAtForFile);

    var fname = base + '.txt';
    // ===== [結果TXTファイル名：命名規則]ブロックここまで =====

    downloadTextFile(fname, txt);

  }
  // ===== [採点＋結果TXTダウンロード]ブロックここまで =====


  // ===== [イベントバインド]ブロック =====
  function bindEvents() {
    var empno = byId('exam-empno');
    var name = byId('exam-name');
    var select = byId('exam-test-select');

    var btnStart = byId('btn-exam-start');
    var btnReset = byId('btn-exam-reset');

    var btnPrev = byId('btn-exam-prev');
    var btnNext = byId('btn-exam-next');
    var btnSubmit = byId('btn-exam-submit');

    var btnSvGrade = byId('btn-sv-grade');

    if (empno) empno.addEventListener('input', onInputChanged);
    if (name) name.addEventListener('input', onInputChanged);
    if (select) select.addEventListener('change', onTestSelectChanged);

    if (btnStart) btnStart.addEventListener('click', startExam);
    if (btnReset) btnReset.addEventListener('click', resetExam);

    if (btnPrev) btnPrev.addEventListener('click', prevQuestion);
    if (btnNext) btnNext.addEventListener('click', nextQuestion);
    if (btnSubmit) btnSubmit.addEventListener('click', submitExam);

    // 採点ボタン（ENTERと同じ扱い）
    if (btnSvGrade) {
      btnSvGrade.addEventListener('click', function () {
        var sv = byId('sv-key');
        if (!sv) return;
        // 擬似的にENTER
        handleKeydown({ key: 'Enter' });
      });
    }

    // キー操作
    document.addEventListener('keydown', handleKeydown);
  }
  // ===== [イベントバインド]ブロックここまで =====

  // ===== [初期化]ブロック =====
  function init() {
    // packs 読み込み
    state.packs = getAllTestPacksFromGlobal();

    // UI反映
    populateTestSelect();
    updateTestInfoPanel();
    updateStartButtonState();

    // Tooltip 初期化（data-bs-toggle="tooltip" を有効化）
    if (window.bootstrap && window.bootstrap.Tooltip) {
      try {
        var tooltipTriggers = document.querySelectorAll('[data-bs-toggle="tooltip"]');
        var i;
        for (i = 0; i < tooltipTriggers.length; i++) {
          if (!window.bootstrap.Tooltip.getInstance(tooltipTriggers[i])) {
            new window.bootstrap.Tooltip(tooltipTriggers[i]);
          }
        }
      } catch (e) {}
    }

    // 初期表示
    setText('app-version', APP_VERSION);

    // 初期の受験画面
    setHtml('exam-question-area', '<div class="text-muted">受験を開始してください</div>');
    setText('exam-progress', '0 / 0');
    hideEl('exam-after-submit');

    // ボタン
    setDisabled('btn-exam-prev', true);
    setDisabled('btn-exam-next', true);
    setDisabled('btn-exam-submit', true);

    // イベント
    bindEvents();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
  // ===== [初期化]ブロックここまで =====

})();
