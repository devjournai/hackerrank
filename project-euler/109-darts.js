/**
 * Darts
 * Time Complexity: O(61^3 * log N)
 * Space Complexity: O(61^2)
 */

function processData(input) {
  const N = BigInt(input.trim());
  const MOD = 1000000009n;
  const counts = new Int32Array(61);

  for (let i = 1; i <= 20; i++) counts[i]++;
  for (let i = 1; i <= 20; i++) counts[i * 2]++;
  for (let i = 1; i <= 20; i++) counts[i * 3]++;
  counts[25]++;
  counts[50]++;

  const doubleValues = [];
  for (let i = 1; i <= 20; i++) doubleValues.push(i * 2);
  doubleValues.push(50);

  const SZ = 61;
  const matrix = new BigInt64Array(SZ * SZ);

  function get(mat, r, c) { return mat[r * SZ + c]; }
  function set(mat, r, c, val) { mat[r * SZ + c] = val; }

  for (let k = 1; k <= 60; k++) {
    set(matrix, 0, k - 1, BigInt(counts[k]));
  }

  for (let i = 1; i < 60; i++) {
    set(matrix, i, i - 1, 1n);
  }

  set(matrix, 60, 60, 1n);
  for (let k = 1; k <= 60; k++) {
    set(matrix, 60, k - 1, BigInt(counts[k]));
  }

  function multiply(A, B) {
    const C = new BigInt64Array(SZ * SZ);
    for (let i = 0; i < SZ; i++) {
      for (let k = 0; k < SZ; k++) {
        const val = A[i * SZ + k];
        if (val === 0n) continue;
        for (let j = 0; j < SZ; j++) {
          C[i * SZ + j] = (C[i * SZ + j] + val * B[k * SZ + j]) % MOD;
        }
      }
    }
    return C;
  }

  function power(A, p) {
    let res = new BigInt64Array(SZ * SZ);
    for (let i = 0; i < SZ; i++) res[i * SZ + i] = 1n; // Identity
    let base = A;
    while (p > 0n) {
      if (p & 1n) res = multiply(res, base);
      base = multiply(base, base);
      p >>= 1n;
    }
    return res;
  }

  const T_N = power(matrix, N);

  const finalState = new BigInt64Array(SZ);
  for (let i = 0; i < SZ; i++) {
    finalState[i] = (get(T_N, i, 0) + get(T_N, i, 60)) % MOD;
  }

  const totalSum = finalState[60];
  let ans = 0n;

  for (const dVal of doubleValues) {
    if (dVal > N) {
    }

    let sumDp = 0n;
    for (let k = 0; k < dVal; k++) {
      if (k < 60) {
        sumDp = (sumDp + finalState[k]) % MOD;
      }
    }

    let ways = (totalSum - sumDp + MOD) % MOD;
    ans = (ans + ways) % MOD;
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