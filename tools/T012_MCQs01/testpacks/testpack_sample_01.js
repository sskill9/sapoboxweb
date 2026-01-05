/* testpacks/testpack_sample_01.js
   B案：testpack を個別JSとして追加していく方式
   - 各testpackは window.TESTPACKS に push する
   - app.js は window.TESTPACKS（優先）/ window.TESTPACK（互換）を読む
*/

(function () {
  'use strict';

  // ===== [TESTPACKS初期化]ブロック =====
  if (!window.TESTPACKS) {
    window.TESTPACKS = [];
  }
  // ===== [TESTPACKS初期化]ブロックここまで =====

  // ===== [サンプルtestpack定義]ブロック =====
  // 注意：正解の暗号化やsalt等は「作成UI(builder.js)」実装で置き換える前提
  // ここでは受験UIの「テスト選択→開始→次フェーズ実装」のための最小データ
  var testpack = {
    meta: {
      testName: '新人テスト1（サンプル）',
      testId: 'NEW-TEST-1',
      passLine: 80,
      locale: 'ja-JP',
      shuffleQ: true,
      shuffleC: true
    },
    security: {
      // 次フェーズ（暗号採点）で使用
      // 現段階ではダミー
      kdf: 'PBKDF2-SHA256',
      cipher: 'AES-CBC',
      iterations: 300000,
      keyLength: 256,
      mac: 'none',
      saltB64: ''
    },
    questions: [
      {
        qid: 'Q001',
        type: 'single',
        text: 'サンプル問題：このツールはどこで動作しますか？',
        choices: [
          { cid: 'A', text: 'インターネット必須（オンラインのみ）' },
          { cid: 'B', text: 'ローカル完結（file://）' },
          { cid: 'C', text: 'スマホアプリのみ' },
          { cid: 'D', text: 'サーバー必須（PHP必須）' }
        ],
        // 正解は本来暗号化で保持（次フェーズ）
        // ここでは仮置き（次フェーズ実装時に除去）
        answerPlainForDevOnly: ['B']
      },
      {
        qid: 'Q002',
        type: 'single',
        text: 'サンプル問題：SVキーは何桁の数字ですか？',
        choices: [
          { cid: 'A', text: '3桁' },
          { cid: 'B', text: '4桁' },
          { cid: 'C', text: '6桁' },
          { cid: 'D', text: '8桁' }
        ],
        answerPlainForDevOnly: ['B']
      }
    ]
  };
  // ===== [サンプルtestpack定義]ブロックここまで =====

  // ===== [登録]ブロック =====
  window.TESTPACKS.push(testpack);
  // ===== [登録]ブロックここまで =====

})();
