/**
 * Counting block combinations I
 * Time Complexity: O(M^3 log N)
 * Space Complexity: O(M^2)
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

function processData(input) {
  const tokens = input.trim().split(/\s+/);
  const n = BigInt(tokens[0]);
  const m = parseInt(tokens[1]);

  if (n < BigInt(m)) {
    console.log(1);
    return;
  }
  if (n === BigInt(m)) {
    console.log(2);
    return;
  }

  const size = m + 1;
  const M = new Array(size).fill(0).map(() => new Array(size).fill(0n));

  M[0][0] = 2n;
  M[0][1] = (M[0][1] - 1n + MOD) % MOD;
  M[0][m] = (M[0][m] + 1n) % MOD;

  for (let i = 1; i < size; i++) {
    M[i][i - 1] = 1n;
  }

  const Mn = power(M, n - BigInt(m), size);

  let ans = 0n;
  const initialVec = new Array(size).fill(1n);
  initialVec[0] = 2n;

  for (let i = 0; i < size; i++) {
    ans = (ans + Mn[0][i] * initialVec[i]) % MOD;
  }

  console.log(ans.toString());
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