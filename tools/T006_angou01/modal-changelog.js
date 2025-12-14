// modal-changelog.js — 更新履歴モーダル（T006 ファイル暗号化／復号化）
//
// 【このファイルで主に書き換えたポイント】
//  1) 初版として T006 移植・暗号ツール化を明記
//  2) 余計なテンプレ例文を削除せず、暗号ツール向けに内容を置換
//
//  ※ 構造はテンプレのまま維持しています。

(function () {
  var wrapper = document.createElement("div");
  wrapper.innerHTML = `
<div class="modal fade" id="modalChangelog" tabindex="-1" aria-labelledby="modalChangelogLabel" aria-hidden="true">
  <div class="modal-dialog modal-xl modal-dialog-scrollable">
    <div class="modal-content">
      <div class="modal-header bg-primary text-white">
        <h2 class="modal-title h5 mb-0" id="modalChangelogLabel">
          更新履歴（T006 ファイル暗号化／復号化）
        </h2>
        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="閉じる"></button>
      </div>
      <div class="modal-body">
        <ul class="list-group">

          <li class="list-group-item">
            <span class="badge bg-primary me-2">2025-12-14</span>
            v1.0.0 T006 として暗号化／復号化ツールを初版公開。
            ローカル処理によるファイル暗号化（.angou）に対応。
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
