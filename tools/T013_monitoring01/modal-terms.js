// ===== [INIT] MODAL TERMS 初期化・差し込み開始 =====
// modal-terms.js — 利用規約・免責事項（Support Tool Box 共通）
//
// このモーダルはサポ箱の各ツールで共通利用する想定の文面です。
// 特定ツール名には言及せず、「Support Tool Box（サポ箱）」全体に対する
// 利用上の注意・免責事項をまとめています。
//
// 組織やプロジェクトのポリシー変更があった場合のみ、このファイルを
// まとめて更新してください。（通常は各ツールごとに編集する必要はありません）

(function () {
  var wrapper = document.createElement("div");
// ===== [INIT] MODAL TERMS 初期化・差し込み開始 ここまで =====


// ===== [UI] MODAL TERMS HTML生成（役割別サブブロック） =====
  wrapper.innerHTML = `
<div class="modal fade" id="modalTerms" tabindex="-1" aria-labelledby="modalTermsLabel" aria-hidden="true">
  <div class="modal-dialog modal-xl modal-dialog-scrollable">
    <div class="modal-content">

      <!-- ===== [UI] ヘッダー - タイトル＋閉じる ===== -->
      <div class="modal-header bg-primary text-white">
        <h2 class="modal-title h5 mb-0" id="modalTermsLabel">利用規約・免責事項</h2>
        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="閉じる"></button>
      </div>
      <!-- ===== [UI] ヘッダー - タイトル＋閉じる ここまで ===== -->

      <!-- ===== [UI] 本文 - 規約全文 ===== -->
      <div class="modal-body">

        <p class="small text-muted">
          本モーダルは、Support Tool Box（以下「サポ箱」といいます）で提供される各種ツール
          （ブラウザ上で動作する Web ツール一式）を利用する際の共通の注意事項および免責事項を示したものです。
          サポ箱のツールを利用することで、以下の内容に同意したものとみなします。
        </p>

        <hr>

        <h3 class="h6">1. 提供目的について</h3>
        <ul class="small">
          <li>サポ箱のツールは、コンタクトセンター／カスタマーサポート業務などの日常業務を補助することを目的として提供されます。</li>
          <li>業務効率化や集計・チェック作業の補助を意図したものであり、業務上の判断そのものを代替するものではありません。</li>
        </ul>

        <h3 class="h6 mt-3">2. 利用者の自己責任</h3>
        <ul class="small">
          <li>サポ箱のツールの利用およびツールが出力する結果の解釈・判断は、すべて利用者ご自身の責任において行ってください。</li>
          <li>ツールの計算ロジックや設定値に誤りがないよう十分配慮していますが、その正確性・完全性を保証するものではありません。</li>
          <li>ツールの利用により発生したいかなる損害・不利益についても、提供者は責任を負いません。</li>
        </ul>

        <h3 class="h6 mt-3">3. 個人情報・機微情報の取り扱い</h3>
        <ul class="small">
          <li>サポ箱のツールは、原則として利用者の PC／ブラウザ内で完結するローカル処理を前提としています。</li>
          <li>ただし、ツールに読み込むファイル（CSV・Excel・JSON など）の内容や、ツール上へ入力する情報は、
              利用者の所属組織の情報セキュリティポリシーおよび関連法令に従って取り扱ってください。</li>
          <li>個人情報や機微情報を扱う場合は、必要最小限のデータのみを利用し、保存・共有には十分注意してください。</li>
        </ul>

        <h3 class="h6 mt-3">4. 動作環境・サービス継続性</h3>
        <ul class="small">
          <li>サポ箱のツールは、特定のブラウザやバージョンでの利用を想定して作成されていますが、すべての環境での動作を保証するものではありません。</li>
          <li>ブラウザや OS のアップデートなどにより、予告なく表示崩れや動作不良が発生する可能性があります。</li>
          <li>ツールの内容・仕様は予告なく変更・改良・一時停止・公開終了となる場合があります。</li>
        </ul>

        <h3 class="h6 mt-3">5. 著作権・再配布等</h3>
        <ul class="small">
          <li>サポ箱の各ツールに含まれるプログラム、画面レイアウト、説明テキスト等の著作権は、原則としてツール作成者に帰属します。</li>
          <li>組織内での利用や教育目的でのコピー・改変は、許可された範囲内でご利用ください。</li>
          <li>第三者への再配布や外部公開を行う場合は、別途作成者の許諾を得るようにしてください。</li>
        </ul>

        <h3 class="h6 mt-3">6. 禁止事項</h3>
        <ul class="small">
          <li>サポ箱のツールを、不正アクセス、情報改ざん、その他法令・公序良俗に反する行為に利用することを禁じます。</li>
          <li>ツールの動作を著しく阻害するようなアクセスや、不特定多数へのスパム的な利用は行わないでください。</li>
        </ul>

        <h3 class="h6 mt-3">7. 規約の変更</h3>
        <ul class="small">
          <li>本利用規約・免責事項の内容は、必要に応じて適宜見直し・変更することがあります。</li>
          <li>重要な変更があった場合は、サポ箱のトップページや更新履歴等で案内するよう努めます。</li>
        </ul>

        <p class="small text-muted mt-4 mb-0">
          ※本モーダルはサポ箱全体の共通方針を示すものであり、個々の業務ルール・社内規程に優先するものではありません。<br>
          所属組織の規程や上長の指示がある場合は、そちらを優先して運用してください。
        </p>

      </div>
      <!-- ===== [UI] 本文 - 規約全文 ここまで ===== -->

      <!-- ===== [UI] フッター - 閉じるボタン ===== -->
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary btn-sm" data-bs-dismiss="modal">閉じる</button>
      </div>
      <!-- ===== [UI] フッター - 閉じるボタン ここまで ===== -->

    </div>
  </div>
</div>
`;
// ===== [UI] MODAL TERMS HTML生成（役割別サブブロック） ここまで =====


// ===== [INIT] MODAL TERMS DOM追加・終了 =====
  document.body.appendChild(wrapper.firstElementChild);
})();
// ===== [INIT] MODAL TERMS DOM追加・終了 ここまで =====
