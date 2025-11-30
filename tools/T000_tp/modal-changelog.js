// modal-changelog.js — 更新履歴モーダル
(function () {
  var wrapper = document.createElement("div");
  wrapper.innerHTML = `
<div class="modal fade" id="modalChangelog" tabindex="-1" aria-labelledby="modalChangelogLabel" aria-hidden="true">
  <div class="modal-dialog modal-xl modal-dialog-scrollable">
    <div class="modal-content">
      <div class="modal-header bg-primary text-white">
        <h2 class="modal-title h5 mb-0" id="modalChangelogLabel">更新履歴（このツール）</h2>
        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="閉じる"></button>
      </div>
      <div class="modal-body">
        <ul class="list-group">
          <li class="list-group-item">
            <span class="badge bg-primary me-2">2025-11-30</span>
            ツールテンプレート（T000_tp）の初期バージョンを作成。
          </li>
          <li class="list-group-item">
            <span class="badge bg-secondary me-2">2025-12-xx</span>
            実際のツール内容に合わせて使い方・入力項目・結果表示を調整。（ここを書き換えてください）
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
