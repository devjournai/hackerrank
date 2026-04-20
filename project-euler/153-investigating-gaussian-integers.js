/**
 * Investigating Gaussian Integers
 * Time Complexity: O(N log N)
 * Space Complexity: O(CACHE_LIMIT)
 */

function processData(input) {
  const N = parseInt(input.trim(), 10);
  if (isNaN(N)) return;

  const CACHE_LIMIT = 2000000;
  const sigmaSumCache = new BigInt64Array(CACHE_LIMIT + 1);

  for (let i = 1; i <= CACHE_LIMIT; i++) {
    const v = BigInt(i);
    for (let j = i; j <= CACHE_LIMIT; j += i) {
      sigmaSumCache[j] += v;
    }
  }

  for (let i = 1; i <= CACHE_LIMIT; i++) {
    sigmaSumCache[i] += sigmaSumCache[i - 1];
  }

  function getSumSigma(n) {
    if (n <= CACHE_LIMIT) return sigmaSumCache[n];

    let sum = 0n;
    let l = 1;
    while (l <= n) {
      const val = Math.floor(n / l);
      if (val === 0) break;
      const r = Math.floor(n / val);
      const count = BigInt(r - l + 1);
      const rangeSum = (BigInt(l + r) * count) / 2n;
      sum += rangeSum * BigInt(val);
      l = r + 1;
    }
    return sum;
  }

  function gcd(a, b) {
    while (b !== 0) {
      const t = b;
      b = a % b;
      a = t;
    }
    return a;
  }

  let totalSum = getSumSigma(N);
  const maxA = Math.floor(Math.sqrt(N));

  for (let a = 1; a <= maxA; a++) {
    for (let b = 1; b <= a; b++) {
      const val = a * a + b * b;
      if (val > N) break;
      if ((a & 1) === 0 && (b & 1) === 0) continue;
      if (gcd(a, b) !== 1) continue;

      const limit = Math.floor(N / val);
      const sigmaVal = getSumSigma(limit);

      let pairTerm = BigInt(a + b);
      if (a !== b) pairTerm *= 2n;

      totalSum += pairTerm * sigmaVal;
    }
  }

  console.log(totalSum.toString());
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