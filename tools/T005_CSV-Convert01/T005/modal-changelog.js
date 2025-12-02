// modal-changelog.js — 更新履歴モーダル（T005 CSV 文字コード判定＆変換ツール）
//
// 【このファイルで主に書き換えるポイント】
//  1) モーダルタイトル（例：更新履歴：T001 和暦↔西暦チェッカー）
//  2) 更新履歴の一覧（新しいものを上に追加）
//
//  ※ 利用者向けの履歴のみを記載し、開発用メモは別ドキュメントで管理してください。

(function () {
  var wrapper = document.createElement("div");
  wrapper.innerHTML = `
<div class="modal fade" id="modalChangelog" tabindex="-1" aria-labelledby="modalChangelogLabel" aria-hidden="true">
  <div class="modal-dialog modal-lg modal-dialog-scrollable">
    <div class="modal-content">
      <div class="modal-header bg-primary text-white">
        <!-- ★タイトル -->
        <h2 class="modal-title h5 mb-0" id="modalChangelogLabel">更新履歴：T005 CSV 文字コード判定＆変換ツール</h2>
        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="閉じる"></button>
      </div>
      <div class="modal-body">
        <!-- ★更新履歴リスト（新しい順） -->
        <ul class="list-group small">
          <li class="list-group-item">
            <div class="d-flex justify-content-between">
              <span class="fw-bold">v1.0.0</span>
              <span class="text-muted">2025-12-03</span>
            </div>
            <ul class="mb-0 mt-1 ps-3">
              <li>CSV ファイルのドラッグ＆ドロップ／ファイル選択による読み込みに対応。</li>
              <li>文字コードの簡易判定（UTF-8（BOMあり/なし）／Shift_JIS／非テキスト／判定不能）機能を実装。</li>
              <li>行数・列数（概算）の表示と、UTF-8（BOMあり/なし）および Shift_JIS への変換ボタンを追加。</li>
              <li>Shift_JIS 変換用の拡張ポイント（外部ライブラリ連携）を追加。</li>
            </ul>
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
