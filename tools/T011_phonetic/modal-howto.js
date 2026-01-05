// modal-howto.js — 使い方モーダル
//
// 【このファイルで主に書き換えるポイント】
//  1) モーダルタイトル（例：使い方：T001 和暦↔西暦チェッカー）
//  2) 手順リストの本文（各ツールの実際の操作手順）
//
//  ※ 基本構造（モーダルサイズ／閉じるボタン等）は共通テンプレとしてこのまま利用してください。

(function () {
  var wrapper = document.createElement("div");
  wrapper.innerHTML = `
<div class="modal fade" id="modalHowto" tabindex="-1" aria-labelledby="modalHowtoLabel" aria-hidden="true">
  <div class="modal-dialog modal-xl modal-dialog-scrollable">
    <div class="modal-content">
      <div class="modal-header bg-primary text-white">
        <h2 class="modal-title h5 mb-0" id="modalHowtoLabel">使い方：T011 フォネティックコード表示</h2>
        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="閉じる"></button>
      </div>
      <div class="modal-body">
        <ol class="list-group list-group-numbered">

          <li class="list-group-item">
            <div class="fw-bold mb-1">このツールでできること</div>
            <div class="text-muted small">
              入力した文字列を1文字ずつ分解して表示し、各文字に対してフォネティック候補（言い換え表現）を確認できます。
              ID・メールアドレス・URL・注文番号などを口頭で確認する際の、聞き間違い／伝達ミス防止を目的としたツールです。
              大文字・小文字は区別しません。
            </div>
          </li>

          <li class="list-group-item">
            <div class="fw-bold mb-1">対応している文字種について（重要）</div>
            <div class="text-muted small">
              本ツールは <strong>半角英字・半角数字・一部の半角記号</strong>を対象としています。<br>
              <strong>全角の英字・全角数字（例：ＡＢＣ、１２３）は非対応</strong>のため、
              入力してもフォネティック候補は表示されません。<br>
              口頭確認用途では、事前に半角表記であることをご確認ください。
            </div>
          </li>

          <li class="list-group-item">
            <div class="fw-bold mb-1">手順1：文字列を入力</div>
            <div class="text-muted small">
              画面上部の「文字列を入力してください」に、確認したい文字列を入力します。
              キーボード入力のほか、貼り付け（Ctrl+V）にも対応しています。
              入力文字数は「入力文字数：」にリアルタイムで表示されます。
            </div>
          </li>

          <li class="list-group-item">
            <div class="fw-bold mb-1">手順2：1文字ずつ表示を確認</div>
            <div class="text-muted small">
              入力した文字が「1文字ずつ表示」エリアに、キー形状で入力順に並びます。
              本ツールでは <strong>改行（Enter）やタブ（TAB）は対象外</strong>のため、
              入力されていても表示されません。
            </div>
          </li>

          <li class="list-group-item">
            <div class="fw-bold mb-1">手順3：フォネティック候補の確認</div>
            <div class="text-muted small">
              各文字にマウスを合わせると、ツールチップで最大3つのフォネティック候補を表示します。
              クリックすると、右側のカードに候補が一覧表示されます。
              PHONETIC_MAP に定義が無い文字は「候補なし」と表示されます。
            </div>
          </li>

          <li class="list-group-item">
            <div class="fw-bold mb-1">補足：フォネティック参照</div>
            <div class="text-muted small">
              右側のクイック参照では、日本語（JIS）キーボード配列に近い形でキーを5段構成で表示します（テンキーは含みません）。
              各キーにマウスを合わせると候補を確認でき、クリックで候補表示に切り替わります。
              「一覧を表示」を押すと、登録されている全キーの候補をまとめて確認できます。
            </div>
          </li>

          <li class="list-group-item">
            <div class="fw-bold mb-1">ローカル利用について</div>
            <div class="text-muted small">
              ナビバーの「ダウンロード」からZIPファイルを取得し、任意の場所に解凍すれば、
              ローカル環境（オフライン）でも利用できます。
              フォネティック候補の内容は <code>phonetic-data.js</code> を編集することで、
              運用に合わせて自由に調整できます。
            </div>
          </li>

        </ol>
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
