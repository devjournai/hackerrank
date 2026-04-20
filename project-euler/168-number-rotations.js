/**
 * Number Rotations
 * Time Complexity: O(M)
 * Space Complexity: O(M²)
 */

function processData(input) {
  const M = Number(input.trim());
  const MOD = 100000n;

  let result = 0n;

  const pow10 = Array(M + 1).fill(0n);
  pow10[0] = 1n;
  for (let i = 1; i <= M; i++) {
    pow10[i] = pow10[i - 1] * 10n;
  }

  for (let k = 2; k <= M; k++) {
    const tenPow = pow10[k - 1];

    for (let mul = 1n; mul <= 9n; mul++) {
      const denom = 10n * mul - 1n;

      for (let d = 1n; d <= 9n; d++) {
        const num = d * (tenPow - mul);

        if (num % denom !== 0n) continue;

        const x = num / denom;

        if (x < pow10[k - 2] || x >= pow10[k - 1]) continue;

        const n = 10n * x + d;
        if (n < pow10[M]) {
          result = (result + n) % MOD;
        }
      }
    }
  }

  console.log(result.toString());
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