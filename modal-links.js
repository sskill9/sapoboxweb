// modal-links.js — サポ箱関連リンクモーダル
(function () {
  var existing = document.getElementById("modalLinks");
  if (existing) return;

  var modal = document.createElement("div");
  modal.id = "modalLinks";
  modal.className = "modal fade";
  modal.tabIndex = -1;
  modal.setAttribute("aria-hidden", "true");
  modal.setAttribute("aria-labelledby", "modalLinksLabel");

  modal.innerHTML = `
  <div class="modal-dialog modal-lg modal-dialog-scrollable">
    <div class="modal-content">

      <div class="modal-header bg-primary text-white">
        <h5 class="modal-title" id="modalLinksLabel">リンク</h5>
        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="閉じる"></button>
      </div>

      <div class="modal-body">

        <p class="small">サポ箱関連ページへのリンク集です。</p>

        <ul class="list-group list-group-flush small">

          <li class="list-group-item d-flex justify-content-between align-items-start">
            <div>
              <div class="fw-bold">サポ箱 公開ページ</div>
              <div class="text-muted">
                公開環境（XREA）で最新バージョンが確認できます。
              </div>
            </div>
            <div class="ms-3">
              <a
                href="https://ss1.xrea.com/sskill9.s323.xrea.com/"
                target="_blank"
                rel="noopener"
                class="btn btn-outline-primary btn-sm">
                開く
              </a>
            </div>
          </li>

        </ul>

      </div>

      <div class="modal-footer">
        <button type="button" class="btn btn-outline-secondary btn-sm" data-bs-dismiss="modal">
          閉じる
        </button>
      </div>

    </div>
  </div>
  `;

  document.body.appendChild(modal);
})();
