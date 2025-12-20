// tool.js — T009 入電・応答（ざっくり） ロジック集約
//
// 【このファイルで主に書き換えるポイント】
//  1) 計算式（仕様変更があった場合）
//  2) バリデーション（エラー／警告）の条件・文言
//  3) 目標応答率の判定ロジック（危険度）
//
//  ※ UI は content.js 側で制御します。
//  ※ 本ファイルはグローバルに window.T009Tool を公開します。

(function () {
  // ===== T009入力正規化ブロック =====
  function toNumber(value) {
    if (value === null || value === undefined) return 0;
    if (typeof value === "number") {
      if (isNaN(value)) return 0;
      return value;
    }
    var s = String(value).trim();
    if (s === "") return 0;
    var n = Number(s);
    if (isNaN(n)) return 0;
    return n;
  }

  function toIntNonNegative(value) {
    var n = Math.floor(toNumber(value));
    if (n < 0) n = 0;
    return n;
  }

  function toFloatNonNegative(value) {
    var n = toNumber(value);
    if (n < 0) n = 0;
    return n;
  }

  function normalizeInput(raw) {
    var input = {
      C_now: toIntNonNegative(raw.C_now),
      A_now: toIntNonNegative(raw.A_now),
      C_end: toIntNonNegative(raw.C_end),
      T_remain: toFloatNonNegative(raw.T_remain),
      N_agent: toIntNonNegative(raw.N_agent),
      CPH: toFloatNonNegative(raw.CPH),
      R_target_pct: null
    };

    var t = null;
    if (raw.R_target_pct !== null && raw.R_target_pct !== undefined) {
      var s = String(raw.R_target_pct).trim();
      if (s !== "") {
        t = toFloatNonNegative(raw.R_target_pct);
      }
    }
    if (t !== null) {
      if (t < 0) t = 0;
      if (t > 100) t = 100;
      input.R_target_pct = t;
    }

    return input;
  }
  // ===== T009入力正規化ブロックここまで =====

  // ===== T009バリデーションブロック =====
  function validate(input) {
    var errors = [];
    var warnings = [];

    // E1：A_now > C_now は計算しない
    if (input.A_now > input.C_now) {
      errors.push({
        code: "E1",
        message: "応答数が入電数を超えています。入力値を確認してください。"
      });
    }

    // W1：C_end < C_now
    if (input.C_end < input.C_now) {
      warnings.push({
        code: "W1",
        message: "業務終了までの入電見込みが現在の入電数を下回っています。残り入電は0として計算します。"
      });
    }

    // W2：処理能力が0の前提
    if (input.N_agent === 0 || input.T_remain === 0 || input.CPH === 0) {
      warnings.push({
        code: "W2",
        message: "残りの処理能力が0として計算されます。（人数・残り時間・CPHのいずれかが0です）"
      });
    }

    return {
      errors: errors,
      warnings: warnings
    };
  }
  // ===== T009バリデーションブロックここまで =====

  // ===== T009計算ブロック =====
  function round1(value) {
    return Math.round(value * 10) / 10;
  }

  function calc(input) {
    var C_now = input.C_now;
    var A_now = input.A_now;
    var C_end = input.C_end;
    var T_remain = input.T_remain;
    var N_agent = input.N_agent;
    var CPH = input.CPH;

    // (1) 現在までの応答率
    var R_now_pct = 0.0;
    if (C_now === 0) {
      R_now_pct = 0.0;
    } else {
      R_now_pct = (A_now / C_now) * 100;
    }
    var R_now_pct_display = round1(R_now_pct);

    // (2) 残り入電見込み
    var C_remain = C_end - C_now;
    if (C_remain < 0) C_remain = 0;

    // (3) 残り時間での処理能力（理論上）
    var A_capacity_remain_raw = CPH * N_agent * T_remain;
    var A_capacity_remain = Math.round(A_capacity_remain_raw);

    // (4) 残りで実際に応答できる予測件数
    var A_remain_pred = Math.min(A_capacity_remain, C_remain);
    if (A_remain_pred < 0) A_remain_pred = 0;

    // (5) 業務終了までの予測応答数
    var A_end_pred_raw = A_now + A_remain_pred;
    var A_end_pred = Math.min(A_end_pred_raw, C_end);

    // (6) 業務終了までの予測応答率
    var R_end_pred_pct = 0.0;
    if (C_end === 0) {
      R_end_pred_pct = 0.0;
    } else {
      R_end_pred_pct = (A_end_pred / C_end) * 100;
    }
    var R_end_pred_pct_display = round1(R_end_pred_pct);

    // (7) 余力／不足
    var Delta_capacity = A_capacity_remain - C_remain;

    return {
      R_now_pct: R_now_pct,
      R_now_pct_display: R_now_pct_display,
      C_remain: C_remain,
      A_capacity_remain: A_capacity_remain,
      Delta_capacity: Delta_capacity,
      A_end_pred: A_end_pred,
      A_end_pred_raw: A_end_pred_raw,
      R_end_pred_pct: R_end_pred_pct,
      R_end_pred_pct_display: R_end_pred_pct_display
    };
  }
  // ===== T009計算ブロックここまで =====

  // ===== T009目標判定ブロック =====
  function judgeTarget(input, result) {
    if (input.R_target_pct === null) {
      return {
        enabled: false,
        status: "S0",
        badgeText: "",
        isWarnBg: false
      };
    }

    var target = input.R_target_pct;
    var nowOk = result.R_now_pct >= target;
    var endOk = result.R_end_pred_pct >= target;

    var status = "S0";
    var badgeText = "OK（現在OK / 予測OK）";

    if (nowOk && endOk) {
      status = "S0";
      badgeText = "OK（現在OK / 予測OK）";
    } else if (nowOk && !endOk) {
      status = "S1";
      badgeText = "注意（予測が目標未達）";
    } else if (!nowOk && endOk) {
      status = "S2";
      badgeText = "危険（現在が目標未達）";
    } else {
      status = "S3";
      badgeText = "危険（現在も予測も目標未達）";
    }

    return {
      enabled: true,
      status: status,
      badgeText: badgeText,
      isWarnBg: status !== "S0",
      target: target
    };
  }
  // ===== T009目標判定ブロックここまで =====

  // ===== T009公開APIブロック =====
  function computeAll(raw) {
    var input = normalizeInput(raw);
    var v = validate(input);

    if (v.errors.length > 0) {
      return {
        input: input,
        errors: v.errors,
        warnings: v.warnings,
        result: null,
        targetJudge: {
          enabled: false,
          status: "S0",
          badgeText: "",
          isWarnBg: false
        }
      };
    }

    var result = calc(input);
    var targetJudge = judgeTarget(input, result);

    return {
      input: input,
      errors: v.errors,
      warnings: v.warnings,
      result: result,
      targetJudge: targetJudge
    };
  }

  window.T009Tool = {
    normalizeInput: normalizeInput,
    validate: validate,
    calc: calc,
    judgeTarget: judgeTarget,
    computeAll: computeAll
  };
  // ===== T009公開APIブロックここまで =====
})();
