/**
 * Hexadecimal Numbers
 * Time Complexity: O(n log n)
 * Space Complexity: O(1)
 */

function processData(input) {
  const n = parseInt(input.trim());
  const MOD = 1000000007n;

  const modPow = (base, exp) => {
    let res = 1n;
    base %= MOD;
    while (exp > 0n) {
      if (exp & 1n) res = (res * base) % MOD;
      base = (base * base) % MOD;
      exp >>= 1n;
    }
    return res;
  };

  let totalWays = 0n;

  for (let i = 3; i <= n; i++) {
    const L = BigInt(i);

    const t1 = 15n * modPow(16n, L - 1n);
    const t2 = 43n * modPow(15n, L - 1n);
    const t3 = 41n * modPow(14n, L - 1n);
    const t4 = 13n * modPow(13n, L - 1n);

    let waysL = (t1 - t2 + t3 - t4) % MOD;
    if (waysL < 0n) waysL += MOD;

    totalWays = (totalWays + waysL) % MOD;
  }

  console.log(totalWays.toString());
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