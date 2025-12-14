// modal-changelog.js — 更新履歴モーダル
//
// ※ このファイルには「利用者向けの更新履歴」のみを記載します。
// ※ テンプレート説明や内部メモは記載しません。

(function () {
  var wrapper = document.createElement("div");
  wrapper.innerHTML = `
<div class="modal fade" id="modalChangelog" tabindex="-1" aria-labelledby="modalChangelogLabel" aria-hidden="true">
  <div class="modal-dialog modal-xl modal-dialog-scrollable">
    <div class="modal-content">

      <div class="modal-header bg-primary text-white">
        <h2 class="modal-title h5 mb-0" id="modalChangelogLabel">更新履歴：2次元QRコード生成</h2>
        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="閉じる"></button>
      </div>

      <div class="modal-body">

        <ul class="list-group">

          <li class="list-group-item">
            <div class="fw-semibold">2025-12-14（JST） 初版リリース</div>
            <ul class="mt-2 mb-0">
              <li>URLや任意テキストから QRコード（PNG）を生成する機能を追加</li>
              <li>誤り訂正レベル（L / M / Q / H）の選択に対応</li>
              <li>出力サイズ（px）の選択に対応</li>
              <li>生成した QRコード画像（PNG）のダウンロードに対応</li>
              <li>ローカル同梱ライブラリ（qrcode.min.js）を使用し、通信を行わない構成としました</li>
            </ul>
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
