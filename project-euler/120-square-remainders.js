/**
 * Square remainders
 * Time Complexity: O(T) - O(1) per test case
 * Space Complexity: O(1)
 */

const MOD = 1000000007n;

function processData(input) {
  const lines = input.trim().split(/\s+/);
  if (lines.length === 0) return;

  const T = parseInt(lines[0], 10);
  let ptr = 1;

  for (let i = 0; i < T; i++) {
    const A = BigInt(lines[ptr++]);
    const e = parseInt(lines[ptr++]);
    let sumPowers = 0n;
    if (e === 2) {
      sumPowers = A * (A + 1n) * (2n * A + 1n) / 6n;
    } else {
      const s = A * (A + 1n) / 2n;
      sumPowers = s * s;
    }

    const cntOdd = (A + 1n) / 2n;
    const cntEven = A / 2n;

    const sumOdd = cntOdd * cntOdd;

    const sumEvenTerm = 2n * cntEven * (cntEven + 1n);

    const subtraction = sumOdd + sumEvenTerm;

    let ans = (sumPowers - subtraction) % MOD;

    if (e === 2 && A >= 2n) {
      ans = (ans + 2n) % MOD;
    }

    if (ans < 0n) ans += MOD;

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