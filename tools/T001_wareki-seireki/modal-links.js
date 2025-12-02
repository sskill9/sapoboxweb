// modal-links.js — T001 リンク／ダウンロード案内モーダル
(function () {
  var wrapper = document.createElement("div");
  wrapper.innerHTML = `
<div class="modal fade" id="modalLinks" tabindex="-1" aria-labelledby="modalLinksLabel" aria-hidden="true">
  <div class="modal-dialog modal-xl modal-dialog-scrollable">
    <div class="modal-content">
      <div class="modal-header bg-primary text-white">
        <h2 class="modal-title h5 mb-0" id="modalLinksLabel">リンク・ダウンロード：T001 生年月日 和暦↔西暦チェッカー</h2>
        <button type="button"
                class="btn-close btn-close-white"
                data-bs-dismiss="modal"
                aria-label="閉じる"></button>
      </div>
      <div class="modal-body">
        <ul class="list-group">

          <!-- サポ箱TOPページ（共通リンク） -->
          <li class="list-group-item">
            <span class="fw-bold">サポ箱TOPページ</span><br>
            <a href="../../index.html" target="_blank" rel="noopener">
              Support Tool Box（サポ箱） TOP
            </a>
          </li>

          <!-- T001 ツール ZIPダウンロード -->
          <li class="list-group-item">
            <span class="fw-bold">T001 生年月日 和暦↔西暦チェッカー（ZIP）</span><br>
            <!-- ★ZIPファイル名は実際の名称に合わせて変更してください -->
            <a href="./T001.zip" download>
              T001_wareki-seireki ツール一式をダウンロード
            </a>
            <p class="small text-muted mb-0 mt-1">
              このツールはオフラインでも動作します。ZIPを解凍して
              <code>T001index.html</code> をダブルクリックで開いてください。
            </p>
          </li>

          <!-- 作者や関連情報へのリンク（必要に応じて調整） -->
          <li class="list-group-item">
            <span class="fw-bold">サポ箱・作者情報</span><br>
            <span class="small text-muted">
              コンタクトセンター業務を支援するツール群「サポ箱」の一部として提供しています。
            </span>
          </li>

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
