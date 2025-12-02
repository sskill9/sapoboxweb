// modal-changelog.js — 更新履歴モーダル（T004 簡易OCR）
//
// 【このファイルで主に書き換えるポイント】
//  1) モーダルタイトル（必要に応じてツール名を付加）
//  2) 日付・バージョン・変更内容（各ツールごとに自由に編集）
//
//  ※ 初回は「テンプレートからの作成」を起点にし、以降は機能追加・不具合修正などを追記していきます。

(function () {
  var wrapper = document.createElement("div");
  wrapper.innerHTML = `
<div class="modal fade" id="modalChangelog" tabindex="-1" aria-labelledby="modalChangelogLabel" aria-hidden="true">
  <div class="modal-dialog modal-xl modal-dialog-scrollable">
    <div class="modal-content">
      <div class="modal-header bg-primary text-white">
        <!-- ★タイトル：必要に応じてツール名を含めてください -->
        <!-- 例）更新履歴：T004 簡易OCR -->
        <h2 class="modal-title h5 mb-0" id="modalChangelogLabel">更新履歴：T004 簡易OCR</h2>
        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="閉じる"></button>
      </div>
      <div class="modal-body">
        <ul class="list-group">

          <!-- 初期公開 -->
          <li class="list-group-item">
            <span class="badge bg-primary me-2">2025-12-02</span>
            v1.0.0 T000 テンプレートから「T004 簡易OCR」として新規作成。
            ヘッダー／フッター／モーダル構成をサポ箱共通デザインに合わせ、Tesseract.js をローカル読み込みする構成で実装。
          </li>

          <!-- 以降の更新履歴：必要に応じて追記・編集してください -->
          <li class="list-group-item">
            <span class="badge bg-secondary me-2">---- -- --</span>
            vX.X.X 機能追加・不具合修正などを行った場合は、ここに日付・バージョン・変更内容を追記してください。
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
