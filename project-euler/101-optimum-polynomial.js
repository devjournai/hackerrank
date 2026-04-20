/**
 * Optimum Polynomial
 * Time Complexity: O(N^2)
 * Space Complexity: O(N^2)
 */

function processData(input) {
  const MOD = 1000000007n;
  const lines = input.trim().split(/\s+/).map(BigInt);

  let idx = 0;
  const N = Number(lines[idx++]);

  const A = [];
  for (let i = 0; i <= N; i++) A.push(lines[idx++]);

  const u = new Array(N + 2);
  for (let n = 1; n <= N + 1; n++) {
    let x = BigInt(n);
    let val = 0n;
    let pow = 1n;
    for (let i = 0; i <= N; i++) {
      val = (val + A[i] * pow) % MOD;
      pow = (pow * x) % MOD;
    }
    u[n] = val;
  }

  const diff = Array.from({ length: N + 1 }, () => new Array(N + 2).fill(0n));

  for (let j = 1; j <= N + 1; j++) diff[0][j] = u[j];

  for (let i = 1; i <= N; i++) {
    for (let j = 1; j <= N + 1 - i; j++) {
      diff[i][j] = (diff[i - 1][j + 1] - diff[i - 1][j] + MOD) % MOD;
    }
  }

  const C = Array.from({ length: N + 1 }, () => new Array(N + 1).fill(0n));
  for (let i = 0; i <= N; i++) {
    C[i][0] = C[i][i] = 1n;
    for (let j = 1; j < i; j++) {
      C[i][j] = (C[i - 1][j - 1] + C[i - 1][j]) % MOD;
    }
  }

  const res = [];
  for (let k = 1; k <= N; k++) {
    let fit = 0n;
    for (let i = 0; i < k; i++) {
      fit = (fit + C[k][i] * diff[i][1]) % MOD;
    }
    res.push(fit.toString());
  }

  console.log(res.join(" "));
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