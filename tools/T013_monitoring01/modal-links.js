// ===== [INIT] MODAL LINKS 初期化・差し込み開始 =====
// modal-links.js — リンクモーダル
(function () {
  var wrapper = document.createElement("div");
// ===== [INIT] MODAL LINKS 初期化・差し込み開始 ここまで =====


// ===== [UI] MODAL LINKS HTML生成（役割別サブブロック） =====
  wrapper.innerHTML = `
<div class="modal fade" id="modalLinks" tabindex="-1" aria-labelledby="modalLinksLabel" aria-hidden="true">
  <div class="modal-dialog modal-xl modal-dialog-scrollable">
    <div class="modal-content">

      <!-- ===== [UI] ヘッダー - タイトル＋閉じる ===== -->
      <div class="modal-header bg-primary text-white">
        <h2 class="modal-title h5 mb-0" id="modalLinksLabel">リンク（テンプレート）</h2>
        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="閉じる"></button>
      </div>
      <!-- ===== [UI] ヘッダー - タイトル＋閉じる ここまで ===== -->

      <!-- ===== [UI] 本文 - リンク一覧 ===== -->
      <div class="modal-body">
        <ul class="list-group">

          <!-- サポ箱TOPページ（共通リンク） -->
          <li class="list-group-item">
            <span class="fw-bold">サポ箱TOPページ</span><br>
            <a href="../../index.html">Support Tool Box（サポ箱）</a>
          </li>

          <li class="list-group-item">
            <span class="fw-bold">ツールの仕様メモ（例）</span><br>
            <span class="text-muted small">
              仕様書やGitHubリポジトリ、社内WikiなどのURLをここに記載できます。
            </span>
          </li>

        </ul>
      </div>
      <!-- ===== [UI] 本文 - リンク一覧 ここまで ===== -->

      <!-- ===== [UI] フッター - 閉じるボタン ===== -->
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary btn-sm" data-bs-dismiss="modal">閉じる</button>
      </div>
      <!-- ===== [UI] フッター - 閉じるボタン ここまで ===== -->

    </div>
  </div>
</div>
`;
// ===== [UI] MODAL LINKS HTML生成（役割別サブブロック） ここまで =====


// ===== [INIT] MODAL LINKS DOM追加・終了 =====
  document.body.appendChild(wrapper.firstElementChild);
})();
// ===== [INIT] MODAL LINKS DOM追加・終了 ここまで =====
