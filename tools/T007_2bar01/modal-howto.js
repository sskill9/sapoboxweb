// modal-howto.js — 使い方モーダル
//
// 【このファイルで主に書き換えるポイント】
//  1) モーダルタイトル（例：使い方：T001 和暦↔西暦チェッカー）
//  2) 手順リストの本文（各ツールの実際の操作手順）
//
//  ※ 基本構造（モーダルサイズ／閉じるボタン等）は共通テンプレとしてこのまま利用してください。

(function () {
  var wrapper = document.createElement("div");
  wrapper.innerHTML = `
<div class="modal fade" id="modalHowto" tabindex="-1" aria-labelledby="modalHowtoLabel" aria-hidden="true">
  <div class="modal-dialog modal-xl modal-dialog-scrollable">
    <div class="modal-content">
      <div class="modal-header bg-primary text-white">
        <h2 class="modal-title h5 mb-0" id="modalHowtoLabel">使い方：2次元QRコード生成</h2>
        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="閉じる"></button>
      </div>
      <div class="modal-body">

        <ol class="list-group list-group-numbered">

          <li class="list-group-item">
            <div class="fw-semibold mb-1">用途</div>
            URL などの文字列から QRコード（PNG）を生成します。生成はブラウザ内で完結し、サーバーへの送信は行いません。
          </li>

          <li class="list-group-item">
            <div class="fw-semibold mb-1">Step 1：URL（または任意テキスト）を入力</div>
            左側の「URL（または任意テキスト）」に、QRコード化したい文字列を入力します。URL以外の文字列も入力できます。
          </li>

          <li class="list-group-item">
            <div class="fw-semibold mb-1">Step 2：誤り訂正レベルを選択</div>
            「誤り訂正レベル」で L / M / Q / H を選びます。印刷や汚れ・劣化を想定する場合は Q / H を推奨します（読み取り耐性が上がります）。
          </li>

          <li class="list-group-item">
            <div class="fw-semibold mb-1">Step 3：サイズ（px）を選択</div>
            「サイズ（px）」で PNG の出力サイズを選びます。画面表示なら 256〜512、印刷用途なら 512 以上を推奨します。
          </li>

          <li class="list-group-item">
            <div class="fw-semibold mb-1">Step 4：「生成（PNG）」を押す</div>
            「生成（PNG）」ボタンを押すと、右側の「結果エリア」に QRコードが表示されます。
          </li>

          <li class="list-group-item">
            <div class="fw-semibold mb-1">Step 5：必要に応じてPNGをダウンロード</div>
            生成後、「PNGをダウンロード」ボタンが有効になります。クリックすると、生成した QRコード画像（PNG）を保存できます。
          </li>

          <li class="list-group-item">
            <div class="fw-semibold mb-1">注意・コツ</div>
            <ul class="mb-0">
              <li>入力文字数が極端に長い場合、QRが細密になり読み取りにくくなることがあります。</li>
              <li>読み取りにくい場合は、誤り訂正レベルを下げる／サイズを上げる／入力を短くする、をお試しください。</li>
              <li>本ツールは現時点では PNG 出力のみ対応です（必要に応じて SVG 出力は拡張予定）。</li>
            </ul>
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
