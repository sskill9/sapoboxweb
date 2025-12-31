// modal-changelog.js — 更新履歴モーダル（T010）
//
// 本モーダルでは、ツールの変更点を随時記録します。

(function () {
  var wrapper = document.createElement("div");
  wrapper.innerHTML = `
<div class="modal fade" id="modalChangelog" tabindex="-1" aria-labelledby="modalChangelogLabel" aria-hidden="true">
  <div class="modal-dialog modal-xl modal-dialog-scrollable">
    <div class="modal-content">
      <div class="modal-header bg-primary text-white">
        <h2 class="modal-title h5 mb-0" id="modalChangelogLabel">更新履歴：T010 ショートカット検索ツール</h2>
        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="閉じる"></button>
      </div>
      <div class="modal-body">
        <ul class="list-group">

          <!-- 初回構築 -->
          <li class="list-group-item">
            <span class="badge bg-primary me-2">2025-12-21</span>
            v1.0.0 初版公開（T000テンプレートを基に T010 として構築）
          </li>

          <!-- 改善・修正内容 -->
          <li class="list-group-item">
            <span class="badge bg-primary me-2">2025-12-21</span>
            v1.1.0 TOPへ戻るボタン修正（表示位置／閾値調整）
          </li>

          <li class="list-group-item">
            <span class="badge bg-primary me-2">2025-12-21</span>
            v1.2.0 コピートースト機能を追加（ショートカットコピー時に通知表示）
          </li>

          <li class="list-group-item">
            <span class="badge bg-primary me-2">2025-12-21</span>
            v1.3.0 Outlook（新→new）表示修正
          </li>

          <li class="list-group-item">
            <span class="badge bg-primary me-2">2025-12-21</span>
            v1.4.0 アプリバッジ表示調整（順序・折返し・余白改善）
          </li>

          <li class="list-group-item">
            <span class="badge bg-primary me-2">2025-12-21</span>
            v1.5.0 「使い方」更新（本ツール専用版に刷新）
          </li>

          <li class="list-group-item">
            <span class="badge bg-primary me-2">2025-12-21</span>
            v1.6.0 公式リンク一式を追加（Win11／Chrome／Edge／Excel／Outlook／PowerPoint／Teams／Word）
          </li>

          <li class="list-group-item">
            <span class="badge bg-primary me-2">2025-12-21</span>
            v1.7.0 データファイル拡張対応（Outlook 新版データ追加）
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
