// modal-howto.js — サポ箱TOPの使い方モーダル
(function () {
  var existing = document.getElementById("modalHowto");
  if (existing) return;

  var modal = document.createElement("div");
  modal.id = "modalHowto";
  modal.className = "modal fade";
  modal.tabIndex = -1;
  modal.setAttribute("aria-hidden", "true");
  modal.setAttribute("aria-labelledby", "modalHowtoLabel");

  modal.innerHTML = `
  <div class="modal-dialog modal-lg modal-dialog-scrollable">
    <div class="modal-content">

      <div class="modal-header bg-primary text-white">
        <h5 class="modal-title" id="modalHowtoLabel">サポ箱TOPの使い方</h5>
        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="閉じる"></button>
      </div>

      <div class="modal-body">

        <p class="mb-3">
          Support Tool Box（サポ箱）は、コールセンター／コンタクトセンター業務を
          少しだけ楽にするための小さなWebツール集です。
        </p>

        <h6 class="mt-3">1. ツールの開き方</h6>
        <ol class="small mb-3 ps-3">
          <li>「ツール一覧」から使いたいツールを選びます。</li>
          <li>説明文を読み、目的に合うツールを選択します。</li>
          <li>各カードの「開く」を押すとツールが開きます。</li>
        </ol>

        <h6 class="mt-3">2. TOPバーのメニュー</h6>
        <ul class="small mb-3 ps-3">
          <li><strong>使い方</strong> … この画面を表示します。</li>
          <li><strong>リンク</strong> … 関連リンク集（公開URLなど）</li>
          <li><strong>更新履歴</strong> … サポ箱の更新情報一覧</li>
        </ul>

        <h6 class="mt-3">3. ローカル環境での注意</h6>
        <ul class="small mb-3 ps-3">
          <li><code>file://</code> では CORS 制約で動かないツールがあります。</li>
          <li>XREA やローカルWebサーバー（Live Server 等）をご利用ください。</li>
        </ul>

        <h6 class="mt-3">4. 推奨ブラウザ</h6>
        <p class="small mb-3">
          Edge / Chrome を主に動作確認しています。
        </p>

      </div>

      <div class="modal-footer">
        <button type="button" class="btn btn-outline-secondary btn-sm" data-bs-dismiss="modal">閉じる</button>
      </div>

    </div>
  </div>
  `;

  document.body.appendChild(modal);
})();
