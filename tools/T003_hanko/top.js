// top.js — TOPブロック（ナビバー：影付き＋ボタン風メニュー）
// T003 ハンコジェネレータ用（レスポンシブ対応：スマホ2行／PC1行）
// ・ツール名：T003 ハンコジェネレータ
// ・ダウンロードはサーバー上の ZIP を参照（tools/T003_hanko/T003.zip を想定）

(function () {
  var topEl = document.getElementById("top-block");
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
          <span class="fw-normal ms-2">
            - T003 ハンコジェネレータ
          </span>
        </span>

        <!-- サイト名 + ツール名（スマホ用：2行表示） -->
        <span class="d-inline d-md-none">
          <span class="fw-bold d-block">
            Support Tool Box（サポ箱）
          </span>
          <span class="small d-block">
            T003 ハンコジェネレータ
          </span>
        </span>

      </a>

      <!-- トグル（スマホ） -->
      <button class="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#toolNavbar"
              aria-controls="toolNavbar"
              aria-expanded="false"
              aria-label="メニューを開く">
        <span class="navbar-toggler-icon"></span>
      </button>

      <!-- ナビメニュー：ボタン風（右寄せ） -->
      <div class="collapse navbar-collapse" id="toolNavbar">
        <div class="ms-auto d-flex align-items-center flex-wrap gap-2 py-2 py-md-0">

          <!-- ★モーダル類：このまま使えます。必要に応じてラベルだけ変更してください。 -->
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

          <!-- ★ZIPダウンロード：
               命名ルールは「フォルダ名 + .zip」
               例）フォルダ名が T003_hanko の場合 → T003.zip
          -->
          <a class="btn btn-outline-light btn-sm"
             href="https://ss1.xrea.com/sskill9.s323.xrea.com/tools/T003_hanko/T003.zip"
             target="_blank"
             rel="noopener"
             aria-label="このツール一式をZIPでダウンロード">
            ダウンロード
          </a>

        </div>
      </div>

    </div>
  </nav>
</header>
`;
})();
