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
<style>
  /* ===== T011 フォネティック（style.cssを使わない前提の内包CSS） ===== */
  /* 1文字ずつ表示：文字サイズを約3倍に（視認性UP） */
  .phonetic-char {
    font-size: 1.6rem;         /* 従来のbadge相当より大きめ（体感で約3倍） */
    line-height: 1.2;
    padding: 0.45em 0.65em;    /* 大きくしても押しやすい余白 */
    cursor: pointer;
    user-select: none;
  }

  /* ホバー・フォーカスでの視認性UP（アクティブ強調） */
  .phonetic-char-active {
    background-color: #0d6efd !important;
    color: #ffffff !important;
    border-color: #0d6efd !important;
    box-shadow: 0 0 0 0.25rem rgba(13,110,253,.25);
    transform: translateY(-1px);
  }

  /* キーボード操作の視認性も確保（フォーカスリング補助） */
  .phonetic-char:focus {
    outline: none;
  }
</style>

<div class="container py-4">

  <!-- ツール情報バー（左：バッジ／右：説明文） -->
  <div class="d-flex flex-column flex-md-row align-items-md-center justify-content-between mb-3">

    <!-- 左側：バッジ類（テンプレ用／丸ピル統一版） -->
    <div class="mb-2 mb-md-0">
      <span class="badge rounded-pill fw-semibold me-2"
            style="background-color:#0d6efd;color:#ffffff;font-size:0.78rem;">
        フォネティックコード
      </span>
      <span class="badge rounded-pill fw-semibold"
            style="background-color:#20c997;color:#ffffff;font-size:0.78rem;">
        コンタクトセンター向け
      </span>
    </div>

    <!-- 右側：概要説明 -->
    <div class="text-muted small">
      入力した文字列を1文字ずつ表示し、各文字にマウスを合わせることでフォネティック候補（言い換え表現）を確認できます。
      大文字・小文字は区別しません。
    </div>

  </div>

  <!-- メイン：2カラム（左：入力／右：結果） -->
  <section aria-label="ツール本体">
    <div class="row g-3">

      <!-- 入力エリア -->
      <div class="col-12">
        <div class="card shadow-sm h-100">

          <div class="card-header bg-primary-subtle fw-bold">
            入力エリア
          </div>

          <div class="card-body">
            <label for="phoneticInput" class="form-label fw-semibold">
              文字列を入力してください
            </label>

            <input type="text"
                   id="phoneticInput"
                   class="form-control"
                   placeholder="例：AB-12 / user@example.com / https://example.com">

            <div class="d-flex justify-content-between align-items-center mt-2">
              <div class="text-muted small">
                入力文字数：<span id="phoneticCount">0</span>
              </div>
              <div class="text-muted small">
                ※ 各文字にマウスを合わせて候補を確認
              </div>
            </div>

            <hr>

            <div class="fw-semibold mb-2">1文字ずつ表示</div>
            <div id="phoneticChars" class="d-flex flex-wrap align-items-start" aria-label="1文字ずつ表示エリア">
              <span class="text-muted">（ここに1文字ずつ表示されます）</span>
            </div>
          </div>

        </div>
      </div>

      <!-- 結果エリア -->
      <div class="col-12">
        <div class="card shadow-sm h-100">

          <div class="card-header bg-primary-subtle fw-bold">
            フォネティック候補
          </div>

          <div class="card-body">
            <div id="phoneticAssist" aria-label="フォネティック候補表示エリア">
              <div class="text-muted">文字にマウスを合わせると、候補がここに表示されます。</div>
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
        class="btn btn-primary shadow"
        style="position:fixed;right:16px;bottom:16px;z-index:999;display:none;"
        aria-label="ページ上部へ戻る">
  ↑ TOP
</button>
`;

  // 右下：TOPへ戻るボタン制御（共通）
  var backBtn = document.getElementById("backToTopBtn");
  if (!backBtn) return;

  window.addEventListener("scroll", function () {
    if (window.scrollY > 400) {
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
