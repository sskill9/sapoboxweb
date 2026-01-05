/* testpacks/testpack_pc_basic_01.js
   PC基礎知識テスト（10問）
*/
(function () {
  'use strict';

  if (!window.TESTPACKS) {
    window.TESTPACKS = [];
  }

  var testpack = {
    meta: {
      testName: 'PC基礎知識テスト',
      testId: 'PC-BASIC-01',
      passLine: 80,
      locale: 'ja-JP',
      shuffleQ: true,
      shuffleC: true
    },
    security: {
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
        text: 'CPUの主な役割はどれですか？',
        choices: [
          { cid: 'A', text: 'データの永続保存' },
          { cid: 'B', text: '計算や制御の実行' },
          { cid: 'C', text: '画面表示' },
          { cid: 'D', text: '電力供給' }
        ],
        answerPlainForDevOnly: ['B']
      },
      {
        qid: 'Q002',
        type: 'single',
        text: 'RAMの特徴として正しいものはどれですか？',
        choices: [
          { cid: 'A', text: '電源を切っても内容が保持される' },
          { cid: 'B', text: '読み込み専用である' },
          { cid: 'C', text: '高速だが揮発性である' },
          { cid: 'D', text: '光ディスクの一種である' }
        ],
        answerPlainForDevOnly: ['C']
      },
      {
        qid: 'Q003',
        type: 'multi',
        text: '入力装置として正しいものをすべて選んでください。',
        choices: [
          { cid: 'A', text: 'キーボード' },
          { cid: 'B', text: 'マウス' },
          { cid: 'C', text: 'ディスプレイ' },
          { cid: 'D', text: 'スキャナ' }
        ],
        answerPlainForDevOnly: ['A', 'B', 'D']
      },
      {
        qid: 'Q004',
        type: 'single',
        text: 'OSの役割として最も適切なものはどれですか？',
        choices: [
          { cid: 'A', text: 'ハードウェアの制御とアプリ管理' },
          { cid: 'B', text: '文書作成のみ' },
          { cid: 'C', text: 'インターネット接続のみ' },
          { cid: 'D', text: '電源供給の制御のみ' }
        ],
        answerPlainForDevOnly: ['A']
      },
      {
        qid: 'Q005',
        type: 'multi',
        text: 'ストレージ装置に該当するものを選んでください。',
        choices: [
          { cid: 'A', text: 'HDD' },
          { cid: 'B', text: 'SSD' },
          { cid: 'C', text: 'RAM' },
          { cid: 'D', text: 'USBメモリ' }
        ],
        answerPlainForDevOnly: ['A', 'B', 'D']
      },
      {
        qid: 'Q006',
        type: 'single',
        text: '拡張子「.exe」が示すものはどれですか？',
        choices: [
          { cid: 'A', text: '画像ファイル' },
          { cid: 'B', text: '実行可能ファイル' },
          { cid: 'C', text: '音声ファイル' },
          { cid: 'D', text: '設定ファイル' }
        ],
        answerPlainForDevOnly: ['B']
      },
      {
        qid: 'Q007',
        type: 'single',
        text: 'PCの電源を入れて最初に起動する仕組みはどれですか？',
        choices: [
          { cid: 'A', text: 'アプリケーション' },
          { cid: 'B', text: 'BIOS / UEFI' },
          { cid: 'C', text: 'ブラウザ' },
          { cid: 'D', text: 'ドライバ' }
        ],
        answerPlainForDevOnly: ['B']
      },
      {
        qid: 'Q008',
        type: 'multi',
        text: '代表的なOSをすべて選んでください。',
        choices: [
          { cid: 'A', text: 'Windows' },
          { cid: 'B', text: 'macOS' },
          { cid: 'C', text: 'Linux' },
          { cid: 'D', text: 'HTML' }
        ],
        answerPlainForDevOnly: ['A', 'B', 'C']
      },
      {
        qid: 'Q009',
        type: 'single',
        text: 'LANとは何の略ですか？',
        choices: [
          { cid: 'A', text: 'Large Area Network' },
          { cid: 'B', text: 'Local Area Network' },
          { cid: 'C', text: 'Long Access Network' },
          { cid: 'D', text: 'Logical Access Node' }
        ],
        answerPlainForDevOnly: ['B']
      },
      {
        qid: 'Q010',
        type: 'single',
        text: 'ファイルを削除すると最初に移動する場所はどこですか？',
        choices: [
          { cid: 'A', text: '完全削除' },
          { cid: 'B', text: 'ゴミ箱' },
          { cid: 'C', text: 'バックアップ領域' },
          { cid: 'D', text: 'クラウド' }
        ],
        answerPlainForDevOnly: ['B']
      }
    ]
  };

  window.TESTPACKS.push(testpack);
})();
