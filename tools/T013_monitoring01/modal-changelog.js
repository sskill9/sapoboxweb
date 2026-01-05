// ===== [INIT] MODAL CHANGELOG 初期化・差し込み開始 =====
// modal-changelog.js — 更新履歴モーダル
(function () {
  var wrapper = document.createElement("div");
// ===== [INIT] MODAL CHANGELOG 初期化・差し込み開始 ここまで =====


// ===== [UI] MODAL CHANGELOG HTML生成（役割別サブブロック） =====
  wrapper.innerHTML = `
<div class="modal fade" id="modalChangelog" tabindex="-1" aria-labelledby="modalChangelogLabel" aria-hidden="true">
  <div class="modal-dialog modal-xl modal-dialog-scrollable">
    <div class="modal-content">

      <!-- ===== [UI] ヘッダー - タイトル＋閉じる ===== -->
      <div class="modal-header bg-primary text-white">
        <h2 class="modal-title h5 mb-0" id="modalChangelogLabel">更新履歴（このツール）</h2>
        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="閉じる"></button>
      </div>
      <!-- ===== [UI] ヘッダー - タイトル＋閉じる ここまで ===== -->

      <!-- ===== [UI] 本文 - 更新履歴一覧 ===== -->
      <div class="modal-body">
        <ul class="list-group">

          <li class="list-group-item">
            <span class="badge bg-primary me-2">2025-11-30</span>
            v1.0.0 テンプレート版からこのツールを作成。（必要に応じて書き換えてください）
          </li>

          <li class="list-group-item">
            <span class="badge bg-secondary me-2">2025-12-xx</span>
            v1.1.0 機能や入力項目、結果表示などを実運用に合わせて調整。（ここを書き換えてください）
          </li>

        </ul>
      </div>
      <!-- ===== [UI] 本文 - 更新履歴一覧 ここまで ===== -->

      <!-- ===== [UI] フッター - 閉じるボタン ===== -->
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary btn-sm" data-bs-dismiss="modal">閉じる</button>
      </div>
      <!-- ===== [UI] フッター - 閉じるボタン ここまで ===== -->

    </div>
  </div>
</div>
`;
// ===== [UI] MODAL CHANGELOG HTML生成（役割別サブブロック） ここまで =====


// ===== [INIT] MODAL CHANGELOG DOM追加・終了 =====
  document.body.appendChild(wrapper.firstElementChild);
})();
// ===== [INIT] MODAL CHANGELOG DOM追加・終了 ここまで =====
