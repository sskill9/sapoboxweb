// modal-howto.js — T001 使い方モーダル
(function () {
  var wrapper = document.createElement("div");
  wrapper.innerHTML = `
<div class="modal fade" id="modalHowto" tabindex="-1" aria-labelledby="modalHowtoLabel" aria-hidden="true">
  <div class="modal-dialog modal-xl modal-dialog-scrollable">
    <div class="modal-content">
      <div class="modal-header bg-primary text-white">
        <h2 class="modal-title h5 mb-0" id="modalHowtoLabel">使い方：T001 生年月日 和暦↔西暦チェッカー</h2>
        <button type="button"
                class="btn-close btn-close-white"
                data-bs-dismiss="modal"
                aria-label="閉じる"></button>
      </div>
      <div class="modal-body">

        <p class="mb-2">
          生年月日を <strong>和暦または西暦</strong> で入力し、
          「変換」ボタンを押すと結果が表示されます。
        </p>

        <h3 class="h6 mt-3">1. 変換方向の選択</h3>
        <ul>
          <li><strong>自動判定</strong> … 和暦・西暦どちらの書き方でも入力すると自動で判定します。</li>
          <li><strong>和暦 → 西暦</strong> … 元号・年・月・日をそれぞれ指定して西暦に変換します。</li>
          <li><strong>西暦 → 和暦</strong> … 西暦（年・月・日）を指定して和暦に変換します。</li>
        </ul>

        <h3 class="h6 mt-3">2. 入力例</h3>
        <ul>
          <li>西暦（自動判定／西暦→和暦）例：
            <code>1990-04-01</code>、<code>1990/04/01</code>、<code>19900401</code>
          </li>
          <li>和暦（自動判定／和暦→西暦）例：
            <code>平成2年4月1日</code>、<code>昭和64/1/7</code>、<code>令和6.5.1</code> など
          </li>
          <li>元号プルダウンは任意です（未選択の場合はできる限り自動判定を試みます）。</li>
        </ul>

        <h3 class="h6 mt-3">3. 結果表示とコピー</h3>
        <ul>
          <li>結果欄に、西暦・和暦・年齢などがまとめて表示されます。</li>
          <li><strong>コピー</strong> ボタンで結果をクリップボードにコピーできます。</li>
          <li>結果下部の補足メッセージに、計算条件や注意事項が表示される場合があります。</li>
        </ul>

        <h3 class="h6 mt-3">4. 注意事項</h3>
        <ul class="mb-0">
          <li>本ツールの結果はあくまで目安です。公式な手続きでは住民票や保険証などの公的資料を優先してください。</li>
          <li>一部の境界日（改元前後など）は入力値によって判定が難しい場合があります。</li>
        </ul>

      </div>
      <div class="modal-footer">
        <button class="btn btn-secondary" data-bs-dismiss="modal">閉じる</button>
      </div>
    </div>
  </div>
</div>
`;

  document.body.appendChild(wrapper.firstElementChild);
})();
