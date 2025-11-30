// content.js — CONTENTブロック（ツール本体＋TOPへ戻るボタン）
(function () {
  var contentEl = document.getElementById("content-block");
  if (!contentEl) return;

  contentEl.innerHTML = `
<div class="container py-4">

  <!-- ツール情報バー（バッジのみ） -->
  <div class="d-flex flex-column flex-md-row align-items-md-center justify-content-between mb-3">
    <div class="mb-2 mb-md-0">
      <span class="badge bg-secondary me-2">テンプレート</span>
      <span class="badge bg-info text-dark">コンタクトセンター向け</span>
    </div>
    <!-- ※ 最終更新は不要のため削除 -->
  </div>

  <!-- ツール本体タイトル -->
  <section class="mb-4">
    <h2 class="h4 mb-1">ツール本体</h2>
    <p class="text-muted small mb-0">
      ここにツール固有のUI（フォーム、ボタン、結果表示など）を配置してください。
    </p>
  </section>

  <!-- 入力／結果エリア -->
  <section class="mb-5">
    <div class="row gy-4">
      <!-- 入力エリア -->
      <div class="col-md-6">
        <div class="card shadow-sm h-100">
          <div class="card-header bg-primary-subtle fw-bold">
            入力エリア（例）
          </div>
          <div class="card-body">
            <div class="mb-3">
              <label for="exampleInput1" class="form-label">入力項目 1</label>
              <input type="text" id="exampleInput1" class="form-control" placeholder="ここに値を入力">
            </div>
            <div class="mb-3">
              <label for="exampleInput2" class="form-label">入力項目 2</label>
              <input type="text" id="exampleInput2" class="form-control" placeholder="ここに値を入力">
            </div>
            <button type="button" class="btn btn-primary">
              実行（例）
            </button>
          </div>
        </div>
      </div>

      <!-- 結果エリア -->
      <div class="col-md-6">
        <div class="card shadow-sm h-100">
          <div class="card-header bg-primary-subtle fw-bold">
            結果エリア（例）
          </div>
          <div class="card-body">
            <p class="text-muted mb-0">
              ここに処理結果やメッセージを表示します。実際のツールでは、JavaScript（例：tool.js）からこのエリアを書き換えてください。
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>

</div>

<!-- 右下：TOPへ戻るボタン（フローティング） -->
<button id="backToTopBtn"
        type="button"
        class="btn btn-primary btn-sm rounded-circle shadow"
        aria-label="ページの先頭へ戻る">
  ↑
</button>
`;

  // TOPへ戻るボタンの制御
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
