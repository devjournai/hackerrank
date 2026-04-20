/**
 * Triominoes
 * Time Complexity: O(n * m * 2^(2n))
 * Space Complexity: O(n * m * 2^(2n))
 */

function processData(input) {
  const lines = input.trim().split(/\s+/);
  if (lines.length < 2) return;

  const n = parseInt(lines[0]);
  const m = parseInt(lines[1]);

  if ((n * m) % 3 !== 0) {
    console.log("0");
    return;
  }

  const MOD = 1000000007n;
  const MAX_MASK = 1 << (2 * n + 1);
  const memo = new Int32Array((n * m + 1) * MAX_MASK).fill(-1);

  function solve(idx, mask) {
    if (idx === n * m) {
      return mask === 0 ? 1n : 0n;
    }

    const key = idx * MAX_MASK + mask;
    if (memo[key] !== -1) {
      return BigInt(memo[key]);
    }

    let res = 0n;

    if (mask & 1) {
      res = solve(idx + 1, mask >> 1);
    } else {
      const r = idx % n;
      const c = Math.floor(idx / n);

      if (r + 2 < n) {
        if (!((mask >> 1) & 1) && !((mask >> 2) & 1)) {
          res = (res + solve(idx + 1, (mask | 7) >> 1)) % MOD;
        }
      }

      if (c + 2 < m) {
        if (!((mask >> n) & 1) && !((mask >> (2 * n)) & 1)) {
          const newMask = mask | 1 | (1 << n) | (1 << (2 * n));
          res = (res + solve(idx + 1, newMask >> 1)) % MOD;
        }
      }

      if (r + 1 < n && c + 1 < m) {
        if (!((mask >> 1) & 1) && !((mask >> n) & 1)) {
          const newMask = mask | 3 | (1 << n);
          res = (res + solve(idx + 1, newMask >> 1)) % MOD;
        }
      }

      if (r + 1 < n && c + 1 < m) {
        if (!((mask >> n) & 1) && !((mask >> (n + 1)) & 1)) {
          const newMask = mask | 1 | (1 << n) | (1 << (n + 1));
          res = (res + solve(idx + 1, newMask >> 1)) % MOD;
        }
      }

      if (r + 1 < n && c + 1 < m) {
        if (!((mask >> 1) & 1) && !((mask >> (n + 1)) & 1)) {
          const newMask = mask | 3 | (1 << (n + 1));
          res = (res + solve(idx + 1, newMask >> 1)) % MOD;
        }
      }

      if (r > 0 && c + 1 < m) {
        if (!((mask >> (n - 1)) & 1) && !((mask >> n) & 1)) {
          const newMask = mask | 1 | (1 << (n - 1)) | (1 << n);
          res = (res + solve(idx + 1, newMask >> 1)) % MOD;
        }
      }
    }

    memo[key] = Number(res);
    return res;
  }

  console.log(solve(0, 0).toString());
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