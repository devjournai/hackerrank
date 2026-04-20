/**
 * Triangles containing the origin
 * Time Complexity: O(r log r)
 * Space Complexity: O(r)
 */

function processData(input) {
  const r = parseInt(input.trim(), 10);
  const MOD = 1000000007n;

  const rSq = BigInt(r) * BigInt(r);
  const limitSq = rSq - 1n;

  const INV2 = 500000004n;
  const INV6 = 166666668n;

  function modNC2(n) {
    if (n < 2n) return 0n;
    let num = ((n % MOD) * ((n - 1n) % MOD)) % MOD;
    return (num * INV2) % MOD;
  }

  function modNC3(n) {
    if (n < 3n) return 0n;
    let num = ((n % MOD) * ((n - 1n) % MOD)) % MOD;
    num = (num * ((n - 2n) % MOD)) % MOD;
    return (num * INV6) % MOD;
  }

  function getLatticeCount(M) {
    if (M < 0n) return 0n;
    const limit = Math.floor(Math.sqrt(Number(M)));
    let count = 0n;
    for (let x = 1; x <= limit; x++) {
      let ySq = Number(M) - x * x;
      let y = Math.floor(Math.sqrt(ySq));
      count += BigInt(y);
    }
    return 1n + 4n * BigInt(limit) + 4n * count;
  }

  const memoP = new Map();

  function getPrimitiveCount(M) {
    if (M <= 0n) return 0n;
    if (memoP.has(M)) return memoP.get(M);

    let count = getLatticeCount(M) - 1n;
    const limit = Math.floor(Math.sqrt(Number(M)));

    for (let k = 2; k <= limit; k++) {
      let nextM = M / BigInt(k * k);
      count = (count - getPrimitiveCount(nextM)) % MOD;
    }

    if (count < 0n) count += MOD;
    memoP.set(M, count);
    return count;
  }

  let N = getLatticeCount(limitSq) - 1n;

  let totalTriangles = modNC3(N);
  let badTriangles = 0n;

  for (let w = 1; w < r; w++) {
    let maxD = limitSq / BigInt(w * w);
    let minD = limitSq / BigInt((w + 1) * (w + 1));

    if (maxD <= 0n) continue;

    let numPrimitiveRays =
      (getPrimitiveCount(maxD) - getPrimitiveCount(minD)) % MOD;

    if (numPrimitiveRays < 0n) numPrimitiveRays += MOD;
    if (numPrimitiveRays === 0n) continue;

    let bigW = BigInt(w);

    let S = N - 2n * bigW;
    S = S / 2n;

    let term1 = modNC3(bigW);
    term1 = (term1 + modNC2(bigW) * (S % MOD)) % MOD;
    term1 = (term1 + (bigW % MOD) * modNC2(S)) % MOD;

    badTriangles = (badTriangles + numPrimitiveRays * term1) % MOD;

    let term2 = ((bigW % MOD) * (bigW % MOD)) % MOD;
    let remainder = (N - 2n * bigW) % MOD;
    term2 = (term2 * remainder) % MOD;

    let edgeCases = (2n * (bigW % MOD)) % MOD;
    edgeCases = (edgeCases * modNC2(bigW)) % MOD;

    term2 = (term2 + edgeCases) % MOD;

    let numPairs = (numPrimitiveRays * INV2) % MOD;
    badTriangles = (badTriangles + numPairs * term2) % MOD;
  }

  let ans = (totalTriangles - badTriangles) % MOD;
  if (ans < 0n) ans += MOD;

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