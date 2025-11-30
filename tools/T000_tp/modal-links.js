// modal-links.js — リンクモーダル
(function () {
  var wrapper = document.createElement("div");
  wrapper.innerHTML = `
<div class="modal fade" id="modalLinks" tabindex="-1" aria-labelledby="modalLinksLabel" aria-hidden="true">
  <div class="modal-dialog modal-xl modal-dialog-scrollable">
    <div class="modal-content">
      <div class="modal-header bg-primary text-white">
        <h2 class="modal-title h5 mb-0" id="modalLinksLabel">リンク（テンプレート）</h2>
        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="閉じる"></button>
      </div>
      <div class="modal-body">
        <ul class="list-group">
          <li class="list-group-item">
            <span class="fw-bold">サポ箱TOPページ</span><br>
            <a href="../../index.html">Support Tool Box（サポ箱）</a>
          </li>
          <li class="list-group-item">
            <span class="fw-bold">ツールの仕様メモ（例）</span><br>
            <span class="text-muted small">仕様書やGitHubリポジトリのURLをここに記載できます。</span>
          </li>
        </ul>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary btn-sm" data-bs-dismiss="modal">閉じる</button>
      </div>
    </div>
  </div>
</div>
`;
  document.body.appendChild(wrapper.firstElementChild);
})();
