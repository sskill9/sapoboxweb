/* testpacks/testpack_security_basic_01.js
   セキュリティ遵守テスト（10問）
*/
(function () {
  'use strict';

  if (!window.TESTPACKS) {
    window.TESTPACKS = [];
  }

  var testpack = {
    meta: {
      testName: 'セキュリティ遵守テスト',
      testId: 'SECURITY-BASIC-01',
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
        text: 'パスワード管理として最も適切なものはどれですか？',
        choices: [
          { cid: 'A', text: '付箋に書いて貼る' },
          { cid: 'B', text: '使い回す' },
          { cid: 'C', text: '他人と共有する' },
          { cid: 'D', text: '定期的に変更し複雑にする' }
        ],
        answerPlainForDevOnly: ['D']
      },
      {
        qid: 'Q002',
        type: 'multi',
        text: '情報漏洩につながる行為を選んでください。',
        choices: [
          { cid: 'A', text: '不審メールの添付を開く' },
          { cid: 'B', text: '画面ロックを行う' },
          { cid: 'C', text: 'USBを無断接続する' },
          { cid: 'D', text: '机上に書類を放置する' }
        ],
        answerPlainForDevOnly: ['A', 'C', 'D']
      },
      {
        qid: 'Q003',
        type: 'single',
        text: 'フィッシングメールの特徴はどれですか？',
        choices: [
          { cid: 'A', text: '正規ドメインのみ使用' },
          { cid: 'B', text: '緊急性を強調する' },
          { cid: 'C', text: '添付ファイルなし' },
          { cid: 'D', text: '必ず社内限定' }
        ],
        answerPlainForDevOnly: ['B']
      },
      {
        qid: 'Q004',
        type: 'single',
        text: 'ウイルス対策ソフトの役割はどれですか？',
        choices: [
          { cid: 'A', text: '通信速度を上げる' },
          { cid: 'B', text: 'マルウェアの検知・防御' },
          { cid: 'C', text: '電力管理' },
          { cid: 'D', text: '画面解像度変更' }
        ],
        answerPlainForDevOnly: ['B']
      },
      {
        qid: 'Q005',
        type: 'multi',
        text: '安全な業務利用として適切な行動を選んでください。',
        choices: [
          { cid: 'A', text: '離席時に画面ロック' },
          { cid: 'B', text: '私物USBの使用' },
          { cid: 'C', text: 'OSやソフトの更新' },
          { cid: 'D', text: 'ID・PWの共有' }
        ],
        answerPlainForDevOnly: ['A', 'C']
      },
      {
        qid: 'Q006',
        type: 'single',
        text: '二要素認証に該当するものはどれですか？',
        choices: [
          { cid: 'A', text: 'IDのみ' },
          { cid: 'B', text: 'パスワードのみ' },
          { cid: 'C', text: 'パスワード＋SMS認証' },
          { cid: 'D', text: 'メールのみ' }
        ],
        answerPlainForDevOnly: ['C']
      },
      {
        qid: 'Q007',
        type: 'single',
        text: '社外に持ち出してはいけないものはどれですか？',
        choices: [
          { cid: 'A', text: '公開資料' },
          { cid: 'B', text: '個人情報を含むデータ' },
          { cid: 'C', text: '社内規程' },
          { cid: 'D', text: 'ニュース記事' }
        ],
        answerPlainForDevOnly: ['B']
      },
      {
        qid: 'Q008',
        type: 'multi',
        text: 'マルウェアに該当するものを選んでください。',
        choices: [
          { cid: 'A', text: 'ウイルス' },
          { cid: 'B', text: 'ワーム' },
          { cid: 'C', text: 'トロイの木馬' },
          { cid: 'D', text: 'ファイアウォール' }
        ],
        answerPlainForDevOnly: ['A', 'B', 'C']
      },
      {
        qid: 'Q009',
        type: 'single',
        text: 'ログアウトを行うべきタイミングはどれですか？',
        choices: [
          { cid: 'A', text: '作業終了時' },
          { cid: 'B', text: '常にログイン状態' },
          { cid: 'C', text: '不要' },
          { cid: 'D', text: '再起動時のみ' }
        ],
        answerPlainForDevOnly: ['A']
      },
      {
        qid: 'Q010',
        type: 'single',
        text: '情報セキュリティの基本3要素に含まれないものはどれですか？',
        choices: [
          { cid: 'A', text: '機密性' },
          { cid: 'B', text: '完全性' },
          { cid: 'C', text: '可用性' },
          { cid: 'D', text: '利便性' }
        ],
        answerPlainForDevOnly: ['D']
      }
    ]
  };

  window.TESTPACKS.push(testpack);
})();
