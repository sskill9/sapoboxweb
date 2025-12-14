// modal-links.js — リンク集モーダル
//
// 【このファイルで主に書き換えるポイント】
//  1) モーダルタイトル
//  2) リンク項目（各ツールの出典・関連リソース）
//
//  ※ 基本構造（モーダルサイズ／閉じるボタン等）は共通テンプレとしてこのまま利用してください。

(function () {
  var wrapper = document.createElement("div");
  wrapper.innerHTML = `
<div class="modal fade" id="modalLinks" tabindex="-1" aria-labelledby="modalLinksLabel" aria-hidden="true">
  <div class="modal-dialog modal-xl modal-dialog-scrollable">
    <div class="modal-content">
      <div class="modal-header bg-primary text-white">
        <h2 class="modal-title h5 mb-0" id="modalLinksLabel">リンク：2次元QRコード生成</h2>
        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="閉じる"></button>
      </div>

      <div class="modal-body">

        <div class="alert alert-info small mb-4" role="alert">
          本ツールはローカル同梱の QR ライブラリ（<code>libs/qrcode.min.js</code>）を利用して QRコードを生成します。
          外部サイトへ入力内容を送信することはありません。
        </div>

        <div class="row g-3">

          <div class="col-12">
            <div class="card shadow-sm">
              <div class="card-header bg-primary-subtle fw-bold">
                QRライブラリ（同梱JS）の出典
              </div>
              <div class="card-body">
                <ul class="mb-0">
                  <li>
                    <a href="https://github.com/soldair/node-qrcode" target="_blank" rel="noopener noreferrer">
                      QRCode（node-qrcode） GitHub リポジトリ
                    </a>
                    <div class="text-muted small mt-1">
                      QRコード生成に使用しているライブラリの公式リポジトリです。
                    </div>
                  </li>
                  <li class="mt-3">
                    <a href="https://www.npmjs.com/package/qrcode" target="_blank" rel="noopener noreferrer">
                      npm：qrcode（node-qrcode）
                    </a>
                    <div class="text-muted small mt-1">
                      パッケージ情報・バージョン情報の参照先です。
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div class="col-12">
            <div class="card shadow-sm">
              <div class="card-header bg-primary-subtle fw-bold">
                QRコード（一般情報）
              </div>
              <div class="card-body">
                <ul class="mb-0">
                  <li>
                    <a href="https://ja.wikipedia.org/wiki/QR%E3%82%B3%E3%83%BC%E3%83%89" target="_blank" rel="noopener noreferrer">
                      Wikipedia：QRコード
                    </a>
                    <div class="text-muted small mt-1">
                      誤り訂正などの概要を知りたい場合の参考リンクです。
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>

        </div>

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
