/**
 * Step Numbers
 * Time Complexity: O(2^10 * N * 10)
 * Space Complexity: O(N * 10)
 */

function processData(input) {
  const K = input.trim();
  if (!K) return;
  const N = K.length;

  const dp = new Array(N + 1);
  for (let i = 0; i <= N; i++) {
    dp[i] = [0n, 0n, 0n, 0n, 0n, 0n, 0n, 0n, 0n, 0n];
  }

  let ans = 0n;

  for (let mask = 1; mask < 1024; mask++) {
    for (let d = 0; d <= 9; d++) {
      dp[1][d] = (mask >> d) & 1 ? 1n : 0n;
    }

    for (let len = 2; len <= N; len++) {
      for (let d = 0; d <= 9; d++) {
        if (!((mask >> d) & 1)) {
          dp[len][d] = 0n;
          continue;
        }

        let val = 0n;
        if (d > 0 && (mask >> (d - 1)) & 1) {
          val += dp[len - 1][d - 1];
        }
        if (d < 9 && (mask >> (d + 1)) & 1) {
          val += dp[len - 1][d + 1];
        }
        dp[len][d] = val;
      }
    }

    let count = 0n;
    for (let len = 10; len < N; len++) {
      for (let d = 1; d <= 9; d++) {
        if ((mask >> d) & 1) {
          count += dp[len][d];
        }
      }
    }

    let tight = true;
    for (let i = 0; i < N; i++) {
      const limit = parseInt(K[i]);
      const startD = i === 0 ? 1 : 0;
      const rem = N - 1 - i;

      for (let d = startD; d < limit; d++) {
        if (!((mask >> d) & 1)) continue;

        if (i > 0) {
          const prev = parseInt(K[i - 1]);
          if (Math.abs(d - prev) !== 1) continue;
        }

        if (rem === 0) {
          count += 1n;
        } else {
          if (d > 0 && (mask >> (d - 1)) & 1) count += dp[rem][d - 1];
          if (d < 9 && (mask >> (d + 1)) & 1) count += dp[rem][d + 1];
        }
      }

      if (!((mask >> limit) & 1)) {
        tight = false;
        break;
      }
      if (i > 0) {
        const prev = parseInt(K[i - 1]);
        if (Math.abs(limit - prev) !== 1) {
          tight = false;
          break;
        }
      }
    }

    const bits = countSetBits(mask);
    if ((10 - bits) % 2 === 0) {
      ans += count;
    } else {
      ans -= count;
    }
  }

  console.log(ans.toString());
};

function countSetBits(n) {
  let c = 0;
  while (n) {
    n &= n - 1;
    c++;
  }
  return c;
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