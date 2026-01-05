/* content.js
   T012_MCQs01 - MCQツール
   受験UI＋作成UI（骨組み）
   - テンプレ構成は維持（top.js / content.js / footer.js / モーダル）
   - 本ファイルはUI骨組みのみ（ロジックは app.js / builder.js 側で実装）
   - ツール名とZIPリンクは触らない（top.js側で後で手動修正）
*/

// ===== [IIFEラッパー]ブロック =====
(function () {
  'use strict';

  // ===== [マウント取得]ブロック =====
  function getMountPoint() {
    // テンプレ側の想定コンテナが不明なため、候補を順に探す
    // 既存テンプレに合わせて必要ならここだけ調整してください（ID名の調整のみ）
    var el =
      document.getElementById('content-block') ||
      document.getElementById('content') ||
      document.getElementById('app') ||
      document.getElementById('main') ||
      document.querySelector('main') ||
      document.querySelector('[data-content-root]');

    if (!el) {
      el = document.createElement('div');
      el.id = 'content';
      document.body.appendChild(el);
    }
    return el;
  }
  // ===== [マウント取得]ブロックここまで =====

  // ===== [全体レンダリング]ブロック =====
  function render() {
    var mount = getMountPoint();

    // 既存テンプレで content.js が innerHTML を前提にしているケースが多いため、
    // まずはこのファイルが「表示領域を一括描画」する方式で骨組みを作る。
    mount.innerHTML = ''
      + '<div class="container my-4">'
      + '  <div class="row">'
      + '    <div class="col-12">'
      + '      <h1 class="h4 mb-3">Multiple Choice Questions</h1>'
      + '      <p class="text-muted mb-4">ローカル完結（file://）で動作する選択式テストツールです。</p>'
      + '    </div>'
      + '  </div>'

      + '  <div class="row">'
      + '    <div class="col-12">'
      + '      <ul class="nav nav-tabs" id="mcqTabs" role="tablist">'
      + '        <li class="nav-item" role="presentation">'
      + '          <button class="nav-link active" id="tab-exam" data-bs-toggle="tab" data-bs-target="#pane-exam" type="button" role="tab" aria-controls="pane-exam" aria-selected="true">受験</button>'
      + '        </li>'
      + '        <li class="nav-item" role="presentation">'
      + '          <button class="nav-link" id="tab-builder" data-bs-toggle="tab" data-bs-target="#pane-builder" type="button" role="tab" aria-controls="pane-builder" aria-selected="false">作成</button>'
      + '        </li>'
      + '      </ul>'

      + '      <div class="tab-content border border-top-0 rounded-bottom p-3" id="mcqTabsContent">'
      + '        <div class="tab-pane fade show active" id="pane-exam" role="tabpanel" aria-labelledby="tab-exam" tabindex="0">'
      + renderExamPane()
      + '        </div>'

      + '        <div class="tab-pane fade" id="pane-builder" role="tabpanel" aria-labelledby="tab-builder" tabindex="0">'
      + renderBuilderPane()
      + '        </div>'
      + '      </div>'
      + '    </div>'
      + '  </div>'
      + '</div>';
  }
  // ===== [全体レンダリング]ブロックここまで =====

  // ===== [受験タブUI]ブロック =====
  function renderExamPane() {
    // 仕様：受験は「1問ずつ表示（次へ／前へ）」、attemptIdは受験開始時に生成し固定
    // ここでは骨組みのみ用意し、実処理は app.js へ委譲する前提。
    return ''
      + '  <div class="row g-3">'

      + '    <div class="col-12">'
      + '      <div class="alert alert-info mb-0" role="alert">'
      + '        <div class="fw-bold">受験の流れ</div>'
      + '        <div class="small">'
      + '          回答提出後は「採点者を呼んでください」画面になります。キー入力（ENTER）で採点し、結果TXTをダウンロード出力します。'
      + '        </div>'
      + '      </div>'
      + '    </div>'

      + '    <div class="col-12 col-lg-6">'
      + '      <div class="card">'
      + '        <div class="card-header fw-bold">受講者情報</div>'
      + '        <div class="card-body">'
      + '          <div class="mb-3">'
      + '            <label for="exam-empno" class="form-label">社員番号</label>'
      + '            <input type="text" class="form-control" id="exam-empno" placeholder="例：12345" autocomplete="off">'
      + '          </div>'
      + '          <div class="mb-3">'
      + '            <label for="exam-name" class="form-label">氏名</label>'
      + '            <input type="text" class="form-control" id="exam-name" placeholder="例：山田 太郎" autocomplete="off">'
      + '          </div>'

      // ===== [受験：テスト選択プルダウン]ブロック =====
      + '          <div class="mb-3">'
      + '            <label for="exam-test-select" class="form-label">実施テスト</label>'
      + '            <select class="form-select" id="exam-test-select" disabled>'
      + '              <option value="" selected>（テスト読込中…）</option>'
      + '            </select>'
      + '            <div class="form-text">'
      + '              テストはプルダウンから選択してください（選択後に受験開始できます）。'
      + '            </div>'
      + '            <div class="small text-muted mt-1" id="exam-test-select-status">未判定</div>'
      + '          </div>'
      // ===== [受験：テスト選択プルダウン]ブロックここまで =====
      + '          <div class="d-flex gap-2 flex-wrap">'
      + '            <span id="wrap-btn-exam-start" class="d-inline-block" tabindex="0"'
      + '              data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="入力・選択が不足しています">'
      + '              <button type="button" class="btn btn-primary" id="btn-exam-start">受験開始</button>'
      + '            </span>'
      + '            <button type="button" class="btn btn-outline-secondary" id="btn-exam-reset">リセット</button>'
      + '          </div>'
      + '          <div class="mt-3 small text-muted">'
      + '            attemptId：<span id="exam-attemptid" class="fw-semibold">未開始</span>'
      + '          </div>'
      + '          <div class="small text-muted">'
      + '            開始日時：<span id="exam-startedat" class="fw-semibold">未開始</span>'
      + '          </div>'
      + '        </div>'
      + '      </div>'
      + '    </div>'

      + '    <div class="col-12 col-lg-6">'
      + '      <div class="card">'
      + '        <div class="card-header fw-bold">テスト情報</div>'
      + '        <div class="card-body">'
      + '          <div class="mb-2">'
      + '            <div class="small text-muted">testpack.js 読み込み状態</div>'
      + '            <div id="exam-testpack-status" class="fw-semibold">未判定</div>'
      + '          </div>'
      + '          <div class="mb-2">'
      + '            <div class="small text-muted">テスト名</div>'
      + '            <div id="exam-testname" class="fw-semibold">-</div>'
      + '          </div>'
      + '          <div class="mb-2">'
      + '            <div class="small text-muted">テストID</div>'
      + '            <div id="exam-testid" class="fw-semibold">-</div>'
      + '          </div>'
      + '          <div class="mb-2">'
      + '            <div class="small text-muted">合格ライン</div>'
      + '            <div id="exam-passline" class="fw-semibold">-</div>'
      + '          </div>'
      + '          <div class="mb-0">'
      + '            <div class="small text-muted">出題設定</div>'
      + '            <div class="fw-semibold">'
      + '              問題シャッフル：<span id="exam-shuffleq">-</span> / 選択肢シャッフル：<span id="exam-shufflec">-</span>'
      + '            </div>'
      + '          </div>'
      + '        </div>'
      + '      </div>'
      + '    </div>'

      + '    <div class="col-12">'
      + '      <div class="card">'
      + '        <div class="card-header d-flex justify-content-between align-items-center flex-wrap gap-2">'
      + '          <div class="fw-bold">設問</div>'
      + '          <div class="small text-muted">'
      + '            進捗：<span id="exam-progress">0 / 0</span>'
      + '          </div>'
      + '        </div>'
      + '        <div class="card-body">'
      + '          <div id="exam-question-area">'
      + '            <div class="text-muted">受験開始後にここへ1問ずつ表示します。</div>'
      + '          </div>'
      + '        </div>'
      // ===== [設問カードフッター（ナビ＆提出）]ブロック =====
      + '        <div class="card-footer d-flex justify-content-between align-items-center flex-wrap gap-2">'
      + '          <div class="d-flex gap-2 flex-wrap">'
      + '            <button type="button" class="btn btn-outline-secondary" id="btn-exam-prev" disabled>前へ</button>'
      + '            <button type="button" class="btn btn-outline-secondary" id="btn-exam-next" disabled>次へ</button>'
      + '          </div>'
      + '          <div class="d-flex gap-2 flex-wrap">'
      + '            <span id="wrap-btn-exam-submit" class="d-inline-block" tabindex="0"'
      + '              data-bs-toggle="tooltip"'
      + '              data-bs-placement="top"'
      + '              data-bs-title="選択していない設問があります">'
      + '              <button type="button" class="btn btn-success" id="btn-exam-submit" disabled>回答を提出</button>'
      + '            </span>'
      + '          </div>'
      + '        </div>'
      // ===== [設問カードフッター（ナビ＆提出）]ブロックここまで =====
      + '      </div>'
      + '    </div>'

      + '    <div class="col-12" id="exam-after-submit" style="display:none;">'
      + '      <div class="card border-warning">'
      + '        <div class="card-header fw-bold text-warning">採点者を呼んでください</div>'
      + '        <div class="card-body">'
      + '          <p class="mb-2">採点キーを入力し、<span class="fw-bold">ENTER</span> を押して採点します。</p>'
      + '          <div class="mb-2">'
      + '            <label for="sv-key" class="form-label">採点キー（数字4桁）</label>'
      + '            <div class="input-group">'
      + '              <input type="password" class="form-control" id="sv-key" inputmode="numeric" autocomplete="off" placeholder="例：0007">'
      + '              <button type="button" class="btn btn-warning" id="btn-sv-grade">採点（ENTER）</button>'
      + '            </div>'
      + '            <div class="form-text">数字以外はエラー。4桁未満は左ゼロ埋め。4桁超はエラー。</div>'
      + '          </div>'
      + '          <hr>'
      + '          <div id="exam-result-area">'
      + '            <div class="text-muted">採点後に合否・正解率（小数第1位）を表示し、結果TXTをダウンロードします。</div>'
      + '          </div>'
      + '        </div>'
      + '      </div>'
      + '    </div>'

      + '  </div>';
  }
  // ===== [受験タブUI]ブロックここまで =====

  // ===== [作成タブUI]ブロック =====
  function renderBuilderPane() {
    // 仕様：testpack.js をJSファイルとして生成（JSONは使用しない）
    // 暗号：CryptoJS AES-CBC + PBKDF2（SHA-256） / iterations=300000 / MACなし（抑止目的）
    // SVキーは数字4桁（正規化：trim、数字以外NG、4桁未満ゼロ埋め、4桁超NG）
    // ここでは骨組みのみ用意し、実処理は builder.js へ委譲する前提。
    return ''
      + '  <div class="row g-3">'

      + '    <div class="col-12">'
      + '      <div class="alert alert-secondary mb-0" role="alert">'
      + '        <div class="fw-bold">作成モード</div>'
      + '        <div class="small">'
      + '          設問作成後、暗号化済み正解を含む <code>testpack.js</code> をダウンロード出力します（平文の正解は保持しません）。'
      + '        </div>'
      + '      </div>'
      + '    </div>'

      + '    <div class="col-12 col-lg-6">'
      + '      <div class="card">'
      + '        <div class="card-header fw-bold">テスト情報（meta）</div>'
      + '        <div class="card-body">'
      + '          <div class="mb-3">'
      + '            <label for="b-testname" class="form-label">テスト名</label>'
      + '            <input type="text" class="form-control" id="b-testname" placeholder="例：新人セキュリティ確認（第1回）" autocomplete="off">'
      + '          </div>'
      + '          <div class="mb-3">'
      + '            <label for="b-testid" class="form-label">テストID</label>'
      + '            <input type="text" class="form-control" id="b-testid" placeholder="例：SEC-2026-01-A" autocomplete="off">'
      + '          </div>'
      + '          <div class="row g-2">'
      + '            <div class="col-12 col-md-6">'
      + '              <label for="b-passline" class="form-label">合格ライン（％）</label>'
      + '              <input type="number" class="form-control" id="b-passline" min="0" max="100" step="1" value="80">'
      + '            </div>'
      + '            <div class="col-12 col-md-6">'
      + '              <label for="b-locale" class="form-label">ロケール</label>'
      + '              <input type="text" class="form-control" id="b-locale" value="ja-JP" autocomplete="off">'
      + '            </div>'
      + '          </div>'
      + '          <div class="row g-2 mt-1">'
      + '            <div class="col-12 col-md-6">'
      + '              <div class="form-check mt-3">'
      + '                <input class="form-check-input" type="checkbox" value="" id="b-shuffleq" checked>'
      + '                <label class="form-check-label" for="b-shuffleq">問題をシャッフル</label>'
      + '              </div>'
      + '            </div>'
      + '            <div class="col-12 col-md-6">'
      + '              <div class="form-check mt-3">'
      + '                <input class="form-check-input" type="checkbox" value="" id="b-shufflec" checked>'
      + '                <label class="form-check-label" for="b-shufflec">選択肢をシャッフル</label>'
      + '              </div>'
      + '            </div>'
      + '          </div>'
      + '        </div>'
      + '      </div>'
      + '    </div>'

      + '    <div class="col-12 col-lg-6">'
      + '      <div class="card">'
      + '        <div class="card-header fw-bold">セキュリティ設定（security）</div>'
      + '        <div class="card-body">'
      + '          <div class="mb-3">'
      + '            <label for="b-svkey" class="form-label">キー（数字4桁）</label>'
      + '            <input type="password" class="form-control" id="b-svkey" inputmode="numeric" autocomplete="off" placeholder="例：1234">'
      + '            <div class="form-text">'
      + '              数字以外はエラー。4桁未満は左ゼロ埋め。4桁超はエラー。'
      + '              キーは画面表示／保存／コンソール出力／localStorage保存を禁止（運用ルール）。'
      + '            </div>'
      + '          </div>'
      + '          <div class="mb-3">'
      + '            <label class="form-label">暗号方式</label>'
      + '            <div class="small">'
      + '              CryptoJS / AES-CBC + PBKDF2（SHA-256） / iterations=300000 / keyLength=256 / MACなし（抑止目的）'
      + '            </div>'
      + '          </div>'
      + '          <div class="mb-0">'
      + '            <label class="form-label">salt（テスト全体共通 / Base64）</label>'
      + '            <div class="d-flex gap-2 flex-wrap">'
      + '              <button type="button" class="btn btn-outline-primary" id="btn-b-gensalt">salt生成</button>'
      + '              <span class="small text-muted">生成後にここへ表示（※実装時に画面表示可否は方針に合わせて調整）</span>'
      + '            </div>'
      + '            <div class="mt-2">'
      + '              <input type="text" class="form-control" id="b-saltb64" placeholder="Base64（16バイト）" autocomplete="off">'
      + '            </div>'
      + '          </div>'
      + '        </div>'
      + '      </div>'
      + '    </div>'

      + '    <div class="col-12">'
      + '      <div class="card">'
      + '        <div class="card-header fw-bold">設問</div>'
      + '        <div class="card-body">'
      + '          <div class="d-flex gap-2 flex-wrap mb-3">'
      + '            <button type="button" class="btn btn-outline-primary" id="btn-b-add-single">単一選択を追加</button>'
      + '            <button type="button" class="btn btn-outline-primary" id="btn-b-add-multi">複数選択を追加</button>'
      + '            <button type="button" class="btn btn-outline-secondary" id="btn-b-clear">全削除</button>'
      + '          </div>'
      + '          <div id="builder-questions-area">'
      + '            <div class="text-muted">ここに設問エディタ（Q001〜、選択肢、正解設定）を追加していきます。</div>'
      + '          </div>'
      + '        </div>'
      + '        <div class="card-footer d-flex justify-content-end gap-2 flex-wrap">'
      + '          <button type="button" class="btn btn-success" id="btn-b-download">testpack.js をダウンロード</button>'
      + '        </div>'
      + '      </div>'
      + '    </div>'

      + '    <div class="col-12">'
      + '      <div class="card">'
      + '        <div class="card-header fw-bold">作成ログ</div>'
      + '        <div class="card-body">'
      + '          <pre class="mb-0 small" id="builder-log" style="white-space:pre-wrap;">準備中</pre>'
      + '        </div>'
      + '      </div>'
      + '    </div>'

      + '  </div>';
  }
  // ===== [作成タブUI]ブロックここまで =====

  // ===== [安全初期化]ブロック =====
  function safeInit() {
    try {
      render();
    } catch (e) {
      // 例外時も画面が真っ白にならないよう最低限の表示を出す
      var mount = getMountPoint();
      mount.innerHTML = ''
        + '<div class="container my-4">'
        + '  <div class="alert alert-danger" role="alert">'
        + '    <div class="fw-bold">content.js の描画でエラーが発生しました</div>'
        + '    <div class="small">テンプレ側のマウント要素IDが異なる可能性があります。getMountPoint() の候補を調整してください。</div>'
        + '  </div>'
        + '</div>';
    }
  }
  // ===== [安全初期化]ブロックここまで =====

  // ===== [DOMContentLoadedハンドラ]ブロック =====
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', safeInit);
  } else {
    safeInit();
  }
  // ===== [DOMContentLoadedハンドラ]ブロックここまで =====

})();
// ===== [IIFEラッパー]ブロックここまで =====
