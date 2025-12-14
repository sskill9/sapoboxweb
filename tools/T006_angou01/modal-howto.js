// modal-howto.js — 使い方モーダル（T006 ファイル暗号化／復号化）
//
// 【このファイルで主に書き換えたポイント】
//  1) モーダルタイトルを暗号ツール名に変更
//  2) 実際の暗号化／復号化手順をステップ形式で明記
//
//  ※ モーダル構造・サイズ・閉じるボタン等はテンプレ構造を維持しています。

(function () {
  var wrapper = document.createElement("div");
  wrapper.innerHTML = `
<div class="modal fade" id="modalHowto" tabindex="-1" aria-labelledby="modalHowtoLabel" aria-hidden="true">
  <div class="modal-dialog modal-xl modal-dialog-scrollable">
    <div class="modal-content">
      <div class="modal-header bg-primary text-white">
        <h2 class="modal-title h5 mb-0" id="modalHowtoLabel">
          使い方：T006 ファイル暗号化／復号化（.angou）
        </h2>
        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="閉じる"></button>
      </div>
      <div class="modal-body">
        <ol class="list-group list-group-numbered">

          <li class="list-group-item">
            本ツールは、ブラウザ内（ローカル環境）でファイルを暗号化・復号化するためのツールです。
            ファイルやパスワードはサーバーへ送信されません。
          </li>

          <li class="list-group-item">
            【暗号化】送信側では、暗号化したいファイルを選択し、任意のパスワードを入力してください。
            パスワードは復号時に必要となるため、忘れないよう管理してください。
          </li>

          <li class="list-group-item">
            「暗号化してダウンロード（.angou）」ボタンを押すと、
            選択したファイルが暗号化され、拡張子 <code>.angou</code> のファイルとして保存されます。
          </li>

          <li class="list-group-item">
            【復号化】受信側では、暗号化された <code>.angou</code> ファイルを選択し、
            暗号化時と同じパスワードを入力してください。
          </li>

          <li class="list-group-item">
            「復号化してダウンロード」ボタンを押すと、元のファイルが復元されます。
            パスワードが異なる場合やファイルが破損している場合、復号には失敗します。
          </li>

          <li class="list-group-item">
            本ツールはローカル処理を前提としているため、
            機密情報を扱う場合でも比較的安全に利用できますが、
            パスワード管理には十分注意してください。
          </li>

          <li class="list-group-item">
            <span class="fw-bold">【補足：暗号化方式について】</span><br>
            <span class="text-muted small">
              本ツールは Web Crypto API を使用し、
              PBKDF2（SHA-256）による鍵導出と AES-GCM による暗号化を行っています。
              実装はブラウザ標準機能のみで完結しています。
            </span>
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
