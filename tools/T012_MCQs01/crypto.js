/* crypto.js
   T012_MCQs01 - MCQツール（暗号ユーティリティ）
   - Web Crypto API を使用（CryptoJS 非依存）
   - 仕様：AES-CBC + PBKDF2(SHA-256) / iterations=300000 / MACなし（抑止目的）
*/
(function () {
  'use strict';

  // ===== [Base64ユーティリリティ]ブロック =====
  function bytesToBase64(bytes) {
    var bin = '';
    var i;
    for (i = 0; i < bytes.length; i++) {
      bin += String.fromCharCode(bytes[i]);
    }
    return btoa(bin);
  }

  function base64ToBytes(b64) {
    var bin = atob(String(b64 || ''));
    var out = new Uint8Array(bin.length);
    var i;
    for (i = 0; i < bin.length; i++) {
      out[i] = bin.charCodeAt(i);
    }
    return out;
  }
  // ===== [Base64ユーティリリティ]ブロックここまで =====

  // ===== [UTF-8ユーティリティ]ブロック =====
  function utf8ToBytes(str) {
    var enc = new TextEncoder();
    return enc.encode(String(str || ''));
  }

  function bytesToUtf8(bytes) {
    var dec = new TextDecoder();
    return dec.decode(bytes);
  }
  // ===== [UTF-8ユーティリティ]ブロックここまで =====

  // ===== [乱数ユーティリティ]ブロック =====
  function randomBytes(len) {
    var out = new Uint8Array(len);
    crypto.getRandomValues(out);
    return out;
  }
  // ===== [乱数ユーティリティ]ブロックここまで =====

  // ===== [PBKDF2]ブロック =====
  async function pbkdf2KeyBytes(passwordStr, saltBytes, iterations, keyLenBytes) {
    var passBytes = utf8ToBytes(passwordStr);
    var baseKey = await crypto.subtle.importKey(
      'raw',
      passBytes,
      { name: 'PBKDF2' },
      false,
      ['deriveBits']
    );

    var bits = await crypto.subtle.deriveBits(
      {
        name: 'PBKDF2',
        salt: saltBytes,
        iterations: iterations,
        hash: 'SHA-256'
      },
      baseKey,
      keyLenBytes * 8
    );

    return new Uint8Array(bits);
  }
  // ===== [PBKDF2]ブロックここまで =====

  // ===== [AES-CBC]ブロック =====
  async function importAesKey(keyBytes) {
    return crypto.subtle.importKey(
      'raw',
      keyBytes,
      { name: 'AES-CBC' },
      false,
      ['encrypt', 'decrypt']
    );
  }

  async function aesCbcEncrypt(plainBytes, keyBytes, ivBytes) {
    var key = await importAesKey(keyBytes);
    var ct = await crypto.subtle.encrypt(
      { name: 'AES-CBC', iv: ivBytes },
      key,
      plainBytes
    );
    return new Uint8Array(ct);
  }

  async function aesCbcDecrypt(cipherBytes, keyBytes, ivBytes) {
    var key = await importAesKey(keyBytes);
    var pt = await crypto.subtle.decrypt(
      { name: 'AES-CBC', iv: ivBytes },
      key,
      cipherBytes
    );
    return new Uint8Array(pt);
  }
  // ===== [AES-CBC]ブロックここまで =====

  // ===== [answerEnc：暗号化・復号]ブロック =====
  async function encryptJsonAnswerArray(answerArr, svKey4, saltB64, iterations) {
    var saltBytes = base64ToBytes(saltB64);
    var ivBytes = randomBytes(16);

    var keyBytes = await pbkdf2KeyBytes(String(svKey4 || ''), saltBytes, Number(iterations || 300000), 32);

    var json = JSON.stringify(Array.isArray(answerArr) ? answerArr : []);
    var ptBytes = utf8ToBytes(json);

    var ctBytes = await aesCbcEncrypt(ptBytes, keyBytes, ivBytes);

    return {
      ivB64: bytesToBase64(ivBytes),
      ctB64: bytesToBase64(ctBytes)
    };
  }

  async function decryptJsonAnswerArray(answerEncObj, svKey4, saltB64, iterations) {
    if (!answerEncObj || typeof answerEncObj !== 'object') return [];

    var ivB64 = answerEncObj.ivB64 || '';
    var ctB64 = answerEncObj.ctB64 || '';
    if (!ivB64 || !ctB64) return [];

    var saltBytes = base64ToBytes(saltB64);
    var ivBytes = base64ToBytes(ivB64);
    var ctBytes = base64ToBytes(ctB64);

    var keyBytes = await pbkdf2KeyBytes(String(svKey4 || ''), saltBytes, Number(iterations || 300000), 32);

    var ptBytes = await aesCbcDecrypt(ctBytes, keyBytes, ivBytes);
    var json = bytesToUtf8(ptBytes);

    try {
      var arr = JSON.parse(json);
      if (Array.isArray(arr)) return arr;
      return [];
    } catch (e) {
      return [];
    }
  }
  // ===== [answerEnc：暗号化・復号]ブロックここまで =====

  // ===== [公開API]ブロック =====
  window.MCQCrypto = {
    bytesToBase64: bytesToBase64,
    base64ToBytes: base64ToBytes,
    utf8ToBytes: utf8ToBytes,
    bytesToUtf8: bytesToUtf8,
    randomBytes: randomBytes,
    encryptJsonAnswerArray: encryptJsonAnswerArray,
    decryptJsonAnswerArray: decryptJsonAnswerArray
  };
  // ===== [公開API]ブロックここまで =====
})();
