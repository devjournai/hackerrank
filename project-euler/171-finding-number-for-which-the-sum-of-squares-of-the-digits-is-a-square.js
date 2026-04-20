/**
 * Finding Number for Which the Sum of Squares of the Digits is a Square
 * Time Complexity: O(D²)
 * Space Complexity: O(D²)
 */

const MOD = 1000000007n;
let memo;
let K_str;
let powersOf10;

const isPerfectSquare = new Array(8101).fill(false);
for (let i = 1; i * i <= 8100; i++) {
  isPerfectSquare[i * i] = true;
}

function processData(input) {
  K_str = input.trim();
  const len = K_str.length;
  memo = new Array(len)
    .fill(null)
    .map(() => new Array(len * 81 + 1).fill(null).map(() => [null, null]));

  powersOf10 = new Array(len + 1).fill(0n);
  powersOf10[0] = 1n;
  for (let i = 1; i <= len; i++) {
    powersOf10[i] = (powersOf10[i - 1] * 10n) % MOD;
  }

  const result = solve(0, 0, true);
  console.log(result.sum.toString());
}

function solve(idx, currentSum, tight) {
  if (idx === K_str.length) {
    return {
      count: currentSum > 0 && isPerfectSquare[currentSum] ? 1n : 0n,
      sum: 0n,
    };
  }

  const tightIndex = tight ? 1 : 0;
  if (memo[idx][currentSum][tightIndex] !== null) {
    return memo[idx][currentSum][tightIndex];
  }

  let totalCount = 0n;
  let totalSum = 0n;

  const limit = tight ? parseInt(K_str[idx]) : 9;

  for (let digit = 0; digit <= limit; digit++) {
    const nextSum = currentSum + digit * digit;
    const nextTight = tight && digit === limit;

    const res = solve(idx + 1, nextSum, nextTight);

    if (res.count > 0n) {
      const placeValue =
        (BigInt(digit) * powersOf10[K_str.length - 1 - idx]) % MOD;
      const termSum = (placeValue * res.count) % MOD;

      totalSum = (totalSum + termSum + res.sum) % MOD;
      totalCount = (totalCount + res.count) % MOD;
    }
  }

  const result = { count: totalCount, sum: totalSum };
  memo[idx][currentSum][tightIndex] = result;
  return result;
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