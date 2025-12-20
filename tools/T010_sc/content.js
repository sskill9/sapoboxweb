// content.js — CONTENTブロック（ツール本体＋TOPへ戻るボタン）
//
// 【このファイルの役割（分割後）】
//  - 画面の土台HTMLを差し込む（UIパーツの枠）
//  - sc-results.js / sc-ui.js の初期化を呼ぶ（SC_APP.init）
//  - TOPへ戻るボタンの制御はここに残す（共通UI）

(function () {
  var contentEl = document.getElementById("content-block");
  if (!contentEl) return;

  contentEl.innerHTML = `
<div class="container py-4">

  <!-- ツール情報バー（左：バッジ／右：説明文） -->
  <div class="d-flex flex-column flex-md-row align-items-md-center justify-content-between mb-3">

    <!-- 左側：バッジ類（自動生成：sc-ui.js） -->
    <div class="mb-2 mb-md-0" id="scAppBadges">
      <span class="badge rounded-pill fw-semibold"
            style="background-color:#20c997;color:#ffffff;font-size:0.78rem;">
        ショートカット
      </span>
    </div>

    <!-- 右側：概要説明（自動生成：sc-ui.js） -->
    <div class="text-muted small" id="scAppDesc">
      キーワード検索（例：コピー／スクリーンショット）と、画面上のキー選択でショートカットを絞り込めます。
    </div>

  </div>

  <!-- 入力／結果エリア -->
  <section class="mb-5">
    <div class="row gy-4">

      <!-- 入力エリア -->
      <div class="col-lg-6">
        <div class="card shadow-sm h-100">

          <div class="card-header bg-primary-subtle fw-bold">
            検索・フィルタ
          </div>

          <div class="card-body">

            <div class="mb-3">
              <label for="scKeyword" class="form-label fw-semibold">キーワード検索</label>
              <input
                type="text"
                id="scKeyword"
                class="form-control"
                placeholder="例：コピー / クリップボード / スクリーンショット / エクスプローラー / 設定 / ロック / フィルター">
              <div class="form-text">
                ショートカット名・説明・キー表記（例：Win+Shift+S）から検索します。
              </div>
            </div>

            <div class="mb-3">
              <div class="d-flex align-items-center justify-content-between gap-2">
                <div class="fw-semibold">アプリフィルタ：</div>
                <button type="button" class="btn btn-outline-secondary btn-sm" id="scClearAppsBtn">
                  アプリ選択をクリア
                </button>
              </div>

              <div class="mt-2" id="scAppFilter" class="d-flex flex-wrap gap-2"></div>

              <div class="form-text">
                複数選択OK（未選択＝全アプリ表示）。例：Excelだけに絞り込む、Win11+Excelのみ表示、など。
              </div>
            </div>

            <div class="mb-3">
              <div class="d-flex flex-wrap align-items-center gap-2">
                <div class="fw-semibold">選択中のキー：</div>
                <div id="scSelectedKeys" class="d-flex flex-wrap gap-1"></div>
              </div>
              <div class="mt-2 d-flex flex-wrap gap-2">
                <button type="button" class="btn btn-outline-secondary btn-sm" id="scClearKeysBtn">
                  キー選択をクリア
                </button>
                <button type="button" class="btn btn-outline-secondary btn-sm" id="scClearAllBtn">
                  すべてクリア
                </button>

                <div class="form-check ms-auto">
                  <input class="form-check-input" type="checkbox" value="" id="scExactMatch">
                  <label class="form-check-label" for="scExactMatch">
                    キー完全一致
                  </label>
                </div>
              </div>
            </div>

            <hr>

            <div class="mb-2 fw-semibold">ソフトウェアキーボード（クリックで選択）</div>
            <div class="text-muted small mb-2">
              選択したキーを「含む」ショートカットを表示します（「キー完全一致」をONで完全一致に切替）。
            </div>

            <div id="scKeyboard" class="d-flex flex-column gap-2"></div>

          </div>
        </div>
      </div>

      <!-- 結果エリア -->
      <div class="col-lg-6">
        <div class="card shadow-sm h-100">

          <div class="card-header bg-primary-subtle fw-bold d-flex align-items-center justify-content-between">
            <span>検索結果</span>
            <span class="text-muted small" id="scResultStat">-</span>
          </div>

          <div class="card-body">
            <div class="alert alert-info py-2 small mb-3">
              <div class="fw-semibold">使い方の例</div>
              <ul class="mb-0">
                <li>「コピー」と検索 → Win11 / Excel のコピー系が出ます</li>
                <li>Win と Shift と S を選択 → 画面切り取り（Win+Shift+S）が出ます</li>
                <li>アプリフィルタで「Excel」だけ選択 → Excel のみ表示になります</li>
              </ul>
            </div>

            <div id="scResults"></div>
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
        aria-label="ページの先頭へ戻る"
        style="display:none;">
  ↑
</button>
`;

  // =========================
  // 初期化（分割後）
  // =========================
  if (window.SC_APP && typeof window.SC_APP.init === "function") {
    window.SC_APP.init();
  }

  // =========================
  // TOPへ戻るボタンの制御
  // =========================
  var backBtn = document.getElementById("backToTopBtn");
  if (!backBtn) return;

  window.addEventListener("scroll", function () {
    if (window.pageYOffset > 200) {
      backBtn.style.display = "inline-flex";
    } else {
      backBtn.style.display = "none";
    }
  });

  backBtn.addEventListener("click", function () {
    var topEl = document.getElementById("page-top");
    if (topEl && topEl.scrollIntoView) {
      topEl.scrollIntoView({ behavior: "smooth" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  });
})();
