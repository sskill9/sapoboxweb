// sc-results.js — データ統合／検索・絞り込み／結果描画／コピー
(function () {
  if (!window.SC_APP) window.SC_APP = {};

  var SC_APP = window.SC_APP;

  // =========================
  // 状態
  // =========================
  if (!SC_APP.state) {
    SC_APP.state = {
      selectedKeys: [],
      selectedApps: [],   // 未選択＝全アプリ
      keyword: "",
      exactMatch: false
    };
  }

  // =========================
  // ユーティリティ
  // =========================
  SC_APP.escapeHtml = function (s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  };

  SC_APP.escapeAttr = function (s) {
    return SC_APP.escapeHtml(s).replace(/`/g, "&#96;");
  };

  SC_APP.KEY_ALIAS = {
    "Windows": "Win",
    "WIN": "Win",
    "Win": "Win",

    "Control": "Ctrl",
    "CTRL": "Ctrl",
    "Ctrl": "Ctrl",

    "Alternate": "Alt",
    "ALT": "Alt",
    "Alt": "Alt",

    "Shift": "Shift",
    "SHIFT": "Shift",
    "Shift": "Shift",

    "Enter": "Enter",
    "RETURN": "Enter",
    "Return": "Enter",

    "Esc": "Esc",
    "Escape": "Esc",

    "Backspace": "Backspace",

    "Del": "Delete",
    "Delete": "Delete",

    "PrintScreen": "PrtScn",
    "PrtSc": "PrtScn",
    "PrtScn": "PrtScn",

    "ArrowLeft": "Left",
    "ArrowRight": "Right",
    "ArrowUp": "Up",
    "ArrowDown": "Down"
  };

  SC_APP.normalizeKey = function (k) {
    if (k == null) return "";
    var s = String(k).trim();
    if (SC_APP.KEY_ALIAS[s]) return SC_APP.KEY_ALIAS[s];
    return s;
  };

  SC_APP.comboToString = function (keys) {
    var arr = keys || [];
    var out = [];
    for (var i = 0; i < arr.length; i++) {
      out.push(SC_APP.normalizeKey(arr[i]));
    }
    return out.join("+");
  };

  SC_APP.uniqueArray = function (arr) {
    var map = Object.create(null);
    var out = [];
    for (var i = 0; i < arr.length; i++) {
      var v = arr[i];
      if (!map[v]) {
        map[v] = true;
        out.push(v);
      }
    }
    return out;
  };

  SC_APP.arrayContains = function (arr, v) {
    for (var i = 0; i < arr.length; i++) {
      if (arr[i] === v) return true;
    }
    return false;
  };

  SC_APP.removeFromArray = function (arr, v) {
    var out = [];
    for (var i = 0; i < arr.length; i++) {
      if (arr[i] !== v) out.push(arr[i]);
    }
    return out;
  };

  // =========================
  // アプリ表示名（短縮）
  // =========================
  SC_APP.APP_DISPLAY_ALIAS = {
    "Windows11": "Win11"
  };

  SC_APP.appLabelToDisplay = function (appLabel) {
    if (SC_APP.APP_DISPLAY_ALIAS[appLabel]) return SC_APP.APP_DISPLAY_ALIAS[appLabel];
    return appLabel;
  };

  // =========================
  // データ（JSファイル想定：window.SC_SHORTCUT_DATASETS）
  // =========================
  if (!window.SC_SHORTCUT_DATASETS) window.SC_SHORTCUT_DATASETS = [];

  // フォールバック（何も読み込まれていない場合だけ、最低限の仮データを投入）
  (function ensureFallbackDatasets() {
    var list = window.SC_SHORTCUT_DATASETS;

    var hasWindows11 = false;
    var hasExcel = false;

    for (var i = 0; i < list.length; i++) {
      var ds = list[i] || {};
      if (ds.appId === "Windows11" || ds.appLabel === "Windows11") hasWindows11 = true;
      if (ds.appId === "Excel" || ds.appLabel === "Excel") hasExcel = true;
    }

    if (!hasWindows11) {
      list.push({
        appId: "Windows11",
        appLabel: "Windows11",
        shortcuts: [
          { keys: ["Ctrl", "C"], name: "コピー", desc: "選択中の内容をコピー" },
          { keys: ["Ctrl", "V"], name: "貼り付け", desc: "コピー/切り取りした内容を貼り付け" },
          { keys: ["Alt", "Tab"], name: "アプリ切り替え", desc: "起動中アプリを切り替え" },
          { keys: ["Alt", "F4"], name: "ウィンドウを閉じる", desc: "現在のアプリ/ウィンドウを閉じる" },
          { keys: ["Win", "Shift", "S"], name: "画面切り取り", desc: "範囲選択でスクリーンショット" },
          { keys: ["PrtScn"], name: "スクリーンショット（コピー）", desc: "画面全体をクリップボードにコピー（設定により動作が変わる場合あり）" },
          { keys: ["Alt", "PrtScn"], name: "アクティブウィンドウ撮影", desc: "アクティブウィンドウをクリップボードにコピー" }
        ]
      });
    }

    // 「今後に備えて複数JSで検証したい」用途のため、Excelも未読込なら少量入れる
    if (!hasExcel) {
      list.push({
        appId: "Excel",
        appLabel: "Excel",
        shortcuts: [
          { keys: ["Ctrl", "A"], name: "すべて選択", desc: "シート/範囲を全選択" },
          { keys: ["Ctrl", "1"], name: "セルの書式設定", desc: "セルの書式設定ダイアログを開く" },
          { keys: ["Ctrl", "Shift", "L"], name: "フィルター", desc: "オートフィルターを切り替え" }
        ]
      });
    }
  })();

  // =========================
  // データ統合
  // =========================
  SC_APP.data = {
    merged: [],
    apps: []
  };

  SC_APP.buildMergedData = function () {
    var datasets = window.SC_SHORTCUT_DATASETS || [];
    var merged = [];

    for (var i = 0; i < datasets.length; i++) {
      var ds = datasets[i] || {};
      var appLabel = ds.appLabel || ds.appId || "UnknownApp";
      var list = ds.shortcuts || [];

      for (var j = 0; j < list.length; j++) {
        var s = list[j] || {};
        merged.push({
          app: appLabel,
          type: s.type || "chord",
          keys: s.keys || [],
          name: s.name || "",
          desc: (s.desc != null ? s.desc : (s.description != null ? s.description : ""))
        });
      }
    }

    SC_APP.data.merged = merged;

    var map = Object.create(null);
    var apps = [];
    for (var k = 0; k < merged.length; k++) {
      var a = merged[k].app;
      if (!a) continue;
      if (!map[a]) {
        map[a] = true;
        apps.push(a);
      }
    }

    apps.sort(function (a1, a2) {
      var d1 = SC_APP.appLabelToDisplay(a1);
      var d2 = SC_APP.appLabelToDisplay(a2);
      if (d1 < d2) return -1;
      if (d1 > d2) return 1;
      return 0;
    });

    SC_APP.data.apps = apps;
  };

  // =========================
  // フィルタ判定
  // =========================
  SC_APP.includesAllKeys = function (haveKeys, needKeys) {
    for (var i = 0; i < needKeys.length; i++) {
      var nk = SC_APP.normalizeKey(needKeys[i]);
      var ok = false;

      for (var j = 0; j < haveKeys.length; j++) {
        if (SC_APP.normalizeKey(haveKeys[j]) === nk) {
          ok = true;
          break;
        }
      }

      if (!ok) return false;
    }
    return true;
  };

  SC_APP.sameKeySet = function (a, b) {
    if (a.length !== b.length) return false;

    for (var i = 0; i < a.length; i++) {
      var ai = SC_APP.normalizeKey(a[i]);
      var found = false;

      for (var j = 0; j < b.length; j++) {
        if (SC_APP.normalizeKey(b[j]) === ai) {
          found = true;
          break;
        }
      }

      if (!found) return false;
    }

    return true;
  };

  SC_APP.isAppMatched = function (itemApp) {
    if (SC_APP.state.selectedApps.length === 0) return true; // 全アプリ
    return SC_APP.arrayContains(SC_APP.state.selectedApps, itemApp);
  };

  // =========================
  // スコア（ソート用）
  // =========================
  SC_APP.scoreItem = function (item, q, selected, exact) {
    var text = [
      item.app,
      item.name,
      item.desc,
      SC_APP.comboToString(item.keys)
    ].join(" ").toLowerCase();

    var score = 0;

    if (q) {
      if (text.indexOf(q) >= 0) score += 50;
      if (SC_APP.comboToString(item.keys).toLowerCase().indexOf(q) >= 0) score += 30;
      if (item.name.toLowerCase().indexOf(q) >= 0) score += 40;
      if (item.desc.toLowerCase().indexOf(q) >= 0) score += 20;
    } else {
      score += 10;
    }

    if (selected.length > 0) {
      if (exact) {
        if (SC_APP.sameKeySet(item.keys, selected)) score += 200;
        else score -= 200;
      } else {
        if (SC_APP.includesAllKeys(item.keys, selected)) score += 120;
        else score -= 120;
      }
    }

    return score;
  };

  // =========================
  // コピー
  // =========================
  SC_APP.copyText = function (text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).catch(function () {
        SC_APP.fallbackCopy(text);
      });
    } else {
      SC_APP.fallbackCopy(text);
    }
  };

  SC_APP.fallbackCopy = function (text) {
    try {
      var ta = document.createElement("textarea");
      ta.value = text;
      ta.setAttribute("readonly", "");
      ta.style.position = "fixed";
      ta.style.left = "-9999px";
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    } catch (e) {
      // 何もしない（環境により不可）
    }
  };

  // =========================
  // 結果描画
  // =========================
  SC_APP.renderResults = function () {
    var resultEl = document.getElementById("scResults");
    var resultStatEl = document.getElementById("scResultStat");
    if (!resultEl) return;

    var q = (SC_APP.state.keyword || "").trim().toLowerCase();
    var exact = !!SC_APP.state.exactMatch;

    var merged = SC_APP.data.merged || [];
    var filtered = [];

    for (var i = 0; i < merged.length; i++) {
      var it = merged[i];

      // アプリ条件
      if (!SC_APP.isAppMatched(it.app)) continue;

      // キー条件
      if (SC_APP.state.selectedKeys.length > 0) {
        if (exact) {
          if (!SC_APP.sameKeySet(it.keys, SC_APP.state.selectedKeys)) continue;
        } else {
          if (!SC_APP.includesAllKeys(it.keys, SC_APP.state.selectedKeys)) continue;
        }
      }

      // キーワード条件
      if (q) {
        var hay = (it.app + " " + it.name + " " + it.desc + " " + SC_APP.comboToString(it.keys)).toLowerCase();
        if (hay.indexOf(q) < 0) continue;
      }

      filtered.push(it);
    }

    // ソート（スコア降順）
    filtered.sort(function (a, b) {
      var sa = SC_APP.scoreItem(a, q, SC_APP.state.selectedKeys, exact);
      var sb = SC_APP.scoreItem(b, q, SC_APP.state.selectedKeys, exact);
      if (sb !== sa) return sb - sa;

      var ca = SC_APP.comboToString(a.keys);
      var cb = SC_APP.comboToString(b.keys);
      if (ca < cb) return -1;
      if (ca > cb) return 1;

      if (a.name < b.name) return -1;
      if (a.name > b.name) return 1;
      return 0;
    });

    if (resultStatEl) resultStatEl.textContent = filtered.length + " 件";

    if (filtered.length === 0) {
      resultEl.innerHTML = [
        '<div class="text-muted">',
        '  該当するショートカットがありません。<br>',
        '  キーワードを変えるか、キー／アプリの選択をクリアしてみてください。',
        "</div>"
      ].join("\n");
      return;
    }

    var html = '<ul class="list-group">';
    for (var r = 0; r < filtered.length; r++) {
      var item = filtered[r];
      var combo = SC_APP.comboToString(item.keys);
      var appDisp = SC_APP.appLabelToDisplay(item.app);

      html += [
        '<li class="list-group-item">',
        '  <div class="d-flex align-items-start justify-content-between gap-2">',
        '    <div class="me-2">',
        '      <div class="fw-bold">' + SC_APP.escapeHtml(combo) + "</div>",
        '      <div class="mt-1">',
        '        <span class="badge text-bg-secondary me-2">' + SC_APP.escapeHtml(appDisp) + "</span>",
        '        <span class="fw-semibold">' + SC_APP.escapeHtml(item.name) + "</span>",
        "      </div>",
        '      <div class="text-muted small mt-1">' + SC_APP.escapeHtml(item.desc) + "</div>",
        "    </div>",
        '    <div class="d-flex flex-column gap-2">',
        '      <button type="button" class="btn btn-outline-primary btn-sm sc-copy-btn" data-copy="' + SC_APP.escapeAttr(combo) + '">コピー</button>',
        "    </div>",
        "  </div>",
        "</li>"
      ].join("\n");
    }
    html += "</ul>";

    resultEl.innerHTML = html;

    var copyBtns = resultEl.querySelectorAll(".sc-copy-btn");
    for (var ci = 0; ci < copyBtns.length; ci++) {
      copyBtns[ci].addEventListener("click", function (ev) {
        var txt = ev.currentTarget.getAttribute("data-copy") || "";
        SC_APP.copyText(txt);
      });
    }
  };

  // =========================
  // 初期化（content.js から呼ぶ）
  // =========================
  SC_APP.initResults = function () {
    SC_APP.buildMergedData();
    SC_APP.renderResults();
  };
})();
