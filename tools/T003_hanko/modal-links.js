// modal-links.js — リンクモーダル（T003 ハンコジェネレータ用）
//
//  ・サポ箱 TOP
//  ・T003 ハンコジェネレータ ZIP ダウンロード（フルパス）

(function () {
  var wrapper = document.createElement("div");
  wrapper.innerHTML = `
<div class="modal fade" id="modalLinks" tabindex="-1" aria-labelledby="modalLinksLabel" aria-hidden="true">
  <div class="modal-dialog modal-xl modal-dialog-scrollable">
    <div class="modal-content">
      <div class="modal-header bg-primary text-white">
        <h2 class="modal-title h5 mb-0" id="modalLinksLabel">リンク：T003 ハンコジェネレータ</h2>
        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="閉じる"></button>
      </div>

      <div class="modal-body">
        <p class="small text-muted mb-3">
          T003 ハンコジェネレータに関連するリンクです。
        </p>

        <ul class="list-group mb-3">

          <!-- サポ箱 TOP -->
          <li class="list-group-item d-flex justify-content-between align-items-start">
            <div class="me-3">
              <div class="fw-bold">Support Tool Box（サポ箱）TOPページ</div>
              <div class="small text-muted">
                サポ箱のトップページです。他のツールや更新情報への入り口になります。
              </div>
            </div>
            <span class="ms-2">
              <a href="../../index.html" class="btn btn-outline-primary btn-sm" target="_blank" rel="noopener">
                開く
              </a>
            </span>
          </li>

          <!-- T003 ZIP ダウンロード（フルパス） -->
          <li class="list-group-item d-flex justify-content-between align-items-start">
            <div class="me-3">
              <div class="fw-bold">T003 ハンコジェネレータ（ZIPダウンロード）</div>
              <div class="small text-muted">
                T003 ハンコジェネレータ一式を ZIP ファイルとしてダウンロードします。<br>
                配布用・バックアップ用などにご利用ください。
              </div>
            </div>
            <span class="ms-2">
              <a href="https://ss1.xrea.com/sskill9.s323.xrea.com/tools/T003_hanko/T003.zip"
                 class="btn btn-outline-primary btn-sm"
                 target="_blank"
                 rel="noopener">
                ダウンロード
              </a>
            </span>
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
