/**
 * Modified Fibonacci Golden Nuggets
 * Time Complexity: O(log R + T * log R) (Optimized with precomputation)
 * Space Complexity: O(log R) for matrix cache
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

  const MOD = 1000000007n;

  function multiplyMat(A, B) {
    const C = new Array(4);
    for (let i = 0; i < 4; i++) {
      C[i] = [0n, 0n, 0n, 0n];
      for (let j = 0; j < 4; j++) {
        let sum = 0n;
        for (let k = 0; k < 4; k++) {
          sum += A[i][k] * B[k][j];
        }
        C[i][j] = sum % MOD;
      }
    }
    return C;
  }

  function multiplyVecMat(V, M) {
    const Res = [0n, 0n, 0n, 0n];
    for (let j = 0; j < 4; j++) {
      let sum = 0n;
      for (let k = 0; k < 4; k++) {
        sum += V[k] * M[k][j];
      }
      Res[j] = sum % MOD;
    }
    return Res;
  }

  const M = [
    [322n, 1n, 0n, 322n],
    [MOD - 1n, 0n, 0n, MOD - 1n],
    [448n, 0n, 1n, 448n],
    [0n, 0n, 0n, 1n],
  ];

  const MAX_BITS = 62;
  const powers = new Array(MAX_BITS);
  powers[0] = M;
  for (let i = 1; i < MAX_BITS; i++) {
    powers[i] = multiplyMat(powers[i - 1], powers[i - 1]);
  }

  function getSumUpTo(v0, vm1, limit) {
    if (limit < 0n) return 0n;

    let state = [v0, vm1, 1n, v0];

    if (limit === 0n) return v0;

    let e = limit;
    let bit = 0;
    while (e > 0n) {
      if ((e & 1n) === 1n) {
        state = multiplyVecMat(state, powers[bit]);
      }
      e >>= 1n;
      bit++;
    }

    return state[3];
  }

  const seeds = [
    { v0: 2n, vm1: 42n },
    { v0: 5n, vm1: 21n },
    { v0: 21n, vm1: 5n },
    { v0: 42n, vm1: 2n },
    { v0: 152n, vm1: 0n },
    { v0: 296n, vm1: 0n },
  ];

  const TStr = readString();
  if (!TStr) return;
  const T = parseInt(TStr, 10);
  const results = [];

  for (let i = 0; i < T; i++) {
    const L = readBigInt();
    const R = readBigInt();

    let totalSum = 0n;

    for (let t = 0; t < 6; t++) {
      const numL = L - BigInt(t) - 1n;
      let jStart = numL >= 0n ? (numL + 5n) / 6n : numL / 6n;

      const numR = R - BigInt(t) - 1n;
      let jEnd = numR >= 0n ? numR / 6n : (numR - 5n) / 6n;

      if (jStart <= jEnd) {
        const s = seeds[t];
        const sumR = getSumUpTo(s.v0, s.vm1, jEnd);
        const sumL = getSumUpTo(s.v0, s.vm1, jStart - 1n);

        let diff = (sumR - sumL) % MOD;
        if (diff < 0n) diff += MOD;
        totalSum = (totalSum + diff) % MOD;
      }
    }
    results.push(totalSum.toString());
  }

  console.log(results.join("\n"));
};

if (require.main === module) {
  solve();
};