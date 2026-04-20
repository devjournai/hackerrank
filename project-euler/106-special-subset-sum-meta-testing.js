/**
 * Special Subset Sum Meta Testing
 * Time Complexity: O(N + T*N)
 * Space Complexity: O(N)
 */

function processData(input) {
  const lines = input.trim().split(/\s+/);
  let ptr = 0;

  if (lines.length === 0) return;

  const T = parseInt(lines[ptr++], 10);

  const MAX_N = 1000000;
  const MOD = 1000000007n;

  const fact = new BigInt64Array(MAX_N + 1);
  const invFact = new BigInt64Array(MAX_N + 1);

  fact[0] = 1n;
  for (let i = 1; i <= MAX_N; i++) {
    fact[i] = (fact[i - 1] * BigInt(i)) % MOD;
  }

  function power(base, exp) {
    let res = 1n;
    base %= MOD;
    while (exp > 0n) {
      if (exp % 2n === 1n) res = (res * base) % MOD;
      base = (base * base) % MOD;
      exp /= 2n;
    }
    return res;
  }

  function modInverse(n) {
    return power(n, MOD - 2n);
  }

  invFact[MAX_N] = modInverse(fact[MAX_N]);
  for (let i = MAX_N - 1; i >= 0; i--) {
    invFact[i] = (invFact[i + 1] * BigInt(i + 1)) % MOD;
  }

  function nCr(n, r) {
    if (r < 0 || r > n) return 0n;
    return (((fact[n] * invFact[r]) % MOD) * invFact[n - r]) % MOD;
  }

  for (let i = 0; i < T; i++) {
    const n = parseInt(lines[ptr++], 10);
    let totalTests = 0n;

    const limit = Math.floor(n / 2);

    for (let k = 2; k <= limit; k++) {
      const chooseElements = nCr(n, 2 * k);
      const combin2k_k = nCr(2 * k, k);
      const invKPlus1 = (invFact[k + 1] * fact[k]) % MOD;
      const catalan = (combin2k_k * invKPlus1) % MOD;

      const inv2 = 500000004n;
      let ambiguous = (combin2k_k * inv2) % MOD;
      ambiguous = (ambiguous - catalan + MOD) % MOD;
      const term = (chooseElements * ambiguous) % MOD;
      totalTests = (totalTests + term) % MOD;
    }

    console.log(totalTests.toString());
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