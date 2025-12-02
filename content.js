// content.js — CONTENTブロック（サポ箱TOP本体＋TOPへ戻るボタン）
//
// ・サポ箱TOPの概要表示
// ・ツール一覧カード（T001 / T002 / T003 / T004）
// ・お知らせエリア
// ・右下「TOPへ戻る」ボタン

(function () {
  var contentEl = document.getElementById("content-block");
  if (!contentEl) return;

  contentEl.innerHTML = `
<div class="container py-4">

  <!-- サイト情報バー（左：バッジ／右：概要） -->
  <div class="d-flex flex-column flex-md-row align-items-md-center justify-content-between mb-3">

    <div class="mb-2 mb-md-0">
      <!-- タグをツール側と近い見た目に調整 -->
      <span class="badge rounded-pill fw-semibold me-2"
            style="background-color:#0d6efd;color:#ffffff;font-size:0.78rem;">
        ツール集
      </span>
      <span class="badge rounded-pill fw-semibold"
            style="background-color:#20c997;color:#ffffff;font-size:0.78rem;">
        コンタクトセンター向け
      </span>
    </div>

    <div class="text-muted small">
      Support Tool Box（サポ箱）は、コールセンター／コンタクトセンター業務を
      ちょっとだけ楽にするWebツールをまとめた個人ツールボックスです。
    </div>

  </div>

  <!-- ツール一覧 -->
  <section class="mb-5">
    <div class="d-flex align-items-center justify-content-between mb-3">
      <h2 class="h5 mb-0">ツール一覧</h2>
      <span class="text-muted small">※今後もツールを追加予定です</span>
    </div>

    <div class="row gy-4">

      <!-- ツールカード：T001 和暦↔西暦チェッカー -->
      <div class="col-md-4">
        <div class="card h-100 shadow-sm">
          <div class="card-header bg-primary-subtle fw-bold">
            T001 和暦↔西暦チェッカー
          </div>
          <div class="card-body d-flex flex-column">
            <!-- タグ：機能カテゴリ＋用途（ツール側に合わせた色と形） -->
            <div class="mb-2">
              <span class="badge rounded-pill fw-semibold me-1"
                    style="background-color:#0d6efd;color:#ffffff;font-size:0.78rem;">
                和暦↔西暦
              </span>
              <span class="badge rounded-pill fw-semibold"
                    style="background-color:#20c997;color:#ffffff;font-size:0.78rem;">
                汎用ツール
              </span>
            </div>
            <p class="card-text small mb-3">
              生年月日などの和暦と西暦をすばやく相互変換できるツールです。
              顧客情報登録・確認時に役立ちます。
            </p>
            <div class="mt-auto">
              <a href="./tools/T001_wareki-seireki/T001index.html" class="btn btn-primary btn-sm w-100">
                開く
              </a>
            </div>
          </div>
        </div>
      </div>

      <!-- ツールカード：T002 パスワードジェネレーター -->
      <div class="col-md-4">
        <div class="card h-100 shadow-sm">
          <div class="card-header bg-primary-subtle fw-bold">
            T002 パスワードジェネレーター
          </div>
          <div class="card-body d-flex flex-column">
            <!-- タグ：機能カテゴリ＋用途 -->
            <div class="mb-2">
              <span class="badge rounded-pill fw-semibold me-1"
                    style="background-color:#0d6efd;color:#ffffff;font-size:0.78rem;">
                パスワード生成
              </span>
              <span class="badge rounded-pill fw-semibold"
                    style="background-color:#20c997;color:#ffffff;font-size:0.78rem;">
                コンタクトセンター向け
              </span>
            </div>
            <p class="card-text small mb-3">
              1文字ずつの読み方（カナ）付きでパスワードを生成できるツールです。
              読み間違いを防ぎたい業務用途に最適です。
            </p>
            <div class="mt-auto">
              <a href="./tools/T002_pw-gen01/T002index.html" class="btn btn-primary btn-sm w-100">
                開く
              </a>
            </div>
          </div>
        </div>
      </div>

      <!-- ツールカード：T003 ハンコジェネレータ -->
      <div class="col-md-4">
        <div class="card h-100 shadow-sm">
          <div class="card-header bg-primary-subtle fw-bold">
            T003 ハンコジェネレータ
          </div>
          <div class="card-body d-flex flex-column">
            <!-- タグ：機能カテゴリ＋用途 -->
            <div class="mb-2">
              <span class="badge rounded-pill fw-semibold me-1"
                    style="background-color:#0d6efd;color:#ffffff;font-size:0.78rem;">
                ハンコ生成
              </span>
              <span class="badge rounded-pill fw-semibold"
                    style="background-color:#20c997;color:#ffffff;font-size:0.78rem;">
                コンタクトセンター向け
              </span>
            </div>
            <p class="card-text small mb-3">
              苗字を1〜4文字で入力し、赤い縁取りの電子印鑑（ハンコ）画像を
              PNG形式でダウンロードできるツールです。
              名札・資料・簡易スタンプ用途に利用できます。
            </p>
            <div class="mt-auto">
              <a href="./tools/T003_hanko/T003index.html" class="btn btn-primary btn-sm w-100">
                開く
              </a>
            </div>
          </div>
        </div>
      </div>

      <!-- ツールカード：T004 簡易OCR -->
      <div class="col-md-4">
        <div class="card h-100 shadow-sm">
          <div class="card-header bg-primary-subtle fw-bold">
            T004 簡易OCR
          </div>
          <div class="card-body d-flex flex-column">
            <!-- タグ：機能カテゴリ＋用途 -->
            <div class="mb-2">
              <span class="badge rounded-pill fw-semibold me-1"
                    style="background-color:#0d6efd;color:#ffffff;font-size:0.78rem;">
                OCR
              </span>
              <span class="badge rounded-pill fw-semibold"
                    style="background-color:#20c997;color:#ffffff;font-size:0.78rem;">
                コンタクトセンター向け
              </span>
            </div>
            <p class="card-text small mb-3">
              画像から文字を読み取り、テキストとして取得できる簡易OCRツールです。
            </p>
            <div class="mt-auto">
              <a href="./tools/T004_OCR01/T004index.html" class="btn btn-primary btn-sm w-100">
                開く
              </a>
            </div>
          </div>
        </div>
      </div>

      <!-- ツールカード：T005 CSV 文字コード判定＆変換ツール -->
      <div class="col-md-4">
        <div class="card h-100 shadow-sm">
          <div class="card-header bg-primary-subtle fw-bold">
            T005 CSV 文字コード判定＆変換ツール
          </div>
          <div class="card-body d-flex flex-column">
            <!-- タグ：機能カテゴリ＋用途（T005側に合わせて CSVツール＋汎用ツール） -->
            <div class="mb-2">
              <span class="badge rounded-pill fw-semibold me-1"
                    style="background-color:#0d6efd;color:#ffffff;font-size:0.78rem;">
                CSVツール
              </span>
              <span class="badge rounded-pill fw-semibold"
                    style="background-color:#20c997;color:#ffffff;font-size:0.78rem;">
                汎用ツール
              </span>
            </div>
            <p class="card-text small mb-3">
              CSVファイルの文字コード（UTF-8／UTF-8(BOM)／Shift_JIS）を判定し、
              ワンクリックで目的の文字コードへ変換してダウンロードできるローカル専用ツールです。
            </p>
            <div class="mt-auto">
              <a href="./tools/T005_CSV-Convert01/T005index.html" class="btn btn-primary btn-sm w-100">
                開く
              </a>
            </div>
          </div>
        </div>
      </div>

    </div>
  </section>

  <!-- お知らせエリア -->
  <section class="mb-5">
    <h2 class="h5 mb-3">お知らせ</h2>
    <div class="alert alert-info small mb-0" role="status">
      サポ箱TOPページはゆるっと開発中です。「こんなの欲しい！」などあれば気軽に中の人までどうぞ。
    </div>
  </section>

</div>
`;

  // ============================
  // 共通「TOPへ戻る」ボタン
  // ============================
  var backBtn = document.createElement("button");
  backBtn.id = "backToTopBtn";
  backBtn.type = "button";
  backBtn.className = "btn btn-primary btn-sm rounded-circle";
  backBtn.setAttribute("aria-label", "ページの先頭へ戻る");
  backBtn.innerHTML = `
    <span aria-hidden="true">&uarr;</span>
    <span class="visually-hidden">ページの先頭へ戻る</span>
  `;

  document.body.appendChild(backBtn);

  window.addEventListener("scroll", function () {
    backBtn.style.display = window.scrollY > 200 ? "block" : "none";
  });

  backBtn.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
})();
