// content.js — テンプレート（本文コンテンツ生成）
// ※ツールごとにここを書き換えてください

(function () {
  var contentEl = document.getElementById("content");
  if (!contentEl) return;

  // ===== T009コンテンツHTMLブロック =====
  contentEl.innerHTML = `
<div class="container py-4">

  <!-- ツール情報バー（左：バッジ／右：説明文） -->
  <div class="d-flex flex-column flex-md-row align-items-md-center justify-content-between mb-3">

    <!-- 左側：バッジ類（丸ピル統一版） -->
    <div class="mb-2 mb-md-0">
      <span class="badge rounded-pill fw-semibold me-2"
            style="background-color:#0d6efd;color:#ffffff;font-size:0.78rem;">
        入電・応答率予測
      </span>
      <span class="badge rounded-pill fw-semibold"
            style="background-color:#20c997;color:#ffffff;font-size:0.78rem;">
        コンタクトセンター向け
      </span>
    </div>

    <!-- 右側：概要説明 -->
    <div class="text-muted small">
      現在までの実績と、残り時間・見込み入電・人員・CPHから、業務終了までの予測応答数／予測応答率を即時計算します。
    </div>

  </div>

  <!-- 入力／結果エリア -->
  <section class="mb-5">
    <div class="row gy-4">

      <!-- 入力エリア -->
      <div class="col-md-6">
        <div class="card shadow-sm h-100">

          <div class="card-header bg-primary-subtle fw-bold">
            入力
          </div>

          <div class="card-body">

            <div class="row g-3">
              <div class="col-6">
                <label for="t009_calls_now" class="form-label">現在までの入電数（C_now）</label>
                <input
                  type="number"
                  id="t009_calls_now"
                  class="form-control"
                  inputmode="numeric"
                  min="0"
                  step="1"
                  placeholder="例：120">
              </div>

              <div class="col-6">
                <label for="t009_answers_now" class="form-label">現在までの応答数（A_now）</label>
                <input
                  type="number"
                  id="t009_answers_now"
                  class="form-control"
                  inputmode="numeric"
                  min="0"
                  step="1"
                  placeholder="例：100">
              </div>

              <div class="col-12">
                <label for="t009_target_rate" class="form-label">目標応答率（%）（任意）</label>
                <input
                  type="number"
                  id="t009_target_rate"
                  class="form-control"
                  inputmode="decimal"
                  min="0"
                  max="100"
                  step="0.1"
                  placeholder="例：85.0">
                <div class="form-text">
                  未入力の場合、OK/注意/危険（目標判定）は表示しません。
                </div>
              </div>

              <div class="col-6">
                <label for="t009_remain_hours" class="form-label">残り時間（T_remain）</label>
                <select id="t009_remain_hours" class="form-select"></select>
              </div>

              <div class="col-6">
                <label for="t009_agents" class="form-label">アサイン人数（N_agent）</label>
                <select id="t009_agents" class="form-select"></select>
              </div>

              <div class="col-6">
                <label for="t009_calls_end" class="form-label">終了時の最終入電数（見込）（C_end）</label>
                <input
                  type="number"
                  id="t009_calls_end"
                  class="form-control"
                  inputmode="numeric"
                  min="0"
                  step="1"
                  placeholder="例：200">
              </div>

              <div class="col-6">
                <label for="t009_cph" class="form-label">平均CPH（件/時間/人）（CPH）</label>
                <input
                  type="number"
                  id="t009_cph"
                  class="form-control"
                  inputmode="decimal"
                  min="0"
                  step="0.1"
                  placeholder="例：8.5">
              </div>
            </div>

          </div>
        </div>
      </div>

      <!-- 結果エリア -->
      <div class="col-md-6">
        <div class="card shadow-sm h-100" id="t009_result_panel">

          <div class="card-header bg-primary-subtle fw-bold d-flex align-items-center justify-content-between">
            <span>結果</span>
            <span id="t009_status_badge" class="badge rounded-pill bg-secondary" style="display:none;"></span>
          </div>

          <div class="card-body">

            <div id="t009_msg_area" class="mb-3"></div>

            <div class="table-responsive">
              <table class="table table-sm align-middle mb-0">
                <tbody>
                  <tr>
                    <th class="text-nowrap" scope="row">現在までの応答率</th>
                    <td class="text-end" id="t009_rate_now">—</td>
                  </tr>
                  <tr>
                    <th class="text-nowrap" scope="row">業務終了までの予測応答数</th>
                    <td class="text-end" id="t009_answers_end">—</td>
                  </tr>
                  <tr>
                    <th class="text-nowrap" scope="row">業務終了までの予測応答率</th>
                    <td class="text-end" id="t009_rate_end">—</td>
                  </tr>

                  <tr><td colspan="2"><hr class="my-2"></td></tr>

                  <tr>
                    <th class="text-nowrap" scope="row">残り入電見込み</th>
                    <td class="text-end" id="t009_calls_remain">—</td>
                  </tr>
                  <tr>
                    <th class="text-nowrap" scope="row">残り処理能力</th>
                    <td class="text-end" id="t009_capacity_remain">—</td>
                  </tr>
                  <tr>
                    <th class="text-nowrap" scope="row">余力／不足</th>
                    <td class="text-end" id="t009_delta_capacity">—</td>
                  </tr>
                </tbody>
              </table>
            </div>

          </div>

        </div>
      </div>

    </div>
  </section>

</div>

<!-- 右下：TOPへ戻るボタン -->
<button id="backToTopBtn"
        type="button"
        class="btn btn-primary btn-sm rounded-circle shadow"
        style="position: fixed; right: 16px; bottom: 16px; z-index: 1030; display: none;"
        aria-label="ページの先頭へ戻る">
  ↑
</button>
`;
  // ===== T009コンテンツHTMLブロックここまで =====

  // ===== T009イベント登録ブロック =====
  function getEl(id) {
    return document.getElementById(id);
  }

  function setSelectOptions(selectEl, items, defaultValue) {
    if (!selectEl) return;
    selectEl.innerHTML = "";
    for (var i = 0; i < items.length; i++) {
      var it = items[i];
      var opt = document.createElement("option");
      opt.value = String(it.value);
      opt.textContent = it.label;
      selectEl.appendChild(opt);
    }
    if (defaultValue !== undefined && defaultValue !== null) {
      selectEl.value = String(defaultValue);
    }
  }

  function initT009Selects() {
    var remainEl = getEl("t009_remain_hours");
    var agentEl = getEl("t009_agents");

    var remainItems = [];
    for (var i = 0; i <= 24; i++) {
      var h = i / 2;
      remainItems.push({
        value: h,
        label: h.toFixed(1) + " 時間"
      });
    }

    var agentItems = [];
    for (var n = 0; n <= 50; n++) {
      agentItems.push({
        value: n,
        label: String(n)
      });
    }

    setSelectOptions(remainEl, remainItems, 0);
    setSelectOptions(agentEl, agentItems, 0);
  }

  function formatPct(value) {
    return value.toFixed(1) + "%";
  }

  function formatInt(value) {
    return String(value) + "件";
  }

  function formatDelta(value) {
    if (value >= 0) {
      return "余力 +" + String(value) + "件";
    }
    return "不足 " + String(Math.abs(value)) + "件（取りこぼし見込み）";
  }

  function buildAlertHtml(type, messages) {
    if (!messages || messages.length === 0) return "";
    var cls = "alert ";
    if (type === "danger") cls += "alert-danger";
    if (type === "warning") cls += "alert-warning";
    if (type === "info") cls += "alert-info";
    cls += " py-2 mb-2";
    var html = '<div class="' + cls + '" role="alert">';
    for (var i = 0; i < messages.length; i++) {
      html += '<div class="small">' + messages[i] + "</div>";
    }
    html += "</div>";
    return html;
  }

  function updateT009() {
    if (!window.T009Tool || !window.T009Tool.computeAll) return;

    var raw = {
      C_now: getEl("t009_calls_now").value,
      A_now: getEl("t009_answers_now").value,
      R_target_pct: getEl("t009_target_rate").value,
      T_remain: getEl("t009_remain_hours").value,
      C_end: getEl("t009_calls_end").value,
      N_agent: getEl("t009_agents").value,
      CPH: getEl("t009_cph").value
    };

    var state = window.T009Tool.computeAll(raw);

    var panel = getEl("t009_result_panel");
    var badge = getEl("t009_status_badge");
    var msgArea = getEl("t009_msg_area");

    var elNow = getEl("t009_rate_now");
    var elEndA = getEl("t009_answers_end");
    var elEndR = getEl("t009_rate_end");
    var elRemain = getEl("t009_calls_remain");
    var elCap = getEl("t009_capacity_remain");
    var elDelta = getEl("t009_delta_capacity");

    // メッセージ表示（E1/W1/W2）
    var errorMsgs = [];
    for (var i = 0; i < state.errors.length; i++) {
      errorMsgs.push(state.errors[i].message);
    }
    var warnMsgs = [];
    for (var j = 0; j < state.warnings.length; j++) {
      warnMsgs.push(state.warnings[j].message);
    }

    msgArea.innerHTML = buildAlertHtml("danger", errorMsgs) + buildAlertHtml("warning", warnMsgs);

    // エラー時：結果はグレーアウトして表示しない（—）
    if (state.errors.length > 0 || !state.result) {
      panel.classList.add("opacity-50");

      elNow.textContent = "—";
      elEndA.textContent = "—";
      elEndR.textContent = "—";
      elRemain.textContent = "—";
      elCap.textContent = "—";
      elDelta.textContent = "—";

      badge.style.display = "none";
      panel.classList.remove("bg-warning-subtle");
      panel.classList.remove("border-warning");
      return;
    }

    panel.classList.remove("opacity-50");

    // 目標応答率の併記（推奨）
    var targetEnabled = state.targetJudge && state.targetJudge.enabled;
    var targetText = "";
    if (targetEnabled) {
      targetText = "（目標 " + state.targetJudge.target.toFixed(1) + "%）";
    }

    elNow.textContent = formatPct(state.result.R_now_pct_display) + targetText;
    elEndA.textContent = formatInt(state.result.A_end_pred);
    elEndR.textContent = formatPct(state.result.R_end_pred_pct_display) + targetText;

    elRemain.textContent = formatInt(state.result.C_remain);
    elCap.textContent = formatInt(state.result.A_capacity_remain);
    elDelta.textContent = formatDelta(state.result.Delta_capacity);

    // 目標判定バッジ＆背景
    if (targetEnabled) {
      badge.textContent = state.targetJudge.badgeText;

      if (state.targetJudge.isWarnBg) {
        badge.className = "badge rounded-pill bg-warning text-dark";
        panel.classList.add("bg-warning-subtle");
        panel.classList.add("border-warning");
      } else {
        badge.className = "badge rounded-pill bg-success";
        panel.classList.remove("bg-warning-subtle");
        panel.classList.remove("border-warning");
      }
      badge.style.display = "inline-block";
    } else {
      badge.style.display = "none";
      panel.classList.remove("bg-warning-subtle");
      panel.classList.remove("border-warning");
    }
  }

  // 入力変更で即時計算
  var ids = [
    "t009_calls_now",
    "t009_answers_now",
    "t009_target_rate",
    "t009_remain_hours",
    "t009_calls_end",
    "t009_agents",
    "t009_cph"
  ];

  for (var k = 0; k < ids.length; k++) {
    var el = getEl(ids[k]);
    if (!el) continue;

    el.addEventListener("input", updateT009);
    el.addEventListener("change", updateT009);
  }

  // 初期化（プルダウン生成）
  initT009Selects();

  // 初回表示
  updateT009();
  // ===== T009イベント登録ブロックここまで =====

  // ===== TOPへ戻るボタンブロック =====
  // TOPへ戻るボタンの制御
  var backBtn = document.getElementById("backToTopBtn");
  if (backBtn) {
    function updateBackToTopBtnVisibility() {
      var isScrollable = document.documentElement.scrollHeight > window.innerHeight + 10;

      if (!isScrollable) {
        backBtn.style.display = "none";
        return;
      }

      if (window.scrollY > 300) {
        backBtn.style.display = "block";
      } else {
        backBtn.style.display = "none";
      }
    }

    // 初期状態：必ず非表示（初回スクロール前でも表示されないように）
    backBtn.style.display = "none";

    // スクロール／リサイズで表示切り替え
    window.addEventListener("scroll", updateBackToTopBtnVisibility);
    window.addEventListener("resize", updateBackToTopBtnVisibility);

    // 初回判定（ページ読み込み直後にも反映）
    updateBackToTopBtnVisibility();

    // クリックで先頭へ
    backBtn.addEventListener("click", function () {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });
  }
  // ===== TOPへ戻るボタンブロックここまで =====
})();


