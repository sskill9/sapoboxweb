// data/sc-excel.js
// Excel ショートカット定義（まずは動作検証用の最小セット）

(function () {
  window.SC_SHORTCUT_DATASETS = window.SC_SHORTCUT_DATASETS || [];

  window.SC_SHORTCUT_DATASETS.push({
    appId: "Excel",
    appLabel: "Excel",
    shortcuts: [
      { type: "chord", keys: ["Ctrl", "C"], name: "コピー", desc: "選択したセル/範囲をコピー" },
      { type: "chord", keys: ["Ctrl", "V"], name: "貼り付け", desc: "コピー/切り取りした内容を貼り付け" },
      { type: "chord", keys: ["Ctrl", "X"], name: "切り取り", desc: "選択したセル/範囲を切り取り" },
      { type: "chord", keys: ["Ctrl", "S"], name: "保存", desc: "ブックを保存" },
      { type: "chord", keys: ["Ctrl", "F"], name: "検索", desc: "検索ダイアログを開く" },
      { type: "chord", keys: ["Ctrl", "H"], name: "置換", desc: "置換ダイアログを開く" },
      { type: "chord", keys: ["F2"], name: "セル編集", desc: "アクティブセルを編集" },
      { type: "chord", keys: ["Ctrl", "Shift", "L"], name: "フィルターON/OFF", desc: "オートフィルターを切り替え" },
      { type: "chord", keys: ["Ctrl", "1"], name: "セルの書式設定", desc: "セルの書式設定ダイアログを開く" },
      { type: "chord", keys: ["Ctrl", "Z"], name: "元に戻す", desc: "直前の操作を元に戻す" }
    ]
  });
})();
