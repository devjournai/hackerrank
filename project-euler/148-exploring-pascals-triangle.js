/**
 * Exploring Pascal's Triangle
 * Time Complexity: O(T * log(N))
 * Space Complexity: O(log(N))
 */

const fs = require("fs");

function solve() {
  const buffer = fs.readFileSync(0);
  let bufferIdx = 0;

  function readString() {
    let start = bufferIdx;
    while (bufferIdx < buffer.length && buffer[bufferIdx] <= 32) {
      bufferIdx++;
    }
    if (bufferIdx >= buffer.length) return null;
    start = bufferIdx;
    while (bufferIdx < buffer.length && buffer[bufferIdx] > 32) {
      bufferIdx++;
    }
    return buffer.toString("utf8", start, bufferIdx);
  }

  function readBigInt() {
    const s = readString();
    return s ? BigInt(s) : null;
  }

  const T_str = readString();
  if (!T_str) return;
  const T = parseInt(T_str, 10);

  const MOD = 1000000007;

  function getDigits(val) {
    if (val === 0n) return [0];
    const res = [];
    while (val > 0n) {
      const rem = Number(val % 7n);
      res.push(rem);
      val /= 7n;
    }
    return res;
  }

  const memo = new Int32Array(150);
  let digitsN = [];
  let digitsR = [];

  function dp(idx, tN, tR) {
    if (idx < 0) return 1;
    const stateIdx = (idx << 2) | ((tN ? 1 : 0) << 1) | (tR ? 1 : 0);
    if (memo[stateIdx] !== -1) return memo[stateIdx];

    let ans = 0;
    const limN = tN ? digitsN[idx] : 6;
    const limR = tR ? digitsR[idx] : 6;

    for (let n_i = 0; n_i <= limN; n_i++) {
      const next_tN = tN && n_i === limN;
      if (!tR) {
        const count = n_i + 1;
        const res = dp(idx - 1, next_tN, false);
        ans = (ans + count * res) % MOD;
      } else {
        const upper_limit = n_i < limR - 1 ? n_i : limR - 1;

        if (upper_limit >= 0) {
          const count = upper_limit + 1;
          const res = dp(idx - 1, next_tN, false);
          ans = (ans + count * res) % MOD;
        }
        if (limR <= n_i) {
          const res = dp(idx - 1, next_tN, true);
          ans = (ans + res) % MOD;
        }
      }
    }

    memo[stateIdx] = ans;
    return ans;
  }

  const outBuffer = [];
  const flushSize = 5000;

  for (let t = 0; t < T; t++) {
    const N_in = readBigInt();
    const R_in = readBigInt();

    if (R_in === 0n) {
      outBuffer.push(0);
    } else {
      const N_limit = N_in - 1n;
      const R_limit = R_in - 1n;

      digitsN = getDigits(N_limit);
      digitsR = getDigits(R_limit);

      const maxLen =
        digitsN.length > digitsR.length ? digitsN.length : digitsR.length;
      while (digitsN.length < maxLen) digitsN.push(0);
      while (digitsR.length < maxLen) digitsR.push(0);

      const memoSize = (maxLen + 1) << 2;
      for (let i = 0; i < memoSize; i++) memo[i] = -1;

      const result = dp(maxLen - 1, true, true);
      outBuffer.push(result);
    }

    if (outBuffer.length >= flushSize) {
      process.stdout.write(outBuffer.join("\n") + "\n");
      outBuffer.length = 0;
    }
  }

  if (outBuffer.length > 0) {
    process.stdout.write(outBuffer.join("\n") + "\n");
  }
};

if (require.main === module) {
  solve();
};