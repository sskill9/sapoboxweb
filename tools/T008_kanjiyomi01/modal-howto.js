// modal-howto.js — 使い方モーダル（T008）
(function () {
  var wrapper = document.createElement("div");
  wrapper.innerHTML = `
<div class="modal fade" id="modalHowto" tabindex="-1" aria-labelledby="modalHowtoLabel" aria-hidden="true">
  <div class="modal-dialog modal-xl modal-dialog-scrollable">
    <div class="modal-content">
      <div class="modal-header bg-primary text-white">
        <h2 class="modal-title h5 mb-0" id="modalHowtoLabel">使い方：T008 漢字口頭伝達補助</h2>
        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="閉じる"></button>
      </div>
      <div class="modal-body">
        <ol class="list-group list-group-numbered">
          <li class="list-group-item">
            入力欄に、対象の<strong>漢字1文字</strong>を貼り付けます（入力即時反映）。
          </li>
          <li class="list-group-item">
            右側に、読み（音／訓）、画数、部首、Unicode（U+XXXX）が表示されます。
          </li>
          <li class="list-group-item">
            下部の「口頭伝達テンプレ」から、状況に合う文面を選び、<strong>コピー</strong>します。
            <div class="text-muted small mt-1">
              ※「確実版」は Unicode（U+XXXX）を必ず含みます。異体字・環境依存文字の確認に有効です。
            </div>
          </li>
          <li class="list-group-item">
            辞書未収録の文字でも、Unicode は表示できます。必要に応じて「リンク」から外部辞書で補足確認してください。
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
