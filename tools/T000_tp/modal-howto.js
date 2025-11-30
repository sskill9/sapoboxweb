// modal-howto.js — 使い方モーダル
(function () {
  var wrapper = document.createElement("div");
  wrapper.innerHTML = `
<div class="modal fade" id="modalHowto" tabindex="-1" aria-labelledby="modalHowtoLabel" aria-hidden="true">
  <div class="modal-dialog modal-xl modal-dialog-scrollable">
    <div class="modal-content">
      <div class="modal-header bg-primary text-white">
        <h2 class="modal-title h5 mb-0" id="modalHowtoLabel">使い方（テンプレート）</h2>
        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="閉じる"></button>
      </div>
      <div class="modal-body">
        <ol class="list-group list-group-numbered">
          <li class="list-group-item">
            ツールの目的と前提条件を明記します。（例：「Amazon ConnectのエクスポートCSVを使用します」など）
          </li>
          <li class="list-group-item">
            入力に必要なファイルや情報を説明します。（例：「○○列に日付が入っているCSVファイルを準備してください」）
          </li>
          <li class="list-group-item">
            実際の操作手順をステップ順に記載します。（例：「ファイルを選択」→「実行」ボタンなど）
          </li>
          <li class="list-group-item">
            結果の読み方や注意事項を記載します。（例：「赤字の行は要対応案件です」など）
          </li>
        </ol>
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
