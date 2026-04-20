/**
 * Special Isosceles Triangles
 * Time Complexity: O(T * log(N))
 * Space Complexity: O(1)
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

  const MOD = 1000000007n;

  function multiply(A, B) {
    const C = [
      [0n, 0n, 0n],
      [0n, 0n, 0n],
      [0n, 0n, 0n],
    ];
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        let sum = 0n;
        for (let k = 0; k < 3; k++) {
          sum += A[i][k] * B[k][j];
        }
        C[i][j] = sum % MOD;
      }
    }
    return C;
  }

  function power(A, p) {
    let res = [
      [1n, 0n, 0n],
      [0n, 1n, 0n],
      [0n, 0n, 1n],
    ];
    let base = A;
    let exp = p;
    while (exp > 0n) {
      if ((exp & 1n) === 1n) res = multiply(res, base);
      base = multiply(base, base);
      exp >>= 1n;
    }
    return res;
  }
  const T_MAT = [
    [18n, MOD - 1n, 0n],
    [1n, 0n, 0n],
    [1n, 0n, 1n],
  ];

  const numTestCasesStr = readString();
  if (!numTestCasesStr) return;
  const T = parseInt(numTestCasesStr, 10);

  for (let i = 0; i < T; i++) {
    const nStr = readString();
    if (!nStr) break;
    const N = BigInt(nStr);

    if (N === 1n) {
      console.log("17");
      continue;
    }

    const matPow = power(T_MAT, N - 1n);

    const L2 = 305n;
    const L1 = 17n;
    const S1 = 17n;

    let ans = (matPow[2][0] * L2 + matPow[2][1] * L1 + matPow[2][2] * S1) % MOD;

    console.log(ans.toString());
  }
};

if (require.main === module) {
  solve();
};