/**
 * Red Green or Blue tiles
 * Time Complexity: O(T * log N)
 * Space Complexity: O(1)
 */

const MOD = 1000000007n;

function multiply(A, B, size) {
  const C = new Array(size).fill(0).map(() => new Array(size).fill(0n));
  for (let i = 0; i < size; i++) {
    for (let k = 0; k < size; k++) {
      if (A[i][k] === 0n) continue;
      for (let j = 0; j < size; j++) {
        C[i][j] = (C[i][j] + A[i][k] * B[k][j]) % MOD;
      }
    }
  }
  return C;
};

function power(A, p, size) {
  let res = new Array(size).fill(0).map((_, i) => new Array(size).fill(0).map((_, j) => (i === j ? 1n : 0n)));
  let base = A;
  while (p > 0n) {
    if (p & 1n) res = multiply(res, base, size);
    base = multiply(base, base, size);
    p >>= 1n;
  }
  return res;
};

function countWays(n, m) {
  if (n < BigInt(m)) return 1n;

  const size = m;
  const M = new Array(size).fill(0).map(() => new Array(size).fill(0n));

  M[0][0] = 1n;
  M[0][m - 1] = 1n;

  for (let i = 1; i < size; i++) {
    M[i][i - 1] = 1n;
  }

  const exponent = n - BigInt(m) + 1n;
  const Mn = power(M, exponent, size);

  let result = 0n;
  for (let i = 0; i < size; i++) {
    result = (result + Mn[0][i]) % MOD;
  }

  return result;
};

function processData(input) {
  const tokens = input.trim().split(/\s+/);
  if (tokens.length === 0) return;

  const T = parseInt(tokens[0]);
  let ptr = 1;

  for (let i = 0; i < T; i++) {
    const n = BigInt(tokens[ptr++]);
    let waysRed = (countWays(n, 2) - 1n + MOD) % MOD;
    let waysGreen = (countWays(n, 3) - 1n + MOD) % MOD;
    let waysBlue = (countWays(n, 4) - 1n + MOD) % MOD;

    const total = (waysRed + waysGreen + waysBlue) % MOD;
    console.log(total.toString());
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