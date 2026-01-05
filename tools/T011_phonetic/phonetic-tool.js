// phonetic-tool.js
// フォネティックコード表示ツール（ロジック本体）
//
// 仕様：
// /.../ - 大文字/小文字は区別せず、参照は toUpperCase() で統一
//
// 追加仕様（確定）：
// - 「クイック参照」には PHONETIC_MAP に存在するキーをすべて表示する
// - JIS配列に近い形（5段構成）で表示し、テンキーは表示しない
// - 記号はJIS/US配列っぽい並びに寄せる（7段目は作らない）
// - アンダーバー「_」は5段目の一番右に配置
//
// 注意：
// - Bootstrap Tooltip を使用（data-bs-toggle="tooltip"）
// - 右カード（候補/クイック参照）描画時に tooltip dispose するため、左側（1文字ずつ表示）の tooltip を巻き込まないように管理を分離する

(function () {
  "use strict";

  // ===== JISクイック参照レイアウト定義ここから =====
  // 5段構成（テンキー無し）
  // 1段目：数字列 + 記号（JIS寄せ）
  // 2段目：Shift記号列（JIS寄せ）
  // 3段目：QWERTY列（記号含む）
  // 4段目：ASDF列（+:* を L の右へ）
  // 5段目：ZXCV列（記号寄せ、_ を右端へ）
  var JIS_LAYOUT_ROWS = [
    // 1段目
    ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "^", "¥"],
    // 2段目（Shift相当の記号）
    ["!", '"', "#", "$", "%", "&", "'", "(", ")", "=", "~", "|"],
    // 3段目
    ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "@", "[", "]", "{", "}"],
    // 4段目
    ["A", "S", "D", "F", "G", "H", "J", "K", "L", ";", ":", "+", "*"],
    // 5段目（※最右が "_"）
    ["Z", "X", "C", "V", "B", "N", "M", ",", ".", "/", "<", ">", "?", "¥", "_"]
  ];
  // ===== JISクイック参照レイアウト定義ここまで =====

  function disposeTooltipsChars() {
    for (var i = 0; i < tooltipInstancesChars.length; i++) {
      try {
        tooltipInstancesChars[i].dispose();
      } catch (e) {
        // ignore
      }
    }
    tooltipInstancesChars = [];
  }

  function disposeTooltipsAssist() {
    for (var i = 0; i < tooltipInstancesAssist.length; i++) {
      try {
        tooltipInstancesAssist[i].dispose();
      } catch (e) {
        // ignore
      }
    }
    tooltipInstancesAssist = [];
  }

  function safeText(s) {
    return String(s == null ? "" : s);
  }

  function escapeHtml(str) {
    var s = safeText(str);
    return s
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  // ★修正：window.PHONETIC_MAP 参照をやめ、PHONETIC_MAP（グローバル）を直接見る
  function hasMap() {
    return !(typeof PHONETIC_MAP === "undefined" || !PHONETIC_MAP);
  }

  function normalizeKey(ch) {
    // 参照は大文字で統一
    return safeText(ch).toUpperCase();
  }

  // ★修正：PHONETIC_MAP を参照
  function getCandidates(ch) {
    if (!hasMap()) return [];
    var k = normalizeKey(ch);
    var arr = PHONETIC_MAP[k];
    if (!Array.isArray(arr)) return [];
    // 最大3候補を返す（仕様）
    return arr.slice(0, 3);
  }

  // ★修正：PHONETIC_MAP を参照
  function getAllMapKeysUpper() {
    if (!hasMap()) return [];
    var keys = Object.keys(PHONETIC_MAP || {});
    // 正規化（大文字）
    keys = keys.map(function (k) {
      return safeText(k).toUpperCase();
    });
    // 重複排除
    var seen = {};
    var uniq = [];
    for (var i = 0; i < keys.length; i++) {
      var kk = keys[i];
      if (!seen[kk]) {
        seen[kk] = true;
        uniq.push(kk);
      }
    }
    return uniq;
  }

  function buildQuickKeysByLayout() {
    // JISレイアウトに沿って並べる
    // ※PHONETIC_MAP に存在するキーを優先的に表示する（存在しないものは表示しない）
    var allKeys = getAllMapKeysUpper();
    var inMap = {};
    for (var i = 0; i < allKeys.length; i++) {
      inMap[allKeys[i]] = true;
    }

    var rows = [];
    for (var r = 0; r < JIS_LAYOUT_ROWS.length; r++) {
      var row = [];
      for (var c = 0; c < JIS_LAYOUT_ROWS[r].length; c++) {
        var k = normalizeKey(JIS_LAYOUT_ROWS[r][c]);
        if (inMap[k]) {
          row.push(k);
        } else {
          // PHONETIC_MAP に無いものはこの段では表示しない
          //（ただし後段で「その他」としてまとめることもできるが、今回は5段で全表示するため、ここではスキップ）
        }
      }
      rows.push(row);
    }

    // 上記レイアウトに含まれなかった PHONETIC_MAP キーを「その他」としてどこかに追加するのではなく、
    // 仕様：「PHONETIC_MAP にあるキーは全部出す」かつ「5段構成で全表示」なので、
    // 余りは 5段目の末尾に順番に差し込む（JIS/US寄せを崩さない範囲で、末尾に追加）
    // ※ただし5段目が増えすぎるのを避ける制約が無いので、ここでは単純追加
    var placed = {};
    for (var rr = 0; rr < rows.length; rr++) {
      for (var cc = 0; cc < rows[rr].length; cc++) {
        placed[rows[rr][cc]] = true;
      }
    }

    var remain = [];
    for (var j = 0; j < allKeys.length; j++) {
      var key = allKeys[j];
      if (!placed[key]) remain.push(key);
    }

    if (remain.length > 0) {
      // 5段目へ追加（末尾）
      for (var x = 0; x < remain.length; x++) {
        rows[4].push(remain[x]);
      }
    }

    return rows;
  }

  function initTooltipsInRoot(rootEl, bucket) {
    if (!rootEl) return;
    if (typeof bootstrap === "undefined" || !bootstrap || !bootstrap.Tooltip) return;
    var b = bucket || tooltipInstancesAssist;

    var nodes = rootEl.querySelectorAll('[data-bs-toggle="tooltip"]');
    for (var i = 0; i < nodes.length; i++) {
      try {
        var tip = new bootstrap.Tooltip(nodes[i]);
        b.push(tip);
      } catch (e) {
        // ignore
      }
    }
  }

  // 右カード：候補表示（クリック/ホバー時）
  function renderCandidatesView(ch, candidates) {
    if (!assistEl) return;

    disposeTooltipsAssist();

    var displayCh = safeText(ch);

    var html = "";
    html += '<div class="mb-2 d-flex justify-content-between align-items-center">';
    html += '<div>';
    html += '<div class="fw-bold">フォネティック候補</div>';
    html += '<div class="text-muted small">選択した文字：<span class="fw-bold">' + escapeHtml(displayCh) + "</span></div>";
    html += "</div>";
    html += '<button type="button" class="btn btn-outline-secondary btn-sm" id="btnBackToQuick">戻る</button>';
    html += "</div>";

    if (!candidates || candidates.length === 0) {
      html += '<div class="alert alert-secondary mb-0">候補が見つかりませんでした。</div>';
      assistEl.innerHTML = html;
      return;
    }

    html += '<div class="row g-2">';
    for (var i = 0; i < candidates.length; i++) {
      var c = safeText(candidates[i]);
      html += '<div class="col-12">';
      html += '<div class="card shadow-sm">';
      html += '<div class="card-body py-2">';
      html += '<div class="fw-bold">' + escapeHtml(c) + "</div>";
      html += "</div>";
      html += "</div>";
      html += "</div>";
    }
    html += "</div>";

    assistEl.innerHTML = html;

    // 戻る（候補表示 → クイック参照）
    var backBtn = document.getElementById("btnBackToQuick");
    if (backBtn) {
      backBtn.addEventListener("click", function () {
        renderStandbyView();
      });
    }
  }


  // 右カード：待機表示（クイック参照）
  function renderStandbyView() {
    if (!assistEl) return;

    disposeTooltipsAssist();

    if (!hasMap()) {
      assistEl.innerHTML =
        '<div class="alert alert-warning mb-0">PHONETIC_MAP が読み込まれていません。phonetic-data.js を確認してください。</div>';
      return;
    }

    var rows = buildQuickKeysByLayout();

    var html = "";
    html += '<div class="mb-2">';
    html += '<div class="fw-bold">フォネティック候補</div>';
    html += '<div class="text-muted small">クイック参照</div>';
    html += "</div>";

    html += '<div class="text-muted small mb-2">';
    html += "日本語(JIS)キーボード配列に近い形で表示します。Shift文字は別段で独立表示します。ホバー中は候補（最大3）をTipsで表示します。";
    html += "</div>";

    html += '<div class="d-flex align-items-center gap-2 mb-2">';
    html += '<button type="button" class="btn btn-primary btn-sm" id="btnShowAllCandidates">一覧を表示</button>';
    html += '<div class="text-muted small">（全キーの3候補を一括表示）</div>';
    html += "</div>";

    html += '<div class="border rounded p-2">';
    for (var r = 0; r < rows.length; r++) {
      html += '<div class="d-flex flex-wrap gap-2 mb-2">';
      for (var c = 0; c < rows[r].length; c++) {
        var key = rows[r][c];
        var candidates = getCandidates(key);
        var tipText = candidates && candidates.length > 0 ? candidates.join(" / ") : "候補なし";
        html +=
          '<button type="button" class="btn btn-outline-primary btn-sm" ' +
          'data-bs-toggle="tooltip" data-bs-placement="top" data-bs-trigger="hover focus" ' +
          'title="' +
          escapeHtml(tipText) +
          '" ' +
          'data-key="' +
          escapeHtml(key) +
          '">' +
          escapeHtml(key) +
          "</button>";
      }
      html += "</div>";
    }
    html += "</div>";

    assistEl.innerHTML = html;

    // クリックで候補表示（右カード）
    var buttons = assistEl.querySelectorAll("button[data-key]");
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].addEventListener("click", function (ev) {
        var k = safeText(ev.currentTarget.getAttribute("data-key"));
        var cand = getCandidates(k);
        renderCandidatesView(k, cand);
      });
    }

    // 一覧表示ボタン
    var showAllBtn = document.getElementById("btnShowAllCandidates");
    if (showAllBtn) {
      showAllBtn.addEventListener("click", function () {
        renderAllCandidatesView();
      });
    }

    // 右カード内のみ Tooltip 初期化（Assist用バケットへ）
    initTooltipsInRoot(assistEl);
  }

  // 一覧（PHONETIC_MAP 全キーの最大3候補）を表示
  function renderAllCandidatesView() {
    if (!assistEl) return;

    disposeTooltipsAssist();

    if (!hasMap()) {
      assistEl.innerHTML =
        '<div class="alert alert-warning mb-0">PHONETIC_MAP が読み込まれていません。phonetic-data.js を確認してください。</div>';
      return;
    }

    var allKeys = getAllMapKeysUpper();
    allKeys.sort();

    var html = "";
    html += '<div class="mb-2 d-flex justify-content-between align-items-center">';
    html += '<div>';
    html += '<div class="fw-bold">フォネティック候補</div>';
    html += '<div class="text-muted small">一覧（PHONETIC_MAP 全キー）</div>';
    html += "</div>";
    html += '<button type="button" class="btn btn-outline-secondary btn-sm" id="btnBackToQuick">戻る</button>';
    html += "</div>";

    html += '<div class="border rounded p-2" id="allCandidatesArea">';
    for (var i = 0; i < allKeys.length; i++) {
      var k = allKeys[i];
      var cand = getCandidates(k);
      var tipText = cand && cand.length > 0 ? cand.join(" / ") : "候補なし";

      html += '<div class="d-flex align-items-center gap-2 mb-2 flex-wrap">';
      html +=
        '<button type="button" class="btn btn-outline-primary btn-sm" ' +
        'data-bs-toggle="tooltip" data-bs-placement="top" data-bs-trigger="hover focus" ' +
        'title="' +
        escapeHtml(tipText) +
        '" ' +
        'data-key="' +
        escapeHtml(k) +
        '">' +
        escapeHtml(k) +
        "</button>";

      // 候補を3つ並べて表示
      if (cand && cand.length > 0) {
        for (var j = 0; j < cand.length; j++) {
          html += '<span class="badge rounded-pill text-bg-light border">' + escapeHtml(cand[j]) + "</span>";
        }
      } else {
        html += '<span class="text-muted small">（候補なし）</span>';
      }
      html += "</div>";
    }
    html += "</div>";

    assistEl.innerHTML = html;

    // 戻る
    var backBtn = document.getElementById("btnBackToQuick");
    if (backBtn) {
      backBtn.addEventListener("click", function () {
        renderStandbyView();
      });
    }

    // クリックで候補表示（右カード）
    var buttons = assistEl.querySelectorAll("button[data-key]");
    for (var b = 0; b < buttons.length; b++) {
      buttons[b].addEventListener("click", function (ev) {
        var kk = safeText(ev.currentTarget.getAttribute("data-key"));
        var cc = getCandidates(kk);
        renderCandidatesView(kk, cc);
      });
    }

    // Tooltip 初期化（Assist用バケットへ）
    var allArea = document.getElementById("allCandidatesArea");
    if (allArea) {
      initTooltipsInRoot(allArea);
    }
  }

  // 左：1文字ずつ表示エリアの active 状態管理
  function clearActiveSpan() {
    if (activeSpanEl) {
      try {
        activeSpanEl.classList.remove("text-bg-primary");
        activeSpanEl.classList.add("text-bg-light");
      } catch (e) {
        // ignore
      }
    }
    activeSpanEl = null;
  }

  function setActiveSpan(span) {
    clearActiveSpan();
    activeSpanEl = span;
    if (activeSpanEl) {
      try {
        activeSpanEl.classList.remove("text-bg-light");
        activeSpanEl.classList.add("text-bg-primary");
      } catch (e) {
        // ignore
      }
    }
  }

  function updateCount(value) {
    if (!countEl) return;
    var v = safeText(value);
    countEl.textContent = String(v.length);
  }

  function renderChars(value) {
    if (!charsEl) return;

    disposeTooltipsChars();
    clearActiveSpan();
    charsEl.innerHTML = "";

    var v = safeText(value);
    updateCount(v);

    if (v.length === 0) {
      charsEl.innerHTML = '<span class="text-muted">（ここに1文字ずつ表示されます）</span>';
      renderStandbyView();
      return;
    }

    var frag = document.createDocumentFragment();

    for (var i = 0; i < v.length; i++) {
      (function (idx) {
        var ch = v.charAt(idx);
        var key = normalizeKey(ch);
        var candidates = getCandidates(key);

        var tooltipText = "";
        if (candidates && candidates.length > 0) {
          tooltipText = candidates.join(" / ");
        } else {
          tooltipText = "候補なし";
        }

        var span = document.createElement("span");
span.className = "phonetic-char badge text-bg-light border me-1 mb-1";

        span.setAttribute("tabindex", "0");
        span.setAttribute("role", "button");
        span.setAttribute("data-bs-toggle", "tooltip");
        span.setAttribute("data-bs-placement", "top");
        span.setAttribute("data-bs-trigger", "hover focus");
        span.setAttribute("title", tooltipText);

        if (ch === " ") {
          span.textContent = "␠";
          span.className += " text-muted";
        } else if (ch === "\t") {
          span.textContent = "⇥";
          span.className += " text-muted";
        } else if (ch === "\n" || ch === "\r") {
          span.textContent = "⏎";
          span.className += " text-muted";
        } else {
          span.textContent = ch;
        }

        span.addEventListener("mouseenter", function () {
          setActiveSpan(span);
          // 右カードはクイック参照を維持（ここでは候補表示へ切り替えない）
        });

        span.addEventListener("mouseleave", function () {
          clearActiveSpan();
          renderStandbyView();
        });

        span.addEventListener("blur", function () {
          clearActiveSpan();
          renderStandbyView();
        });

        span.addEventListener("click", function () {
          setActiveSpan(span);
          renderCandidatesView(ch, candidates);
        });

        frag.appendChild(span);

        if (typeof bootstrap !== "undefined" && bootstrap && bootstrap.Tooltip) {
          try {
            var tip = new bootstrap.Tooltip(span);
            tooltipInstancesChars.push(tip);
          } catch (e) {
            // ignore
          }
        }
      })(i);
    }

    charsEl.appendChild(frag);

    // 入力があっても、右カードはクイック参照を維持
    renderStandbyView();
  }

  function init() {
    inputEl = document.getElementById("phoneticInput");
    charsEl = document.getElementById("phoneticChars");
    countEl = document.getElementById("phoneticCount");
    assistEl = document.getElementById("phoneticAssist");

    if (!inputEl || !charsEl || !countEl || !assistEl) return;

    inputEl.addEventListener("input", function () {
      renderChars(inputEl.value);
    });

    // 初期表示
    renderChars(inputEl.value || "");
  }

  // Tooltipインスタンス管理（★分離：左と右で別配列）
  var tooltipInstancesChars = [];
  var tooltipInstancesAssist = [];
  var activeSpanEl = null;

  // DOM参照
  var inputEl = null;
  var charsEl = null;
  var countEl = null;
  var assistEl = null;

  document.addEventListener("DOMContentLoaded", init);
})();
