// modal-links.js — リンクモーダル（T004 簡易OCR）
//
// 【このファイルで主に書き換えるポイント】
//  1) モーダルタイトル（必要ならツール名を付加）
//  2) 各リンク項目のタイトルとURL
//
//  ※ サポ箱TOPへのリンクは共通として残しておくことを推奨します。

(function () {
  var wrapper = document.createElement("div");
  wrapper.innerHTML = `
<div class="modal fade" id="modalLinks" tabindex="-1" aria-labelledby="modalLinksLabel" aria-hidden="true">
  <div class="modal-dialog modal-xl modal-dialog-scrollable">
    <div class="modal-content">
      <div class="modal-header bg-primary text-white">
        <!-- ★タイトル：必要に応じてツール名を含めてください -->
        <h2 class="modal-title h5 mb-0" id="modalLinksLabel">リンク：T004 簡易OCR</h2>
        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="閉じる"></button>
      </div>
      <div class="modal-body">
        <ul class="list-group">

          <!-- サポ箱TOPページ（共通リンク） -->
          <li class="list-group-item">
            <span class="fw-bold">サポ箱TOPページ</span><br>
            <a href="../../index.html">Support Tool Box（サポ箱）</a>
          </li>

          <!-- ★ツール固有リンク例：仕様メモ・元ネタ・関連ドキュメントなど -->
          <li class="list-group-item">
            <span class="fw-bold">T004 簡易OCR の仕様メモ（社内用など）</span><br>
            <span class="text-muted small">
              ※必要に応じて、社内Wikiや仕様書などのURLに差し替えてください。
            </span>
          </li>

          <li class="list-group-item">
            <span class="fw-bold">Tesseract.js 公式サイト（英語）</span><br>
            <a href="https://tesseract.projectnaptha.com/" target="_blank" rel="noopener">
              https://tesseract.projectnaptha.com/
            </a>
            <p class="small text-muted mb-0">
              このツールで利用しているブラウザ向けOCRライブラリ「Tesseract.js」の公式サイトです。
            </p>
          </li>

          <li class="list-group-item">
            <span class="fw-bold">Tesseract.js GitHub リポジトリ</span><br>
            <a href="https://github.com/naptha/tesseract.js" target="_blank" rel="noopener">
              https://github.com/naptha/tesseract.js
            </a>
            <p class="small text-muted mb-0">
              ライブラリの更新履歴やサンプルコード、Issue などを確認したい場合はこちらを参照してください。
            </p>
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
