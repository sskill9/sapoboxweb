// ===== [INIT] FOOTER 初期化・差し込み開始 =====
// footer.js — Support Tool Box 共通フッター（シンプル版）
(function () {
  var footerEl = document.getElementById("footer-block");
  if (!footerEl) return;
// ===== [INIT] FOOTER 初期化・差し込み開始 ここまで =====


// ===== [UI] FOOTER フッターHTML生成（役割別サブブロック） =====
  footerEl.innerHTML = `
<footer class="navbar navbar-expand-md navbar-dark bg-primary mt-auto border-top border-primary-subtle">
  <div class="container d-flex flex-column flex-md-row align-items-center justify-content-between">

    <!-- ===== [UI] レイアウト - 左側空白（レイアウト維持） ===== -->
    <!-- 左側：空白（レイアウト維持用） -->
    <div class="mb-2 mb-md-0"></div>
    <!-- ===== [UI] レイアウト - 左側空白（レイアウト維持） ここまで ===== -->

    <!-- ===== [UI] レイアウト - 右側（利用規約 + SNS + コピーライト） ===== -->
    <!-- 右側：利用規約ボタン + Xアイコン + Facebookアイコン + コピーライト -->
    <div class="d-flex align-items-center">

      <!-- ===== [UI] ボタン - 利用規約 ===== -->
      <button type="button"
              class="btn btn-outline-light btn-sm me-3"
              data-bs-toggle="modal"
              data-bs-target="#modalTerms">
        利用規約
      </button>
      <!-- ===== [UI] ボタン - 利用規約 ここまで ===== -->

      <!-- ===== [UI] リンク - X（旧Twitter） ===== -->
      <!-- X（旧Twitter）アイコンリンク -->
      <a href="https://x.com/SapoBako"
         class="footer-link me-3 d-inline-flex align-items-center text-white"
         style="opacity:1;"
         target="_blank"
         rel="noopener noreferrer"
         aria-label="Support Tool Box 公式X">
        <svg xmlns="http://www.w3.org/2000/svg"
             width="18"
             height="18"
             viewBox="0 0 24 24"
             fill="currentColor"
             class="d-block"
             aria-hidden="true">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.64l-5.205-6.807-5.953 6.807H1.72l7.73-8.835L1.254 2.25h6.808l4.706 6.231 5.47-6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      </a>
      <!-- ===== [UI] リンク - X（旧Twitter） ここまで ===== -->

      <!-- ===== [UI] リンク - Facebook（ビジネス用） ===== -->
      <!-- Facebook アイコンリンク（ビジネス用） -->
      <a href="https://www.facebook.com/profile.php?id=100064221485896"
         class="footer-link me-3 d-inline-flex align-items-center text-white"
         style="opacity:1;"
         target="_blank"
         rel="noopener noreferrer"
         aria-label="Support Tool Box 公式Facebook">
        <svg xmlns="http://www.w3.org/2000/svg"
             width="18"
             height="18"
             viewBox="0 0 24 24"
             fill="currentColor"
             class="d-block"
             aria-hidden="true">
          <path d="M22 12a10 10 0 1 0-11.5 9.9v-7H8v-2.9h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.4h-1.2c-1.2 0-1.6.7-1.6 1.5v1.8H17l-.4 2.9h-2.7v7A10 10 0 0 0 22 12z"/>
        </svg>
      </a>
      <!-- ===== [UI] リンク - Facebook（ビジネス用） ここまで ===== -->

      <!-- ===== [UI] テキスト - コピーライト ===== -->
      <span class="navbar-text">
        © Support Tool Box（サポ箱）
      </span>
      <!-- ===== [UI] テキスト - コピーライト ここまで ===== -->

    </div>
    <!-- ===== [UI] レイアウト - 右側（利用規約 + SNS + コピーライト） ここまで ===== -->

  </div>
</footer>
`;
// ===== [UI] FOOTER フッターHTML生成（役割別サブブロック） ここまで =====


// ===== [INIT] FOOTER 即時関数終了 =====
})();
// ===== [INIT] FOOTER 即時関数終了 ここまで =====
