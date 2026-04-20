/**
 * Large Non-Mersenne Prime
 * Time Complexity: O(T log C)
 * Space Complexity: O(1)
 */

function processData(input) {
  const data = input.trim().split(/\s+/);
  let idx = 0;
  const T = Number(data[idx++]);

  const MOD = 1000000000000n;
  let total = 0n;

  function modPow(base, exp) {
    let result = 1n;
    let b = BigInt(base) % MOD;
    let e = BigInt(exp);

    while (e > 0n) {
      if (e & 1n) result = (result * b) % MOD;
      b = (b * b) % MOD;
      e >>= 1n;
    }
    return result;
  }

  for (let i = 0; i < T; i++) {
    const A = BigInt(data[idx++]);
    const B = BigInt(data[idx++]);
    const C = BigInt(data[idx++]);
    const D = BigInt(data[idx++]);

    const pow = modPow(B, C);
    const value = (A * pow + D) % MOD;
    total = (total + value) % MOD;
  }

  let ans = total.toString();
  while (ans.length < 12) ans = "0" + ans;
  console.log(ans);
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