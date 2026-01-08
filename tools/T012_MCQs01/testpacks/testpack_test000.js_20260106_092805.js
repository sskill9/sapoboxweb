(function(){
  'use strict';
  if (!window.TESTPACKS) window.TESTPACKS = [];
  var pack = {
  "meta": {
    "formatVersion": "1.0",
    "testId": "test000.js",
    "testName": "test000",
    "createdAt": "2026-01-06T09:28:05+09:00",
    "passLinePercent": 80,
    "shuffleQuestions": true,
    "shuffleChoices": true,
    "locale": "ja-JP"
  },
  "security": {
    "scheme": "cj-aes-cbc-pbkdf2",
    "kdf": {
      "name": "PBKDF2",
      "hash": "SHA-256",
      "iterations": 300000
    },
    "cipher": {
      "name": "AES-CBC",
      "keyLength": 256
    },
    "saltB64": "V8F/H+HaeOe3Cor93mjuRQ=="
  },
  "questions": [
    {
      "qid": "Q001",
      "type": "single",
      "body": "test01",
      "choices": [
        {
          "cid": "A",
          "text": "a"
        },
        {
          "cid": "B",
          "text": "b"
        },
        {
          "cid": "C",
          "text": "c"
        },
        {
          "cid": "D",
          "text": "d"
        }
      ],
      "explanation": "",
      "answerEnc": {
        "alg": "AES-CBC",
        "ivB64": "LJWbuN+m1cLB+GfdncDdkA==",
        "dataB64": "ldeCLrG+oz4oKCESuOdiSg==",
        "ctB64": "ldeCLrG+oz4oKCESuOdiSg=="
      }
    },
    {
      "qid": "Q002",
      "type": "multi",
      "body": "02multi",
      "choices": [
        {
          "cid": "A",
          "text": "a"
        },
        {
          "cid": "B",
          "text": "b"
        },
        {
          "cid": "C",
          "text": "c"
        },
        {
          "cid": "D",
          "text": "d"
        }
      ],
      "explanation": "",
      "answerEnc": {
        "alg": "AES-CBC",
        "ivB64": "v0UbYbC/wyWG9HwWblnkFA==",
        "dataB64": "L5PUllQkJmnI9Z2jdy6//w==",
        "ctB64": "L5PUllQkJmnI9Z2jdy6//w=="
      }
    }
  ]
};
  var exists = false;
  try {
    for (var i=0;i<window.TESTPACKS.length;i++){
      if (window.TESTPACKS[i] && window.TESTPACKS[i].meta && window.TESTPACKS[i].meta.testId === pack.meta.testId) { exists = true; break; }
    }
  } catch (e) {}
  if (!exists) {
    window.TESTPACKS.push(pack);
  }
})();
