// content.js — T001 生年月日 和暦↔西暦 ツール本体＋TOPへ戻るボタン
(function () {
  var contentEl = document.getElementById("content-block");
  if (!contentEl) return;

  contentEl.innerHTML = `
<div class="container py-4">

  <!-- ツール情報バー（左：バッジ／右：説明文） -->
  <div class="d-flex flex-column flex-md-row align-items-md-center justify-content-between mb-3">

    <!-- 左側：バッジ類 -->
    <div class="mb-2 mb-md-0">
      <span class="stb-tag stb-tag-category">和暦↔西暦</span>
      <span class="stb-tag stb-tag-usage">汎用ツール</span>
    </div>

    <!-- 右側：概要説明 -->
    <div class="text-muted small">
      生年月日を <strong>和暦・西暦のどちらからでも入力</strong> し、
      もう一方の表記や年齢などを確認できるツールです。<br>
      コンタクトセンターの本人確認や、各種申込書のチェック業務をサポートします。
    </div>
  </div>

  <!-- メイン2カラム：左＝入力エリア／右＝結果＆説明 -->
  <div class="row g-4">

    <!-- 左カラム：入力エリア -->
    <div class="col-12 col-lg-7">
      <div class="card shadow-sm h-100">
        <div class="card-header bg-primary text-white">
          <h1 class="h5 mb-0">生年月日入力</h1>
        </div>
        <div class="card-body">

          <!-- 変換方向の選択 -->
          <div class="mb-3">
            <label class="form-label fw-bold">変換方向</label>
            <div class="d-flex flex-wrap gap-3">
              <div class="form-check form-check-inline">
                <input
                  class="form-check-input"
                  type="radio"
                  name="convert-direction"
                  id="dir-auto"
                  value="auto"
                  checked>
                <label class="form-check-label" for="dir-auto">
                  自動判定（和暦・西暦どちらでも）
                </label>
              </div>
              <div class="form-check form-check-inline">
                <input
                  class="form-check-input"
                  type="radio"
                  name="convert-direction"
                  id="dir-w2g"
                  value="w2g">
                <label class="form-check-label" for="dir-w2g">
                  和暦 → 西暦
                </label>
              </div>
              <div class="form-check form-check-inline">
                <input
                  class="form-check-input"
                  type="radio"
                  name="convert-direction"
                  id="dir-g2w"
                  value="g2w">
                <label class="form-check-label" for="dir-g2w">
                  西暦 → 和暦
                </label>
              </div>
            </div>
            <div class="form-text">
              迷ったときは「自動判定」のままで構いません。
            </div>
          </div>

          <!-- 自動判定入力 -->
          <div id="auto-inputs" class="mb-3" aria-hidden="false">
            <label for="auto-text" class="form-label fw-bold">自動判定入力</label>
            <input
              id="auto-text"
              type="text"
              class="form-control"
              placeholder="例：令和6.5.1 / H30 / 2019/5/1 / 1988 など">
            <div class="form-text">
              和暦（例：令和6.5.1 / H30）または西暦（2019/5/1 / 2018）を自由に入力できます。
            </div>
          </div>

          <!-- 和暦 → 西暦 入力 -->
          <div id="w2g-inputs" class="row g-2 mb-3 d-none" aria-hidden="true">
            <div class="col-12">
              <p class="fw-bold mb-2">和暦で入力</p>
            </div>
            <div class="col-6 col-md-4">
              <label for="era" class="form-label">元号</label>
              <select id="era" class="form-select">
                <option value="">選択してください</option>
                <option value="R">令和</option>
                <option value="H">平成</option>
                <option value="S">昭和</option>
                <option value="T">大正</option>
                <option value="M">明治</option>
              </select>
            </div>
            <div class="col-6 col-md-3">
              <label for="wareki-year" class="form-label">年</label>
              <input
                id="wareki-year"
                type="number"
                inputmode="numeric"
                class="form-control"
                placeholder="1〜">
            </div>
            <div class="col-6 col-md-3">
              <label for="wareki-month" class="form-label">月</label>
              <input
                id="wareki-month"
                type="number"
                inputmode="numeric"
                class="form-control"
                placeholder="1〜12">
            </div>
            <div class="col-6 col-md-2">
              <label for="wareki-day" class="form-label">日</label>
              <input
                id="wareki-day"
                type="number"
                inputmode="numeric"
                class="form-control"
                placeholder="1〜31">
            </div>
          </div>

          <!-- 西暦 → 和暦 入力 -->
          <div id="g2w-inputs" class="row g-2 mb-3 d-none" aria-hidden="true">
            <div class="col-12">
              <p class="fw-bold mb-2">西暦で入力</p>
            </div>
            <div class="col-6 col-md-4">
              <label for="year" class="form-label">西暦（年）</label>
              <input
                id="year"
                type="number"
                inputmode="numeric"
                class="form-control"
                placeholder="例：1990">
            </div>
            <div class="col-6 col-md-4">
              <label for="month" class="form-label">月</label>
              <input
                id="month"
                type="number"
                inputmode="numeric"
                class="form-control"
                placeholder="1〜12">
            </div>
            <div class="col-6 col-md-4">
              <label for="day" class="form-label">日</label>
              <input
                id="day"
                type="number"
                inputmode="numeric"
                class="form-control"
                placeholder="1〜31">
            </div>
          </div>

          <!-- ボタン群 -->
          <div class="d-flex flex-wrap gap-2">
            <button
              type="button"
              id="btn-convert"
              class="btn btn-primary">
              変換
            </button>
            <button
              type="button"
              id="btn-clear"
              class="btn btn-outline-secondary">
              クリア
            </button>
          </div>

        </div>
      </div>
    </div>

    <!-- 右カラム：結果＋ツール説明 -->
    <div class="col-12 col-lg-5">
      <div class="card shadow-sm mb-3">

        <!-- ★ここをオレンジ背景に変更（唯一の修正ポイント） -->
        <div class="d-flex align-items-center justify-content-between px-3 py-2 bg-warning text-dark rounded-top">
          <h2 class="h6 mb-0">結果</h2>
          <button
            type="button"
            id="btn-copy"
            class="btn btn-outline-dark btn-sm"
            aria-label="結果をコピー">
            コピー
          </button>
        </div>

        <div class="card-body">
          <output id="result" class="fs-5" aria-live="polite"></output>
          <div id="result-note" class="text-muted small mt-2"></div>
        </div>
      </div>

      <div class="card shadow-sm">
        <div class="card-header bg-primary-subtle">
          <h2 class="h6 mb-0">このツールでできること</h2>
        </div>
        <div class="card-body small">
          <ul class="mb-2">
            <li>和暦・西暦どちらの入力からでも相互変換</li>
            <li>自動判定モードで「令和6.5.1」「H30」などの略記にも対応（できる限り）</li>
            <li>入力内容から年齢の目安や日付の整合性をチェック</li>
          </ul>
          <p class="mb-0 text-muted">
            本ツールの結果は目安です。正式な書類作成時は、必ず公的資料と照合してください。
          </p>
        </div>
      </div>
    </div>

  </div> <!-- /.row -->

</div> <!-- /.container -->

<!-- TOPへ戻るボタン -->
<button
  type="button"
  id="backToTopBtn"
  class="btn btn-primary rounded-circle shadow"
  aria-label="ページの先頭へ戻る">
  ↑
</button>
`;

  // TOPへ戻るボタンの制御
  var backBtn = document.getElementById("backToTopBtn");
  if (!backBtn) return;

  window.addEventListener("scroll", function () {
    if (window.pageYOffset > 200) {
      backBtn.style.display = "inline-flex";
    } else {
      backBtn.style.display = "none";
    }
  });

  backBtn.addEventListener("click", function (e) {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
})();
