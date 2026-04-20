/**
 * Disc Game Prize Fund
 * Time Complexity: O(N^2)
 * Space Complexity: O(N)
 */

function solve(n) {
  const limit = Math.floor((n - 1) / 2);
  const dp = new Array(limit + 1).fill(0n);
  dp[0] = 1n;

  for (let k = 1; k <= n; k++) {
    const kBig = BigInt(k);
    for (let j = limit; j >= 1; j--) {
      dp[j] = dp[j] + dp[j - 1] * kBig;
    }
  }

  let numerator = 0n;
  for (let i = 0; i <= limit; i++) {
    numerator += dp[i];
  }

  let denominator = 1n;
  for (let i = 1; i <= n + 1; i++) {
    denominator *= BigInt(i);
  }

  const ans = denominator / numerator;
  return ans.toString();
};

function processData(input) {
  const lines = input.trim().split(/\s+/);
  if (lines.length === 0) return;

  let ptr = 0;
  if (lines.length > 1) {
    const T = parseInt(lines[ptr++]);
    for (let i = 0; i < T; i++) {
      if (ptr < lines.length) {
        const n = parseInt(lines[ptr++]);
        console.log(solve(n));
      }
    }
  } else {
    const n = parseInt(lines[0]);
    console.log(solve(n));
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