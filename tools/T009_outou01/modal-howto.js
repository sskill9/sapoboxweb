// modal-howto.js — 使い方モーダル生成
// ※ツールごとに本文のみ差し替える

(function () {
  var wrapper = document.createElement("div");

  wrapper.innerHTML = `
<div class="modal fade" id="modalHowto" tabindex="-1" aria-labelledby="modalHowtoLabel" aria-hidden="true">
  <div class="modal-dialog modal-lg modal-dialog-scrollable">
    <div class="modal-content">

      <div class="modal-header bg-primary text-white">
        <h2 class="modal-title h5 mb-0" id="modalHowtoLabel">使い方：- T009 入電・応答率予測ツール(簡易版)</h2>
        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="閉じる"></button>
      </div>

      <div class="modal-body">

        <!-- ===== T009使い方本文ブロック ===== -->
        <ol class="list-group list-group-numbered">
          <li class="list-group-item">
            本ツールは、現時点の「入電」「応答」「残り時間」「アサイン人数」「平均CPH」から、残り時間内の処理可能件数を概算し、最終応答率見込みを出します。
          </li>
          <li class="list-group-item">
            「現在の入電数（C_now）」と「現在の応答数（A_now）」を入力します。入電数は累計、応答数も累計です。
          </li>
          <li class="list-group-item">
            「業務終了までの入電見込み（最終累計）」は、今日の業務終了時点での累計入電数の見込み（最終累計）を入力します。
          </li>
          <li class="list-group-item">
            残り時間は 0.5時間刻みで選択します。アサイン人数は 0〜50 を選択します。平均CPHは「件/時間/人」です。
          </li>
          <li class="list-group-item">
            <span class="fw-bold">入力エラー（計算停止）</span>：応答数が入電数を超える場合（A_now &gt; C_now）は結果を表示せず、エラーを表示します。
          </li>
          <li class="list-group-item">
            <span class="fw-bold">入力警告（計算は継続）</span>：入電見込みが現在の入電数を下回る場合（C_end &lt; C_now）は「残り入電 0」として計算し、警告を表示します。
          </li>
          <li class="list-group-item">
            目標応答率（任意）を入力すると、結果パネル上部に OK/注意/危険 を表示します。注意／危険の場合は結果パネル全体がオレンジ背景になります。
          </li>
          <li class="list-group-item">
            応答率は小数1桁（四捨五入）、件数は四捨五入で表示します。現場のざっくり判断用です。
          </li>
        </ol>
        <!-- ===== T009使い方本文ブロックここまで ===== -->

      </div>

      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">閉じる</button>
      </div>

    </div>
  </div>
</div>
`;

  document.body.appendChild(wrapper);
})();
