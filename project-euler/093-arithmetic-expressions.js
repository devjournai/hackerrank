/**
 * Arithmetic Expressions
 * Time Complexity: O(3^m × K²)
 * Space Complexity: O(2^m × K)
 */

function processData(input) {
  const lines = input.trim().split(/\s+/).map(Number);
  const m = lines[0];
  const nums = lines.slice(1);

  const n = nums.length;
  const MAXMASK = 1 << n;

  const dp = Array.from({ length: MAXMASK }, () => new Set());

  for (let i = 0; i < n; i++) {
    dp[1 << i].add(nums[i]);
  }

  for (let mask = 1; mask < MAXMASK; mask++) {
    if ((mask & (mask - 1)) === 0) continue;
    for (let sub = (mask - 1) & mask; sub > 0; sub = (sub - 1) & mask) {
      const A = sub;
      const B = mask ^ A;
      if (B === 0) continue;

      for (const a of dp[A]) {
        for (const b of dp[B]) {
          dp[mask].add(a + b);
          dp[mask].add(a - b);
          dp[mask].add(b - a);
          dp[mask].add(a * b);
          if (b !== 0) dp[mask].add(a / b);
          if (a !== 0) dp[mask].add(b / a);
        }
      }
    }
  }

  const full = dp[MAXMASK - 1];
  const good = new Set();

  for (const v of full) {
    if (v > 0 && Math.abs(v - Math.round(v)) < 1e-9) {
      good.add(Math.round(v));
    }
  }

  let ans = 1;
  while (good.has(ans)) ans++;
  console.log(ans - 1);
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