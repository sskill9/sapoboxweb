// ==================================================
// content.ui.js — UI描画専用
// ==================================================
(function () {
  "use strict";

  // ===== 初期取得ブロック =====
  var contentEl = document.getElementById("content-block");
  if (!contentEl) return;

  // 共有（UI生成の入口としてのみ使用）
  window.contentEl = contentEl;
  // ===== 初期取得ブロックここまで =====


  // ==================================================
  // ===== UI描画ブロック =====
  // ==================================================
  contentEl.innerHTML = `
  <section class="container py-4" aria-label="暗号化／復号化ツール本体">

    <!-- ツール情報バー（左：バッジ／右：説明文） -->
    <div class="d-flex flex-column flex-md-row align-items-md-center justify-content-between mb-3">

      <!-- 左側：バッジ類（暗号化／汎用ツール） -->
      <div class="mb-2 mb-md-0">
        <span class="badge rounded-pill fw-semibold me-2"
              style="background-color:#0d6efd;color:#ffffff;font-size:0.78rem;">
          暗号化
        </span>
        <span class="badge rounded-pill fw-semibold"
              style="background-color:#20c997;color:#ffffff;font-size:0.78rem;">
          汎用ツール
        </span>
      </div>

      <!-- 右側：概要説明 -->
      <div class="small text-muted">
        ※ サーバーへ送信しません（ブラウザ内で処理します）
      </div>

    </div>

    <!-- 2カラム（md以上で左右、スマホは縦1カラム） -->
    <div class="row gy-4 gx-4">
      <div class="col-12 col-md-6">

        <!-- ===== 暗号化カードブロック ===== -->
        <div class="card shadow-sm">
          <div class="card-header bg-light">
            <strong>【送信側】ファイルを暗号化</strong>
          </div>
          <div class="card-body">

            <div class="row g-3">

              <!-- ドロップゾーン -->
              <div class="col-12">
                <div id="encryptDropZone"
                     class="border rounded-3 text-center"
                     style="border:2px dashed rgba(13,110,253,.45); background: rgba(13,110,253,.03); padding: 28px; cursor: pointer;"
                     aria-label="暗号化するファイルのドラッグ＆ドロップ領域">
                  <div style="font-size: 40px; line-height: 1;">📁</div>
                  <div class="fw-bold mt-2">ここにファイルをドラッグ＆ドロップ</div>
                  <div class="text-muted small">（クリックでも選択できます）</div>
                  <div id="encryptDropFileName" class="small text-muted mt-2"></div>
                </div>
              </div>

              <!-- または -->
              <div class="col-12">
                <div class="text-muted small">
                  または、こちらのボタンからファイルを選択
                </div>
              </div>

              <!-- ファイル選択 -->
              <div class="col-12">
                <label class="form-label" for="encryptFileInput">暗号化するファイル</label>
                <input class="form-control" type="file" id="encryptFileInput">
              </div>

              <!-- パスワード -->
              <div class="col-12">
                <div class="row g-3 align-items-end">
                  <div class="col-12 col-md-6">
                    <label class="form-label" for="encryptPasswordInput">パスワード</label>
                    <div class="input-group">
                      <input class="form-control" type="password" id="encryptPasswordInput">
                      <button class="btn btn-outline-secondary"
                              type="button"
                              id="encryptPasswordToggle"
                              aria-label="パスワードを表示">
                        👁‍🗨
                      </button>
                    </div>
                  </div>

                  <div class="col-12 col-md-6 d-grid">
                    <button type="button" class="btn btn-primary" id="encryptButton">
                      暗号化してダウンロード（.angou）
                    </button>
                  </div>
                </div>
              </div>

              <!-- 注釈 -->
              <div class="col-12 col-md-6">
                <div class="form-text">
                  ※ できるだけ長いパスワードを推奨します。
                </div>
              </div>

              <div class="col-12">
                <div id="encryptStatus" class="small text-muted"></div>
              </div>

            </div>
          </div>
        </div>
        <!-- ===== 暗号化カードブロックここまで ===== -->

      </div>

      <div class="col-12 col-md-6">

        <!-- ===== 復号化カードブロック ===== -->
        <div class="card shadow-sm">
          <div class="card-header bg-light">
            <strong>【受信側】ファイルを復号化</strong>
          </div>
          <div class="card-body">

            <div class="row g-3">

              <!-- ドロップゾーン -->
              <div class="col-12">
                <div id="decryptDropZone"
                     class="border rounded-3 text-center"
                     style="border:2px dashed rgba(25,135,84,.45); background: rgba(25,135,84,.03); padding: 28px; cursor: pointer;"
                     aria-label="復号化するファイルのドラッグ＆ドロップ領域">
                  <div style="font-size: 40px; line-height: 1;">📁</div>
                  <div class="fw-bold mt-2">ここに .angou ファイルをドラッグ＆ドロップ</div>
                  <div class="text-muted small">（クリックでも選択できます）</div>
                  <div id="decryptDropFileName" class="small text-muted mt-2"></div>
                </div>
              </div>

              <!-- または -->
              <div class="col-12">
                <div class="text-muted small">
                  または、こちらのボタンからファイルを選択
                </div>
              </div>

              <!-- ファイル選択 -->
              <div class="col-12">
                <label class="form-label" for="decryptFileInput">暗号化されたファイル（.angou）</label>
                <input class="form-control" type="file" id="decryptFileInput">
              </div>

              <!-- パスワード -->
              <div class="col-12">
                <div class="row g-3 align-items-end">
                  <div class="col-12 col-md-6">
                    <label class="form-label" for="decryptPasswordInput">パスワード</label>
                    <div class="input-group">
                      <input class="form-control" type="password" id="decryptPasswordInput">
                      <button class="btn btn-outline-secondary"
                              type="button"
                              id="decryptPasswordToggle"
                              aria-label="パスワードを表示">
                        👁‍🗨
                      </button>
                    </div>
                  </div>

                  <div class="col-12 col-md-6 d-grid">
                    <button type="button" class="btn btn-success" id="decryptButton">
                      復号化してダウンロード
                    </button>
                  </div>
                </div>
              </div>

              <!-- 注釈 -->
              <div class="col-12 col-md-6">
                <div class="form-text">
                  ※ パスワードを忘れると復号できません。
                </div>
              </div>

              <div class="col-12">
                <div id="decryptStatus" class="small text-muted"></div>
              </div>

            </div>
          </div>
        </div>
        <!-- ===== 復号化カードブロックここまで ===== -->

      </div>
    </div>

  </section>

  <button id="backToTopBtn"
          type="button"
          class="btn btn-primary position-fixed bottom-0 end-0 m-3 shadow"
          style="display:none; z-index:1080;">
    ↑
  </button>
  `;
  // ==================================================
  // ===== UI描画ブロックここまで =====
  // ==================================================

})();
