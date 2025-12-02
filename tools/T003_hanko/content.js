// content.js — CONTENTブロック（ツール本体＋TOPへ戻るボタン）
//
// 【このファイルで主に書き換えるポイント】
//  1) バッジ部分の文言（テンプレ／コンタクトセンター向け など）
//  2) 右側の概要説明テキスト
//  3) 入力エリア／結果エリアの見出し・ラベル・サンプルUI
//  4) 必要に応じて、カード構成（2カラム→1カラムなど）を各ツール用に調整
//
//  ※ ツール名は TOP バー（top.js）側に一本化済み。
//  ※ TOPへ戻るボタン（#backToTopBtn）の挙動は共通機能なので、基本そのまま使用。

(function () {
  var contentEl = document.getElementById("content-block");
  if (!contentEl) return;

  contentEl.innerHTML = `
<div class="container py-4">

  <!-- ツール情報バー（左：バッジ／右：説明文） -->
  <div class="d-flex flex-column flex-md-row align-items-md-center justify-content-between mb-3">

    <!-- 左側：バッジ類 -->
    <div class="mb-2 mb-md-0">
      <span class="stb-tag stb-tag-category">ハンコ生成</span>
      <span class="stb-tag stb-tag-usage">コンタクトセンター向け</span>
    </div>

    <!-- 右側：概要説明 -->
    <div class="text-muted small">
      入力した苗字から電子印鑑（ハンコ）画像を生成し、透過PNGとしてダウンロードできるツールです。<br>
      コールセンターや事務センターでの承認印・対応メモへの押印など、簡易な電子印鑑が必要な場面を想定しています。
    </div>

  </div>

  <!-- 入力／結果エリア -->
  <section class="mb-5">
    <div class="row gy-4">

      <!-- 入力エリア -->
      <div class="col-md-6">
        <div class="card shadow-sm h-100">

          <!-- ★カード見出し：変更可能 -->
          <div class="card-header bg-primary-subtle fw-bold">
            入力エリア（サンプル）
          </div>

          <div class="card-body">
            <!-- ★ここから下はサンプル：各ツール仕様にあわせて変更 -->
            <div class="mb-3">
              <label for="exampleInput1" class="form-label">入力項目 1</label>
              <input
                type="text"
                id="exampleInput1"
                class="form-control"
                placeholder="ここに値を入力">
            </div>

            <div class="mb-3">
              <label for="exampleInput2" class="form-label">入力項目 2</label>
              <input
                type="text"
                id="exampleInput2"
                class="form-control"
                placeholder="ここに値を入力">
            </div>

            <button
              type="button"
              class="btn btn-primary">
              実行（サンプル）
            </button>

            <!-- ★実際の処理は、各ツール用のJS（例：tool.js）でこのボタンにイベントを付与してください -->
          </div>
        </div>
      </div>

      <!-- 結果エリア -->
      <div class="col-md-6">
        <div class="card shadow-sm h-100">

          <!-- ★カード見出し：変更可能 -->
          <div class="card-header bg-primary-subtle fw-bold">
            結果エリア（サンプル）
          </div>

          <div class="card-body">
            <p class="text-muted mb-0">
              ここに処理結果やメッセージを表示します。実際のツールでは、各ツール用の JavaScript（例：tool.js）からこのエリアを書き換えてください。
            </p>
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
