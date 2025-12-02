// modal-links.js — リンクモーダル（T002 パスワードジェネレーター用）
//
// 【このファイルで主に書き換えるポイント】
//  1) モーダルタイトル（ツール名付き）
//  2) 各リンク項目のタイトルとURL

(function () {
  var wrapper = document.createElement("div");
  wrapper.innerHTML = `
<div class="modal fade" id="modalLinks" tabindex="-1" aria-labelledby="modalLinksLabel" aria-hidden="true">
  <div class="modal-dialog modal-xl modal-dialog-scrollable">
    <div class="modal-content">
      <div class="modal-header bg-primary text-white">
        <!-- ★タイトル：ツール名を含めています -->
        <h2 class="modal-title h5 mb-0" id="modalLinksLabel">リンク：T002 パスワードジェネレーター</h2>
        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="閉じる"></button>
      </div>
      <div class="modal-body">
        <ul class="list-group">

          <!-- サポ箱TOPページ（共通リンク） -->
          <li class="list-group-item">
            <span class="fw-bold">サポ箱TOPページ</span><br>
            <a href="../../index.html">Support Tool Box（サポ箱）</a>
          </li>

          <!-- ツール固有リンク：仕様メモなど（必要に応じてURLを追記） -->
          <li class="list-group-item">
            <span class="fw-bold">パスワードポリシー・仕様メモ（例）</span><br>
            <span class="text-muted small">
              組織のパスワードポリシーや、このツールの仕様メモ・社内WikiなどのURLをここに記載できます。
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
