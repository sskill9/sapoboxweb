// footer.js — Support Tool Box 共通フッター（シンプル版）
(function () {
  var footerEl = document.getElementById("footer-block");
  if (!footerEl) return;

  footerEl.innerHTML = `
<footer class="navbar navbar-expand-md navbar-dark bg-primary mt-auto border-top border-primary-subtle">
  <div class="container d-flex flex-column flex-md-row align-items-center justify-content-between">

    <!-- 左側：空白（レイアウト維持用） -->
    <div class="mb-2 mb-md-0"></div>

    <!-- 右側：利用規約ボタン + コピーライト -->
    <div class="d-flex align-items-center">
      <button type="button"
              class="btn btn-outline-light btn-sm me-3"
              data-bs-toggle="modal"
              data-bs-target="#modalTerms">
        利用規約
      </button>
      <span class="navbar-text">
        © Support Tool Box（サポ箱）
      </span>
    </div>

  </div>
</footer>
`;
})();
