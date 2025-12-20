// dict.js — T008 最小辞書（A: まず動作優先）
//
// 形式：window.KANJI_DICT
// キー：漢字1文字
// 値：{ on:[], kun:[], strokes:number|null, radical:string }
// ※ ここでは最小サンプル。後で増やせます。

(function () {
  window.KANJI_DICT = {
    "清": { on: ["セイ", "ショウ"], kun: ["きよ.い", "きよ.まる", "きよ.める"], strokes: 11, radical: "氵" },
    "高": { on: ["コウ"], kun: ["たか.い", "たか", "たか.まる", "たか.める"], strokes: 10, radical: "高" },
    "山": { on: ["サン"], kun: ["やま"], strokes: 3, radical: "山" },
    "田": { on: ["デン"], kun: ["た"], strokes: 5, radical: "田" },
    "口": { on: ["コウ", "ク"], kun: ["くち"], strokes: 3, radical: "口" },
    "木": { on: ["モク", "ボク"], kun: ["き", "こ"], strokes: 4, radical: "木" },
    "人": { on: ["ジン", "ニン"], kun: ["ひと"], strokes: 2, radical: "人" },
    "日": { on: ["ニチ", "ジツ"], kun: ["ひ", "か"], strokes: 4, radical: "日" },
    "月": { on: ["ゲツ", "ガツ"], kun: ["つき"], strokes: 4, radical: "月" },
    "金": { on: ["キン", "コン"], kun: ["かね"], strokes: 8, radical: "金" }
  };
})();
