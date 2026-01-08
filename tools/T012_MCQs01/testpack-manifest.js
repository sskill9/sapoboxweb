// ===== [testpack-manifest.js]ブロック =====
/*
  testpack-manifest.js
  - CORS回避（JSON fetch禁止）に対応するため、JSでマニフェストを提供する。
  - index.html の <script src="./testpack-manifest.js"></script> から読み込まれる想定。
  - document.write により、同期的に testpacks/*.js を読み込む。
  - app.js は「testpack読み込み済み」を前提としているため、app.js より前にこのファイルを置くこと。
*/

// 読み込む testpack の一覧（ここだけ更新すればOK）
window.TESTPACK_FILES = [
  './testpacks/testpack_test000.js_20260106_092805.js',
    './testpacks/testpack_sample_01.js',
  './testpacks/testpack_pc_basic_01.js',
  './testpacks/testpack_security_basic_01.js'
];

// testpack を同期的に読み込む（app.js が参照する前に読み込み完了させる）
(function () {
  if (!Array.isArray(window.TESTPACK_FILES)) return;

  for (var i = 0; i < window.TESTPACK_FILES.length; i++) {
    var src = window.TESTPACK_FILES[i];
    if (!src) continue;

    // document.write は解析中に実行される前提（index.html で app.js より前に置くこと）
    document.write('<script src="' + src + '"><\/script>');
  }
})();
// ===== [testpack-manifest.js]ブロックここまで =====
