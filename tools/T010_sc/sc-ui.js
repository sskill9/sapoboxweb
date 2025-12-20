// sc-ui.js — アプリバッジ／アプリフィルタ／キーボード／選択キー表示／イベント
(function () {
  if (!window.SC_APP) window.SC_APP = {};
  var SC_APP = window.SC_APP;

  if (!SC_APP.ui) SC_APP.ui = {};

  // =========================
  // UI: 選択中キー表示
  // =========================
  SC_APP.ui.renderSelectedKeys = function () {
    var el = document.getElementById("scSelectedKeys");
    if (!el) return;

    if (SC_APP.state.selectedKeys.length === 0) {
      el.innerHTML = '<span class="text-muted small">なし</span>';
      return;
    }

    var html = "";
    for (var i = 0; i < SC_APP.state.selectedKeys.length; i++) {
      var k = SC_APP.state.selectedKeys[i];
      html += '<span class="badge text-bg-primary">' + SC_APP.escapeHtml(k) + "</span>";
      if (i !== SC_APP.state.selectedKeys.length - 1) html += " ";
    }
    el.innerHTML = html;
  };

  // =========================
  // UI: アプリバッジ＆説明文
  // =========================
  SC_APP.ui.renderAppBadgesAndDesc = function () {
    var badgesEl = document.getElementById("scAppBadges");
    var descEl = document.getElementById("scAppDesc");

    if (badgesEl) {
      var html = "";
      for (var i = 0; i < (SC_APP.data.apps || []).length; i++) {
        var raw = SC_APP.data.apps[i];
        var disp = SC_APP.appLabelToDisplay(raw);

        html += [
          '<span class="badge rounded-pill fw-semibold me-2" style="background-color:#0d6efd;color:#ffffff;font-size:0.78rem;">',
          SC_APP.escapeHtml(disp),
          "</span>"
        ].join("");
      }

      html += '<span class="badge rounded-pill fw-semibold" style="background-color:#20c997;color:#ffffff;font-size:0.78rem;">ショートカット</span>';
      badgesEl.innerHTML = html;
    }

    if (descEl) {
      var appsText = (SC_APP.data.apps && SC_APP.data.apps.length > 0)
        ? SC_APP.data.apps.map(function (a) { return SC_APP.appLabelToDisplay(a); }).join(" / ")
        : "（データ未読込）";

      descEl.textContent = "キーワード検索（例：コピー／スクリーンショット）と、画面上のキー選択でショートカットを絞り込めます。※このプロトタイプは " + appsText + "（仮データ：JS読込）です。";
    }
  };

  // =========================
  // UI: アプリフィルタ
  // =========================
  SC_APP.ui.renderAppFilter = function () {
    var wrap = document.getElementById("scAppFilter");
    if (!wrap) return;

    var apps = SC_APP.data.apps || [];
    if (apps.length === 0) {
      wrap.innerHTML = '<span class="text-muted small">（アプリデータなし）</span>';
      return;
    }

    var allMode = (SC_APP.state.selectedApps.length === 0);

    var html = "";
    html += [
      '<button type="button" class="',
      (allMode ? "btn btn-primary btn-sm" : "btn btn-outline-secondary btn-sm"),
      '" id="scAppAllBtn" aria-pressed="',
      (allMode ? "true" : "false"),
      '">全アプリ</button>'
    ].join("");

    for (var i = 0; i < apps.length; i++) {
      var raw = apps[i];
      var disp = SC_APP.appLabelToDisplay(raw);
      var active = allMode ? true : SC_APP.arrayContains(SC_APP.state.selectedApps, raw);

      html += [
        ' <button type="button" class="',
        (active ? "btn btn-primary btn-sm" : "btn btn-outline-secondary btn-sm"),
        ' sc-app-btn" data-app="',
        SC_APP.escapeAttr(raw),
        '" aria-pressed="',
        (active ? "true" : "false"),
        '">',
        SC_APP.escapeHtml(disp),
        "</button>"
      ].join("");
    }

    wrap.innerHTML = html;

    var allBtn = document.getElementById("scAppAllBtn");
    if (allBtn) {
      allBtn.addEventListener("click", function () {
        SC_APP.state.selectedApps = [];
        SC_APP.ui.renderAppFilter();
        SC_APP.renderResults();
      });
    }

    var btns = wrap.querySelectorAll(".sc-app-btn");
    for (var b = 0; b < btns.length; b++) {
      btns[b].addEventListener("click", function (ev) {
        var app = ev.currentTarget.getAttribute("data-app");
        SC_APP.ui.toggleApp(app);
      });
    }
  };

  SC_APP.ui.toggleApp = function (appRaw) {
    if (!appRaw) return;

    if (SC_APP.state.selectedApps.length === 0) {
      SC_APP.state.selectedApps = [appRaw];
    } else {
      if (SC_APP.arrayContains(SC_APP.state.selectedApps, appRaw)) {
        SC_APP.state.selectedApps = SC_APP.removeFromArray(SC_APP.state.selectedApps, appRaw);
      } else {
        SC_APP.state.selectedApps = SC_APP.uniqueArray(SC_APP.state.selectedApps.concat([appRaw]));
      }
    }

    SC_APP.ui.renderAppFilter();
    SC_APP.renderResults();
  };

  // =========================
  // UI: キーボード
  // =========================
  SC_APP.ui.isSelectedKey = function (k) {
    var nk = SC_APP.normalizeKey(k);
    for (var i = 0; i < SC_APP.state.selectedKeys.length; i++) {
      if (SC_APP.state.selectedKeys[i] === nk) return true;
    }
    return false;
  };

  SC_APP.ui.createKeyBtn = function (label, value) {
    var k = SC_APP.normalizeKey(value || label);
    var active = SC_APP.ui.isSelectedKey(k);
    var cls = active ? "btn btn-primary btn-sm" : "btn btn-outline-secondary btn-sm";

    return [
      '<button type="button" class="',
      cls,
      ' sc-key-btn" data-key="',
      SC_APP.escapeAttr(k),
      '" aria-pressed="',
      (active ? "true" : "false"),
      '">',
      SC_APP.escapeHtml(label),
      "</button>"
    ].join("");
  };

  SC_APP.ui.renderKeyboard = function () {
    var el = document.getElementById("scKeyboard");
    if (!el) return;

    var rows = [];

    rows.push([
      SC_APP.ui.createKeyBtn("Win", "Win"),
      SC_APP.ui.createKeyBtn("Ctrl", "Ctrl"),
      SC_APP.ui.createKeyBtn("Alt", "Alt"),
      SC_APP.ui.createKeyBtn("Shift", "Shift")
    ]);

    rows.push([
      SC_APP.ui.createKeyBtn("Esc", "Esc"),
      SC_APP.ui.createKeyBtn("Tab", "Tab"),
      SC_APP.ui.createKeyBtn("Enter", "Enter"),
      SC_APP.ui.createKeyBtn("Space", "Space"),
      SC_APP.ui.createKeyBtn("Backspace", "Backspace"),
      SC_APP.ui.createKeyBtn("Delete", "Delete"),
      SC_APP.ui.createKeyBtn("PrtScn", "PrtScn")
    ]);

    rows.push([
      SC_APP.ui.createKeyBtn("←", "Left"),
      SC_APP.ui.createKeyBtn("↑", "Up"),
      SC_APP.ui.createKeyBtn("↓", "Down"),
      SC_APP.ui.createKeyBtn("→", "Right")
    ]);

    var fRow = [];
    for (var fi = 1; fi <= 12; fi++) {
      fRow.push(SC_APP.ui.createKeyBtn("F" + fi, "F" + fi));
    }
    rows.push(fRow);

    var dRow = [];
    for (var di = 0; di <= 9; di++) {
      dRow.push(SC_APP.ui.createKeyBtn(String(di), String(di)));
    }
    rows.push(dRow);

    var letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var lRow = [];
    for (var li = 0; li < letters.length; li++) {
      lRow.push(SC_APP.ui.createKeyBtn(letters[li], letters[li]));
    }
    rows.push(lRow);

    var html = "";
    for (var ri = 0; ri < rows.length; ri++) {
      html += '<div class="d-flex flex-wrap gap-2">' + rows[ri].join(" ") + "</div>";
      if (ri !== rows.length - 1) html += "\n";
    }

    el.innerHTML = html;

    var btns = el.querySelectorAll(".sc-key-btn");
    for (var bi = 0; bi < btns.length; bi++) {
      btns[bi].addEventListener("click", function (ev) {
        var key = ev.currentTarget.getAttribute("data-key");
        SC_APP.ui.toggleKey(key);
      });
    }
  };

  SC_APP.ui.toggleKey = function (k) {
    var nk = SC_APP.normalizeKey(k);

    var next = [];
    var found = false;

    for (var i = 0; i < SC_APP.state.selectedKeys.length; i++) {
      if (SC_APP.state.selectedKeys[i] === nk) {
        found = true;
      } else {
        next.push(SC_APP.state.selectedKeys[i]);
      }
    }

    if (!found) next.push(nk);

    SC_APP.state.selectedKeys = SC_APP.uniqueArray(next);

    SC_APP.ui.renderSelectedKeys();
    SC_APP.ui.renderKeyboard();
    SC_APP.renderResults();
  };

  SC_APP.ui.clearKeys = function () {
    SC_APP.state.selectedKeys = [];
    SC_APP.ui.renderSelectedKeys();
    SC_APP.ui.renderKeyboard();
    SC_APP.renderResults();
  };

  SC_APP.ui.clearApps = function () {
    SC_APP.state.selectedApps = [];
    SC_APP.ui.renderAppFilter();
    SC_APP.renderResults();
  };

  SC_APP.ui.clearAll = function () {
    SC_APP.state.keyword = "";
    SC_APP.state.exactMatch = false;

    var keywordInput = document.getElementById("scKeyword");
    var exactMatchChk = document.getElementById("scExactMatch");

    if (keywordInput) keywordInput.value = "";
    if (exactMatchChk) exactMatchChk.checked = false;

    SC_APP.ui.clearKeys();
    SC_APP.ui.clearApps();
  };

  // =========================
  // UI: イベント紐づけ
  // =========================
  SC_APP.ui.bindEvents = function () {
    var keywordInput = document.getElementById("scKeyword");
    var exactMatchChk = document.getElementById("scExactMatch");
    var clearKeysBtn = document.getElementById("scClearKeysBtn");
    var clearAppsBtn = document.getElementById("scClearAppsBtn");
    var clearAllBtn = document.getElementById("scClearAllBtn");

    if (keywordInput) {
      keywordInput.addEventListener("input", function () {
        SC_APP.state.keyword = String(keywordInput.value || "");
        SC_APP.renderResults();
      });
    }

    if (exactMatchChk) {
      exactMatchChk.addEventListener("change", function () {
        SC_APP.state.exactMatch = !!exactMatchChk.checked;
        SC_APP.renderResults();
      });
    }

    if (clearKeysBtn) {
      clearKeysBtn.addEventListener("click", function () {
        SC_APP.ui.clearKeys();
      });
    }

    if (clearAppsBtn) {
      clearAppsBtn.addEventListener("click", function () {
        SC_APP.ui.clearApps();
      });
    }

    if (clearAllBtn) {
      clearAllBtn.addEventListener("click", function () {
        SC_APP.ui.clearAll();
      });
    }
  };

  // =========================
  // 初期化（content.js から呼ぶ）
  // =========================
  SC_APP.init = function () {
    SC_APP.initResults();                 // データ統合＋結果描画（初回）
    SC_APP.ui.renderAppBadgesAndDesc();   // 上部バッジ＆説明
    SC_APP.ui.renderAppFilter();          // アプリフィルタ
    SC_APP.ui.renderSelectedKeys();       // 選択キー表示
    SC_APP.ui.renderKeyboard();           // キーボード
    SC_APP.ui.bindEvents();               // UIイベント
    SC_APP.renderResults();               // 念のため再描画
  };
})();
