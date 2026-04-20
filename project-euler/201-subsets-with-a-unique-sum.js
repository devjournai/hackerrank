/*
 * Subsets with a Unique Sum
 * Time Complexity: O(n * m * sum(S))
 * Space Complexity: O(m * sum(S))
 */

function processData(input) {
  const tokens = input.trim().split(/\s+/);
  let ptr = 0;

  const n = parseInt(tokens[ptr++], 10);
  const m = parseInt(tokens[ptr++], 10);

  const S = [];
  for (let i = 0; i < n; i++) {
    S.push(parseInt(tokens[ptr++], 10));
  }

  const maxSum = m * 100;

  const dp = new Array(m + 1);
  for (let i = 0; i <= m; i++) {
    dp[i] = new Uint8Array(maxSum + 1);
  }

  dp[0][0] = 1;
  let currentMaxSum = 0;

  for (let i = 0; i < n; i++) {
    const val = S[i];
    const maxK = Math.min(m - 1, i);

    for (let k = maxK; k >= 0; k--) {
      const sLimit = Math.min(currentMaxSum, k * 100);

      for (let s = sLimit; s >= 0; s--) {
        const currentCount = dp[k][s];
        if (currentCount > 0) {
          const nextSum = s + val;
          const nextK = k + 1;

          let nextCount = dp[nextK][nextSum] + currentCount;
          if (nextCount > 2) nextCount = 2;

          dp[nextK][nextSum] = nextCount;
        }
      }
    }

    currentMaxSum += val;
  }

  let uniqueSumTotal = 0;
  const finalRow = dp[m];

  for (let s = 0; s <= maxSum; s++) {
    if (finalRow[s] === 1) {
      uniqueSumTotal += s;
    }
  }

  console.log(uniqueSumTotal);
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