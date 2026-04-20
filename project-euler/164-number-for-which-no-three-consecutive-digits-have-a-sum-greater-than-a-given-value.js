/**
 * Number for Which No Three Consecutive Digits Have a Sum Greater Than a Given Value
 * Time Complexity: O(m × 10³)
 * Space Complexity: O(m × 10²)
 */

function processData(input) {
  const m = Number(input.trim());
  const MOD = 1000000007;

  let dp = Array.from({ length: m + 1 }, () =>
    Array.from({ length: 10 }, () => Array(10).fill(0)),
  );

  for (let d1 = 1; d1 <= 9; d1++) {
    for (let d2 = 0; d2 <= 9; d2++) {
      dp[2][d1][d2] = 1;
    }
  }

  for (let pos = 2; pos < m; pos++) {
    for (let d1 = 0; d1 <= 9; d1++) {
      for (let d2 = 0; d2 <= 9; d2++) {
        const cur = dp[pos][d1][d2];
        if (cur === 0) continue;

        for (let d = 0; d <= 9; d++) {
          if (d1 + d2 + d <= 9) {
            dp[pos + 1][d2][d] = (dp[pos + 1][d2][d] + cur) % MOD;
          }
        }
      }
    }
  }

  let ans = 0;
  for (let d1 = 0; d1 <= 9; d1++) {
    for (let d2 = 0; d2 <= 9; d2++) {
      ans = (ans + dp[m][d1][d2]) % MOD;
    }
  }

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