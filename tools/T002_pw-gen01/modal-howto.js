// modal-howto.js — 使い方モーダル（T002 パスワードジェネレーター用）
(function () {
  var wrapper = document.createElement("div");
  wrapper.innerHTML = `
<div class="modal fade" id="modalHowto" tabindex="-1" aria-labelledby="modalHowtoLabel" aria-hidden="true">
  <div class="modal-dialog modal-xl modal-dialog-scrollable">
    <div class="modal-content">
      <div class="modal-header bg-primary text-white">
        <!-- ★タイトル：ツール名付き -->
        <h2 class="modal-title h5 mb-0" id="modalHowtoLabel">使い方：T002 パスワードジェネレーター</h2>
        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="閉じる"></button>
      </div>
      <div class="modal-body">
        <!-- 操作手順 -->
        <ol class="list-group list-group-numbered">
          <li class="list-group-item">
            「パスワードの長さ」で、生成したいパスワードの文字数（4〜20文字）を選択します。
          </li>
          <li class="list-group-item">
            「生成個数」で、一度に生成したいパスワードの数（1〜50個）を選択します。
          </li>
          <li class="list-group-item">
            使用する文字種類として「大文字」「小文字」「数字」「記号」から必要なものをチェックします。<br>
            組織のセキュリティポリシーに合わせて選択してください。
          </li>
          <li class="list-group-item">
            条件を設定したら「生成」ボタンを押します。<br>
            条件に沿ったパスワードが一覧表示され、各文字の読み方（例：大文字のエー、小文字のビー、数字のサン…）も併記されます。
          </li>
          <li class="list-group-item">
            生成結果を CSV ファイルとして保存したい場合は「CSVでエクスポート」ボタンを押します。<br>
            「NO」「パスワード」と、各文字の読み方が1文字ずつ列として出力されます。
          </li>
          <li class="list-group-item">
            電話や音声でパスワードを伝える際は、画面上の読み方を参照しながら案内することで、誤読・聞き間違いを軽減できます。
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
