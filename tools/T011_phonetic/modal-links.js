// modal-links.js — リンクモーダル
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
        <h2 class="modal-title h5 mb-0" id="modalLinksLabel">リンク：T011 フォネティックコード表示</h2>
        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="閉じる"></button>
      </div>
      <div class="modal-body">
        <ul class="list-group">

          <!-- サポ箱TOPページ（共通リンク） -->
          <li class="list-group-item">
            <span class="fw-bold">サポ箱TOPページ</span><br>
            <a href="https://ss1.xrea.com/sskill9.s323.xrea.com/index.html">Support Tool Box（サポ箱）</a>
          </li>

          <!-- ★ツール固有リンク：参考情報 -->
          <li class="list-group-item">
            <span class="fw-bold">参考：ASCIIコード（文字コード表）</span><br>
            <a href="https://ja.wikipedia.org/wiki/ASCII" target="_blank" rel="noopener">Wikipedia - ASCII</a>
            <div class="text-muted small mt-1">
              記号（@, -, _, / など）の名称確認や読み上げの前提整理に使えます。
            </div>
          </li>

          <li class="list-group-item">
            <span class="fw-bold">参考：日本語キーボード（JIS配列）</span><br>
            <a href="https://ja.wikipedia.org/wiki/キーボード_(コンピュータ)" target="_blank" rel="noopener">
              Wikipedia - キーボード（コンピュータ）
            </a>
            <div class="text-muted small mt-1">
              クイック参照の並び（JIS配列寄せ）の考え方を確認するための参考ページです。
            </div>
          </li>

          <li class="list-group-item">
            <span class="fw-bold">編集ポイント：候補文言のカスタマイズ</span><br>
            <span class="text-muted small">
              フォネティック候補は <code>phonetic-data.js</code> の <code>PHONETIC_MAP</code> で管理しています。
              運用（チーム内の言い回し）に合わせて追記・置換してください。
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
