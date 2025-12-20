// data/sc-manifest.js
// ショートカット確認：データ構成（アプリ一覧）
// ※fetchしない（file:// 直開きでも動作させるため）
// ※このファイルは「どんなアプリのデータがあるか」を示すだけで、実データは各 sc-*.js にある。

(function () {
  window.SC_SHORTCUT_MANIFEST = {
    version: "1.0.0",
    apps: [
      { id: "Windows11", label: "Windows11", script: "data/sc-windows11.js" },
      { id: "Excel", label: "Excel", script: "data/sc-excel.js" }
    ]
  };

  // データ格納領域（各 sc-*.js が push する）
  window.SC_SHORTCUT_DATASETS = window.SC_SHORTCUT_DATASETS || [];
})();
