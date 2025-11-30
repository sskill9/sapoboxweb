// modal-terms.js — 利用規約モーダル
(function () {
  var wrapper = document.createElement("div");
  wrapper.innerHTML = `
<div class="modal fade" id="modalTerms" tabindex="-1" aria-labelledby="modalTermsLabel" aria-hidden="true">
  <div class="modal-dialog modal-xl modal-dialog-scrollable">
    <div class="modal-content">
      <div class="modal-header bg-primary text-white">
        <h2 class="modal-title h5 mb-0" id="modalTermsLabel">利用規約（テンプレート）</h2>
        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="閉じる"></button>
      </div>
      <div class="modal-body">
        <p class="small text-muted">
          ここにサポ箱ツール共通の利用規約、またはこのツール固有の注意事項を記載します。<br>
          例）本ツールはベストエフォートで提供されること／結果について責任を負わないこと／社内規定に従って利用すること など。
        </p>
        <ul class="small">
          <li>本ツールはコンタクトセンター／カスタマーサポート業務支援を目的として提供されます。</li>
          <li>本ツールの利用により生じた直接または間接の損害について、提供者は一切の責任を負いません。</li>
          <li>個人情報や機微情報を扱う場合は、所属組織のセキュリティポリシーおよび関連法令に従ってください。</li>
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
