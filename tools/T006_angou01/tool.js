// tool.js — 暗号化／復号化ロジック（WebCrypto）
//
// 目的：content.js（UI側）から呼び出す“処理だけ”をここに集約します。
// 仕様：PBKDF2(SHA-256) → AES-GCM(256)
// 保存形式：salt(16) + iv(12) + ciphertext
// 拡張子：.angou
//
// ※ iterations はセキュリティ強度と処理時間のトレードオフです。
//    初期値は実用寄り（一般的なPCで現実的に待てる範囲）として設定しています。
//    必要に応じて後から調整できます。

(function () {
  "use strict";

  // ===== 設定ブロック =====
  var ANGOU_PBKDF2_ITERATIONS = 300000; // 初期値（必要なら調整）
  var ANGOU_SALT_BYTES = 16;
  var ANGOU_IV_BYTES = 12;
  // ===== 設定ブロックここまで =====

  // ===== 共通ユーティリティブロック =====
  function angouGetSubtle() {
    if (!window.crypto || !window.crypto.subtle) return null;
    return window.crypto.subtle;
  }

  function angouGetRandomBytes(length) {
    var arr = new Uint8Array(length);
    window.crypto.getRandomValues(arr);
    return arr;
  }

  function angouConcatUint8Arrays(a, b, c) {
    var total = 0;
    if (a) total += a.length;
    if (b) total += b.length;
    if (c) total += c.length;

    var out = new Uint8Array(total);
    var offset = 0;

    if (a) {
      out.set(a, offset);
      offset += a.length;
    }
    if (b) {
      out.set(b, offset);
      offset += b.length;
    }
    if (c) {
      out.set(c, offset);
      offset += c.length;
    }

    return out;
  }

  function angouTextToBytes(text) {
    return new TextEncoder().encode(text);
  }

  function angouDownloadBlob(blob, filename) {
    var url = URL.createObjectURL(blob);
    var a = document.createElement("a");
    a.style.display = "none";
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }
  // ===== 共通ユーティリティブロックここまで =====

  // ===== 鍵導出ブロック =====
  async function angouDeriveKeyFromPassword(password, salt, usage) {
    var subtle = angouGetSubtle();
    if (!subtle) {
      throw new Error("このブラウザは WebCrypto (crypto.subtle) に対応していません。");
    }

    var passwordBytes = angouTextToBytes(password);

    var baseKey = await subtle.importKey(
      "raw",
      passwordBytes,
      "PBKDF2",
      false,
      ["deriveKey"]
    );

    var derivedKey = await subtle.deriveKey(
      {
        name: "PBKDF2",
        salt: salt,
        iterations: ANGOU_PBKDF2_ITERATIONS,
        hash: "SHA-256",
      },
      baseKey,
      { name: "AES-GCM", length: 256 },
      false,
      [usage]
    );

    return derivedKey;
  }
  // ===== 鍵導出ブロックここまで =====

  // ===== 暗号化ブロック =====
  async function angouEncryptArrayBuffer(arrayBuffer, password) {
    var subtle = angouGetSubtle();
    if (!subtle) {
      throw new Error("このブラウザは WebCrypto (crypto.subtle) に対応していません。");
    }

    var salt = angouGetRandomBytes(ANGOU_SALT_BYTES);
    var iv = angouGetRandomBytes(ANGOU_IV_BYTES);

    var key = await angouDeriveKeyFromPassword(password, salt, "encrypt");

    var encryptedBuffer = await subtle.encrypt(
      { name: "AES-GCM", iv: iv },
      key,
      arrayBuffer
    );

    var encryptedBytes = new Uint8Array(encryptedBuffer);
    var packed = angouConcatUint8Arrays(salt, iv, encryptedBytes);

    return packed.buffer;
  }
  // ===== 暗号化ブロックここまで =====

  // ===== 復号化ブロック =====
  async function angouDecryptArrayBuffer(arrayBuffer, password) {
    var subtle = angouGetSubtle();
    if (!subtle) {
      throw new Error("このブラウザは WebCrypto (crypto.subtle) に対応していません。");
    }

    if (!arrayBuffer || arrayBuffer.byteLength < (ANGOU_SALT_BYTES + ANGOU_IV_BYTES + 1)) {
      throw new Error("暗号化ファイルの形式が不正です。");
    }

    var salt = new Uint8Array(arrayBuffer, 0, ANGOU_SALT_BYTES);
    var iv = new Uint8Array(arrayBuffer, ANGOU_SALT_BYTES, ANGOU_IV_BYTES);
    var encryptedData = arrayBuffer.slice(ANGOU_SALT_BYTES + ANGOU_IV_BYTES);

    var key = await angouDeriveKeyFromPassword(password, salt, "decrypt");

    var decryptedBuffer = await subtle.decrypt(
      { name: "AES-GCM", iv: iv },
      key,
      encryptedData
    );

    return decryptedBuffer;
  }
  // ===== 復号化ブロックここまで =====

  // ===== ファイル名処理ブロック =====
  function angouMakeEncryptedFilename(originalName) {
    return String(originalName || "file") + ".angou";
  }

  function angouMakeDecryptedFilename(encryptedName) {
    var name = String(encryptedName || "file.angou");
    if (name.toLowerCase().endsWith(".angou")) {
      return name.slice(0, -(".angou".length));
    }
    return name;
  }
  // ===== ファイル名処理ブロックここまで =====

  // ===== 公開APIブロック =====
  window.angouEncryptArrayBuffer = angouEncryptArrayBuffer;
  window.angouDecryptArrayBuffer = angouDecryptArrayBuffer;
  window.angouDownloadBlob = angouDownloadBlob;
  window.angouMakeEncryptedFilename = angouMakeEncryptedFilename;
  window.angouMakeDecryptedFilename = angouMakeDecryptedFilename;

  // 設定値も必要なら参照できるように公開（UI側で表示したい場合など）
  window.angouConfig = {
    pbkdf2Iterations: ANGOU_PBKDF2_ITERATIONS,
    saltBytes: ANGOU_SALT_BYTES,
    ivBytes: ANGOU_IV_BYTES,
  };
  // ===== 公開APIブロックここまで =====
})();
