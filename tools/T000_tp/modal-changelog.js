// modal-changelog.js — 更新履歴モーダル
//
// 【このファイルで主に書き換えるポイント】
//  1) モーダルタイトル（必要に応じてツール名を付加）
//  2) 日付・バージョン・変更内容（各ツールごとに自由に編集）
//
//  ※ 初期状態では「テンプレート公開」の例と、「ここを書き換えてください」の例を入れています。

(function () {
  var wrapper = document.createElement("div");
  wrapper.innerHTML = `
<div class="modal fade" id="modalChangelog" tabindex="-1" aria-labelledby="modalChangelogLabel" aria-hidden="true">
  <div class="modal-dialog modal-xl modal-dialog-scrollable">
    <div class="modal-content">
      <div class="modal-header bg-primary text-white">
        <!-- ★タイトル：必要に応じてツール名を含めてください -->
        <!-- 例）更新履歴：T001 和暦↔西暦チェッカー -->
        <h2 class="modal-title h5 mb-0" id="modalChangelogLabel">更新履歴（このツール）</h2>
        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="閉じる"></button>
      </div>
      <div class="modal-body">
        <ul class="list-group">

          <!-- ★初期公開の例：テンプレートから各ツール用に書き換えてください -->
          <li class="list-group-item">
            <span class="badge bg-primary me-2">2025-11-30</span>
            v1.0.0 テンプレート版からこのツールを作成。（必要に応じて書き換えてください）
          </li>

          <!-- ★以降の更新履歴：必要に応じて追記・編集してください -->
          <li class="list-group-item">
            <span class="badge bg-secondary me-2">2025-12-xx</span>
            v1.1.0 機能や入力項目、結果表示などを実運用に合わせて調整。（ここを書き換えてください）
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
