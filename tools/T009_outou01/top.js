// top.js — テンプレート（上部ナビゲーション生成）
// ※このファイルは「ツール名」と「ダウンロードZIP名（URL）」以外の改変禁止

(function () {
  var topEl = document.getElementById("top");
  if (!topEl) return;

  topEl.innerHTML = `
<header>
  <nav class="navbar navbar-expand-md navbar-dark bg-primary shadow-sm" aria-label="サポ箱ツール共通ナビゲーション">
    <div class="container">

      <!-- ロゴ＋サイト名＋ツール名（ロゴとサイト名はサポ箱TOPへリンク） -->
      <a href="../../index.html"
         class="navbar-brand d-flex align-items-center me-3"
         aria-label="Support Tool Box（サポ箱）TOPページへ">

        <!-- SVGロゴ -->
        <span class="me-2">
          <svg xmlns="http://www.w3.org/2000/svg"
               width="32"
               height="32"
               viewBox="0 0 64 64"
               role="img"
               aria-label="Support Tool Box ロゴ">
            <rect x="6" y="10" width="52" height="40" rx="8" ry="8" fill="#ffffff"></rect>
            <rect x="10" y="14" width="44" height="32" rx="6" ry="6" fill="#0d6efd"></rect>
            <text x="32" y="36" text-anchor="middle"
                  font-family="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
                  font-size="18"
                  fill="#ffffff">
              STB
            </text>
          </svg>
        </span>

        <!-- サイト名 + ツール名（PC用：1行表示） -->
        <span class="fw-bold d-none d-md-inline">
          Support Tool Box（サポ箱）
          <!-- ===== T009ツール名表示ブロック ===== -->
          <span class="fw-normal ms-2">
            - T009 入電・応答率予測ツール(簡易版)
          </span>
          <!-- ===== T009ツール名表示ブロックここまで ===== -->
        </span>

        <!-- サイト名 + ツール名（スマホ用：2行表示） -->
        <span class="d-inline d-md-none">
          <span class="fw-bold d-block">
            Support Tool Box（サポ箱）
          </span>
          <!-- ===== T009ツール名表示ブロック ===== -->
          <span class="small d-block">
            - T009 入電・応答率予測ツール(簡易版)
          </span>
          <!-- ===== T009ツール名表示ブロックここまで ===== -->
        </span>

      </a>

      <!-- トグル（スマホ） -->
      <button class="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="メニューを開く">
        <span class="navbar-toggler-icon"></span>
      </button>

      <!-- ナビメニュー：ボタン風（右寄せ） -->
      <div class="collapse navbar-collapse" id="navbarNav">
        <div class="ms-auto d-flex align-items-center flex-wrap gap-2 py-2 py-md-0">

          <a class="btn btn-outline-light btn-sm"
             href="#"
             data-bs-toggle="modal"
             data-bs-target="#modalHowto"
             aria-label="このツールの使い方を表示">
            使い方
          </a>

          <a class="btn btn-outline-light btn-sm"
             href="#"
             data-bs-toggle="modal"
             data-bs-target="#modalLinks"
             aria-label="関連リンクを表示">
            リンク
          </a>

          <a class="btn btn-outline-light btn-sm"
             href="#"
             data-bs-toggle="modal"
             data-bs-target="#modalChangelog"
             aria-label="更新履歴を表示">
            更新履歴
          </a>

          <!-- ダウンロード（ツール固有：ZIP直リンク） -->
          <!-- ===== T009ダウンロードリンクブロック ===== -->
          <a class="btn btn-outline-light btn-sm"
             href="https://ss1.xrea.com/sskill9.s323.xrea.com/tools/T009_outou01/T009.zip"
             target="_blank"
             rel="noopener"
             aria-label="このツール一式をZIPでダウンロード">
            ダウンロード
          </a>
          <!-- ===== T009ダウンロードリンクブロックここまで ===== -->

        </div>
      </div>

    </div>
  </nav>
</header>
`;
})();
