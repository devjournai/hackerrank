/**
 * Square Digit Chains
 * Time Complexity: O(K^2)
 * Space Complexity: O(K)
 */

function processData(input) {
  const K = parseInt(input.trim(), 10);
  const MOD = 1000000007n;

  const maxPossibleSum = K * 81;
  const is89 = new Uint8Array(maxPossibleSum + 1);

  for (let i = 1; i <= maxPossibleSum; i++) {
    let curr = i;
    while (curr !== 1 && curr !== 89) {
      let next = 0;
      let temp = curr;
      while (temp > 0) {
        let d = temp % 10;
        next += d * d;
        temp = Math.floor(temp / 10);
      }
      curr = next;
    }
    if (curr === 89) {
      is89[i] = 1;
    }
  }

  let dp = new Array(maxPossibleSum + 1).fill(0n);
  dp[0] = 1n;

  let currentMax = 0;
  const squares = [0, 1, 4, 9, 16, 25, 36, 49, 64, 81];

  for (let len = 0; len < K; len++) {
    let next_dp = new Array(maxPossibleSum + 1).fill(0n);
    for (let s = 0; s <= currentMax; s++) {
      if (dp[s] === 0n) continue;

      for (let d = 0; d <= 9; d++) {
        let next_s = s + squares[d];
        next_dp[next_s] = (next_dp[next_s] + dp[s]) % MOD;
      }
    }

    dp = next_dp;
    currentMax += 81;
  }

  let ans = 0n;
  for (let s = 1; s <= currentMax; s++) {
    if (is89[s]) {
      ans = (ans + dp[s]) % MOD;
    }
  }

  console.log(ans.toString());
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