// ===== T009クリアボタン追加ブロック =====
(function () {
  function installT009ClearButton() {
    // 二重追加防止
    if (document.getElementById("t009_clear_all_btn")) return true;

    // T009の入力要素が存在するか（存在しないページでは何もしない）
    var anchorEl = document.getElementById("t009_calls_now");
    if (!anchorEl) return false;

    // 入力カード内の .row.g-3 を探す（入力欄群のコンテナ）
    var cardBody = anchorEl.closest(".card-body");
    if (!cardBody) return false;

    var grid = cardBody.querySelector(".row.g-3");
    if (!grid) return false;

    // ボタン設置（行末に col-12 を追加）
    var wrap = document.createElement("div");
    wrap.className = "col-12 d-flex flex-wrap gap-2 mt-2";

    var btn = document.createElement("button");
    btn.type = "button";
    btn.id = "t009_clear_all_btn";
    btn.className = "btn btn-outline-secondary btn-sm";
    btn.textContent = "クリア";
    btn.setAttribute("aria-label", "入力内容をクリア");

    wrap.appendChild(btn);
    grid.appendChild(wrap);

    // クリア対象（既存の入力IDと一致）
    var ids = [
      "t009_calls_now",
      "t009_answers_now",
      "t009_target_rate",
      "t009_remain_hours",
      "t009_calls_end",
      "t009_agents",
      "t009_cph"
    ];

    btn.addEventListener("click", function () {
      for (var i = 0; i < ids.length; i++) {
        var el = document.getElementById(ids[i]);
        if (!el) continue;

        var tag = (el.tagName || "").toLowerCase();

        if (tag === "select") {
          // 初期値（initT009Selects の default が 0）
          el.value = "0";
          el.dispatchEvent(new Event("change", { bubbles: true }));
        } else {
          // number input は初期状態が空なので空に戻す
          el.value = "";
          el.dispatchEvent(new Event("input", { bubbles: true }));
          el.dispatchEvent(new Event("change", { bubbles: true }));
        }
      }

      // 先頭入力へフォーカス
      var first = document.getElementById("t009_calls_now");
      if (first) first.focus();
    });

    return true;
  }

  // 直ちに試す（通常はこれで入る）
  if (installT009ClearButton()) return;

  // 念のための保険（描画タイミング差対策）
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", installT009ClearButton);
  }
  window.addEventListener("load", installT009ClearButton);
  setTimeout(installT009ClearButton, 0);
  setTimeout(installT009ClearButton, 200);
})();
// ===== T009クリアボタン追加ブロックここまで =====




