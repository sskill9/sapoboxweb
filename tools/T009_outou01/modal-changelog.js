// modal-changelog.js — 更新履歴モーダル生成
// ※ツールごとに本文のみ差し替える

(function () {
  var wrapper = document.createElement("div");

  wrapper.innerHTML = `
<div class="modal fade" id="modalChangelog" tabindex="-1" aria-labelledby="modalChangelogLabel" aria-hidden="true">
  <div class="modal-dialog modal-lg modal-dialog-scrollable">
    <div class="modal-content">

      <div class="modal-header bg-primary text-white">
        <h2 class="modal-title h5 mb-0" id="modalChangelogLabel">更新履歴：- T009 入電・応答率予測ツール(簡易版)</h2>
        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="閉じる"></button>
      </div>

      <div class="modal-body">

        <!-- ===== T009更新履歴本文ブロック ===== -->
        <ul class="list-group">
          <li class="list-group-item">
            <span class="badge bg-primary me-2">2025-12-20</span>
            v1.0.0 初版公開（入電/応答の予測計算、目標応答率のOK/注意/危険表示）。
          </li>
        </ul>
        <!-- ===== T009更新履歴本文ブロックここまで ===== -->

      </div>

      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">閉じる</button>
      </div>

    </div>
  </div>
</div>
`;

  document.body.appendChild(wrapper);
})();
