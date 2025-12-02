// modal-changelog.js — T001 更新履歴モーダル
(function () {
  var wrapper = document.createElement("div");
  wrapper.innerHTML = `
<div class="modal fade" id="modalChangelog" tabindex="-1" aria-labelledby="modalChangelogLabel" aria-hidden="true">
  <div class="modal-dialog modal-xl modal-dialog-scrollable">
    <div class="modal-content">
      <div class="modal-header bg-primary text-white">
        <h2 class="modal-title h5 mb-0" id="modalChangelogLabel">更新履歴：T001 生年月日 和暦↔西暦チェッカー</h2>
        <button type="button"
                class="btn-close btn-close-white"
                data-bs-dismiss="modal"
                aria-label="閉じる"></button>
      </div>
      <div class="modal-body">
        <ul class="mb-0">
          <li>2025-11-30：サポ箱テンプレート構成（top/content/footer 分割、共通モーダル）に対応。</li>
          <li>2025-10-29：フッター直書き化（file:// 直開き時のCORSエラー解消）。</li>
        </ul>
      </div>
      <div class="modal-footer">
        <button class="btn btn-secondary" data-bs-dismiss="modal">閉じる</button>
      </div>
    </div>
  </div>
</div>
`;

  document.body.appendChild(wrapper.firstElementChild);
})();
