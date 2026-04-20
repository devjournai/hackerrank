/**
 * Non-Bouncy numbers
 * Time Complexity: O(maxK)
 * Space Complexity: O(maxK)
 */

function processData(input) {
  const MOD = 1000000007n
  const data = input.trim().split(/\s+/).map(Number)
  const T = data[0]
  const K = data.slice(1)
  const maxK = Math.max(...K) + 10

  const fact = Array(maxK + 1).fill(0n)
  const invFact = Array(maxK + 1).fill(0n)

  fact[0] = 1n
  for (let i = 1; i <= maxK; i++) fact[i] = fact[i - 1] * BigInt(i) % MOD

  invFact[maxK] = modInv(fact[maxK])
  for (let i = maxK; i > 0; i--) invFact[i - 1] = invFact[i] * BigInt(i) % MOD

  function nCr(n, r) {
    if (r < 0 || r > n) return 0n
    return fact[n] * invFact[r] % MOD * invFact[n - r] % MOD
  }

  function modInv(a) {
    return modPow(a, MOD - 2n)
  }

  function modPow(a, b) {
    let res = 1n
    while (b > 0n) {
      if (b & 1n) res = res * a % MOD
      a = a * a % MOD
      b >>= 1n
    }
    return res
  }

  let out = []
  for (let k of K) {
    const Kb = BigInt(k)
    const inc = nCr(k + 9, 9)
    const dec = nCr(k + 10, 10)
    const ans = (inc + dec - 10n * Kb - 2n + MOD) % MOD
    out.push(ans.toString())
  }

  console.log(out.join("\n"))
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