// ===== T009リロード保持追加ブロック =====
(function () {
  function installT009Persist() {
    // T009の入力要素が存在するページだけで動かす
    var anchorEl = document.getElementById("t009_calls_now");
    if (!anchorEl) return false;

    // 二重初期化防止
    if (window.__T009_PERSIST_INSTALLED__) return true;
    window.__T009_PERSIST_INSTALLED__ = true;

    var ids = [
      "t009_calls_now",
      "t009_answers_now",
      "t009_target_rate",
      "t009_remain_hours",
      "t009_calls_end",
      "t009_agents",
      "t009_cph"
    ];

    var STORAGE_PREFIX = "T009_PERSIST_V1_";

    function keyOf(id) {
      return STORAGE_PREFIX + id;
    }

    function safeGet(id) {
      try {
        return localStorage.getItem(keyOf(id));
      } catch (e) {
        return null;
      }
    }

    function safeSet(id, value) {
      try {
        localStorage.setItem(keyOf(id), value);
      } catch (e) {
        // 容量制限など。黙って無視（画面動作は優先）
      }
    }

    function safeRemove(id) {
      try {
        localStorage.removeItem(keyOf(id));
      } catch (e) {
        // 何もしない
      }
    }

    function saveOne(id) {
      var el = document.getElementById(id);
      if (!el) return;

      var tag = (el.tagName || "").toLowerCase();

      if (tag === "select") {
        safeSet(id, String(el.value));
      } else {
        // number input は空文字も保存（＝未入力状態を維持）
        safeSet(id, String(el.value));
      }
    }

    function loadOne(id) {
      var el = document.getElementById(id);
      if (!el) return;

      var saved = safeGet(id);
      if (saved === null) return; // 保存がない場合は触らない

      var tag = (el.tagName || "").toLowerCase();

      if (tag === "select") {
        el.value = saved;
        el.dispatchEvent(new Event("change", { bubbles: true }));
      } else {
        el.value = saved;
        el.dispatchEvent(new Event("input", { bubbles: true }));
        el.dispatchEvent(new Event("change", { bubbles: true }));
      }
    }

    function loadAll() {
      for (var i = 0; i < ids.length; i++) {
        loadOne(ids[i]);
      }
    }

    function saveAll() {
      for (var i = 0; i < ids.length; i++) {
        saveOne(ids[i]);
      }
    }

    function clearAllStorage() {
      for (var i = 0; i < ids.length; i++) {
        safeRemove(ids[i]);
      }
    }

    // 1) まず復元（表示直後に値を戻して再計算を走らせる）
    loadAll();

    // 2) 入力/選択の変更を保存
    for (var i = 0; i < ids.length; i++) {
      (function (id) {
        var el = document.getElementById(id);
        if (!el) return;

        var tag = (el.tagName || "").toLowerCase();
        if (tag === "select") {
          el.addEventListener("change", function () {
            saveOne(id);
          });
        } else {
          el.addEventListener("input", function () {
            saveOne(id);
          });
          el.addEventListener("change", function () {
            saveOne(id);
          });
        }
      })(ids[i]);
    }

    // 3) 念のため：ページ離脱時にも保存（値変更→即リロードの取りこぼし防止）
    window.addEventListener("beforeunload", function () {
      saveAll();
    });
    window.addEventListener("pagehide", function () {
      saveAll();
    });

    // 4) クリアボタン押下時は保存も消す（押すまで残る仕様）
    function bindClearButton() {
      var btn = document.getElementById("t009_clear_all_btn");
      if (!btn) return false;

      if (btn.__T009_PERSIST_BOUND__) return true;
      btn.__T009_PERSIST_BOUND__ = true;

      btn.addEventListener("click", function () {
        clearAllStorage();
      });

      return true;
    }

    if (bindClearButton()) {
      // OK
    } else {
      // クリアボタンが後から生成される場合に備えて保険
      setTimeout(bindClearButton, 0);
      setTimeout(bindClearButton, 200);
      window.addEventListener("load", bindClearButton);
    }

    return true;
  }

  // 直ちに試す
  if (installT009Persist()) return;

  // DOMの準備待ち保険
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", installT009Persist);
  }
  window.addEventListener("load", installT009Persist);
  setTimeout(installT009Persist, 0);
  setTimeout(installT009Persist, 200);
})();
// ===== T009リロード保持追加ブロックここまで =====
