/**
 * Red Green or Blue tiles
 * Time Complexity: O(T * log N)
 * Space Complexity: O(1)
 */

const MOD = 1000000007n;

function multiply(A, B) {
  const C = new Array(4).fill(0).map(() => new Array(4).fill(0n));
  for (let i = 0; i < 4; i++) {
    for (let k = 0; k < 4; k++) {
      if (A[i][k] === 0n) continue;
      for (let j = 0; j < 4; j++) {
        C[i][j] = (C[i][j] + A[i][k] * B[k][j]) % MOD;
      }
    }
  }
  return C;
};

function power(A, p) {
  let res = new Array(4).fill(0).map((_, i) => new Array(4).fill(0).map((_, j) => (i === j ? 1n : 0n)));
  let base = A;
  while (p > 0n) {
    if (p & 1n) res = multiply(res, base);
    base = multiply(base, base);
    p >>= 1n;
  }
  return res;
};

function processData(input) {
  const tokens = input.trim().split(/\s+/);
  if (tokens.length === 0) return;

  const T = parseInt(tokens[0]);
  let ptr = 1;

  for (let i = 0; i < T; i++) {
    const n = BigInt(tokens[ptr++]);

    if (n === 1n) {
      console.log(1);
      continue;
    }
    if (n === 2n) {
      console.log(2);
      continue;
    }
    if (n === 3n) {
      console.log(4);
      continue;
    }

    const M = [
      [1n, 1n, 1n, 1n],
      [1n, 0n, 0n, 0n],
      [0n, 1n, 0n, 0n],
      [0n, 0n, 1n, 0n]
    ];

    const Mn = power(M, n - 4n);

    const initialVec = [8n, 4n, 2n, 1n];
    let ans = 0n;

    for (let j = 0; j < 4; j++) {
      ans = (ans + Mn[0][j] * initialVec[j]) % MOD;
    }

    console.log(ans.toString());
  }
};

process.stdin.resume();
process.stdin.setEncoding("ascii");
let _input = "";
process.stdin.on("data", function (input) {
  _input += input;
});
process.stdin.on("end", function () {
  processData(_input);
});