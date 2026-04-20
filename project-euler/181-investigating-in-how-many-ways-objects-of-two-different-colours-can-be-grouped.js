/**
 * Investigating in how many ways objects of two different colours can be grouped
 * Time Complexity: O(N^2 * M^2) precomputation + O(Q) for queries
 * Space Complexity: O(N * M)
 */

function processData(input) {
  const MOD = 1000000007;
  const MAX_N = 160;
  const MAX_M = 160;
  const cols = MAX_M + 1;
  const dp = new Int32Array((MAX_N + 1) * cols);
  dp[0] = 1;
  for (let b = 0; b <= MAX_N; b++) {
    for (let w = 0; w <= MAX_M; w++) {
      if (b === 0 && w === 0) continue;
      for (let i = b; i <= MAX_N; i++) {
        const currentRowsOffset = i * cols;
        const prevRowOffset = (i - b) * cols;

        for (let j = w; j <= MAX_M; j++) {
          const currentIdx = currentRowsOffset + j;
          const prevIdx = prevRowOffset + (j - w);

          let val = dp[currentIdx] + dp[prevIdx];

          if (val >= MOD) {
            val -= MOD;
          }
          dp[currentIdx] = val;
        }
      }
    }
  }

  const tokens = input.trim().split(/\s+/);
  let tokenIdx = 0;
  const Q = parseInt(tokens[tokenIdx++], 10);

  for (let k = 0; k < Q; k++) {
    const n = parseInt(tokens[tokenIdx++], 10);
    const m = parseInt(tokens[tokenIdx++], 10);

    console.log(dp[n * cols + m]);
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