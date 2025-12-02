// modal-changelog.js — 更新履歴モーダル（T002 パスワードジェネレーター用）
(function () {
  var wrapper = document.createElement("div");
  wrapper.innerHTML = `
<div class="modal fade" id="modalChangelog" tabindex="-1" aria-labelledby="modalChangelogLabel" aria-hidden="true">
  <div class="modal-dialog modal-xl modal-dialog-scrollable">
    <div class="modal-content">
      <div class="modal-header bg-primary text-white">
        <!-- ★タイトル：ツール名付き -->
        <h2 class="modal-title h5 mb-0" id="modalChangelogLabel">更新履歴：T002 パスワードジェネレーター</h2>
        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="閉じる"></button>
      </div>
      <div class="modal-body">
        <ul class="list-group">

          <!-- 旧版：初版公開 -->
          <li class="list-group-item">
            <span class="badge bg-secondary me-2">2023-09-09</span>
            初版公開。誤読を抑制するため、1文字ずつの読み方（カナ）を併記する形式に調整。
          </li>

          <!-- サポ箱 T002 版としての公開 -->
          <li class="list-group-item">
            <span class="badge bg-primary me-2">2025-11-30</span>
            T002 パスワードジェネレーターとして Support Tool Box（サポ箱）テンプレートに移植。<br>
            ・ヘッダー／フッター／モーダル構成をサポ箱標準に統一。<br>
            ・入力カード／結果カードの2カラム構成に調整。<br>
            ・CSV出力機能を維持しつつ、画面レイアウトを整理。
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
