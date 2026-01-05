// ===== [INIT] MODAL HOWTO 初期化・差し込み開始 =====
// modal-howto.js — 使い方モーダル
(function () {
  var wrapper = document.createElement("div");
// ===== [INIT] MODAL HOWTO 初期化・差し込み開始 ここまで =====


// ===== [UI] MODAL HOWTO HTML生成（役割別サブブロック） =====
  wrapper.innerHTML = `
<div class="modal fade" id="modalHowto" tabindex="-1" aria-labelledby="modalHowtoLabel" aria-hidden="true">
  <div class="modal-dialog modal-xl modal-dialog-scrollable">
    <div class="modal-content">

      <!-- ===== [UI] ヘッダー - タイトル＋閉じる ===== -->
      <div class="modal-header bg-primary text-white">
        <h2 class="modal-title h5 mb-0" id="modalHowtoLabel">使い方（テンプレート）</h2>
        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="閉じる"></button>
      </div>
      <!-- ===== [UI] ヘッダー - タイトル＋閉じる ここまで ===== -->

      <!-- ===== [UI] 本文 - 操作手順 ===== -->
      <div class="modal-body">
        <ol class="list-group list-group-numbered">
          <li class="list-group-item">
            ツールの目的と前提条件を明記します。（例：「Amazon ConnectのエクスポートCSVを使用します」など）
          </li>
          <li class="list-group-item">
            入力に必要なファイルや情報を説明します。（例：「○○列に日付が入っているCSVファイルを準備してください」）
          </li>
          <li class="list-group-item">
            実際の操作手順をステップ順に記載します。（例：「ファイルを選択」→「実行」ボタンなど）
          </li>
          <li class="list-group-item">
            結果の読み方や注意事項を記載します。（例：「赤字の行は要対応案件です」など）
          </li>
        </ol>
      </div>
      <!-- ===== [UI] 本文 - 操作手順 ここまで ===== -->

      <!-- ===== [UI] フッター - 閉じるボタン ===== -->
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary btn-sm" data-bs-dismiss="modal">閉じる</button>
      </div>
      <!-- ===== [UI] フッター - 閉じるボタン ここまで ===== -->

    </div>
  </div>
</div>
`;
// ===== [UI] MODAL HOWTO HTML生成（役割別サブブロック） ここまで =====


// ===== [INIT] MODAL HOWTO DOM追加・終了 =====
  document.body.appendChild(wrapper.firstElementChild);
})();
// ===== [INIT] MODAL HOWTO DOM追加・終了 ここまで =====
