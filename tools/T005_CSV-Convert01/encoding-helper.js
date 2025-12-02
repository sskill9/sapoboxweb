// encoding-helper.js
// T005 CSV 文字コード判定＆変換ツール用の SJIS 変換ラッパー
//
// ・encoding-japanese.min.js を利用して、UTF-16 文字列 → SJIS バイト列 へ変換します。
// ・content.js からは window.csvEncodingToolConvertToSJIS(text) として呼び出されます。

(function () {
  "use strict";

  // ライブラリがない場合はコンソールに警告を出しておく
  if (typeof window.Encoding === "undefined") {
    console.warn(
      "[T005] encoding-japanese.min.js が読み込まれていません。" +
      "Shift_JIS 変換ボタンを押すと警告ダイアログが表示されます。"
    );
  }

  /**
   * CSV テキストを Shift_JIS バイト列（Uint8Array）に変換する関数
   * @param {string} text - 変換したいテキスト（UTF-16 文字列）
   * @returns {Uint8Array|null} - SJIS バイト列（失敗時は null）
   */
  window.csvEncodingToolConvertToSJIS = function (text) {
    if (typeof window.Encoding === "undefined") {
      alert(
        "Shift_JIS への変換ライブラリ（encoding-japanese）が読み込まれていません。\n" +
        "T005 フォルダ内の libs/encoding-japanese.min.js の配置と、\n" +
        "T005index.html の <script> タグを確認してください。"
      );
      return null;
    }

    try {
      // encoding-japanese の convert を利用
      // from: 'UNICODE' → JavaScript の文字列
      // to:   'SJIS'    → SJIS バイト配列
      // type: 'array'   → 数値配列（Number[]）で受け取る
      var sjisArray = window.Encoding.convert(text, {
        to: "SJIS",
        from: "UNICODE",
        type: "array"
      });

      if (!sjisArray || !sjisArray.length) {
        console.error("[T005] SJIS 変換結果が空です。");
        alert("Shift_JIS への変換結果が空でした。元データを確認してください。");
        return null;
      }

      // Number[] → Uint8Array へ詰め替え
      return new Uint8Array(sjisArray);
    } catch (e) {
      console.error("[T005] SJIS 変換中にエラーが発生しました:", e);
      alert("Shift_JIS への変換中にエラーが発生しました。コンソールログを確認してください。");
      return null;
    }
  };
})();
