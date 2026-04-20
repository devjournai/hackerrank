/*
 * Obtuse Angled Triangles
 * Time Complexity: O(√n)
 * Space Complexity: O(1)
 */

function processData(input) {
  const data = input.trim().split(/\s+/);
  if (data.length < 4) return;

  const r = BigInt(data[0]);
  const a = BigInt(data[1]);
  const b = BigInt(data[2]);
  const n = BigInt(data[3]);

  function floorDiv(num, den) {
    if (den < 0n) {
      num = -num;
      den = -den;
    }
    if (num >= 0n) return num / den;
    return (num - den + 1n) / den;
  }

  function bigSqrt(val) {
    if (val < 0n) return 0n;
    if (val < 2n) return val;
    let x = val;
    let y = (x + 1n) / 2n;
    while (y < x) {
      x = y;
      y = (x + val / x) / 2n;
    }
    return x;
  }

  function countLinearPoints(limit) {
    let uMax = limit > r ? r : limit;
    const uMin = -r;
    if (uMax < uMin) return 0n;

    const len = uMax - uMin + 1n;
    const same = (len + 1n) / 2n;
    const diff = len / 2n;

    return same * (r + 1n) + diff * r;
  }

  function countCollinear(low, high) {
    let start = low > -r ? low : -r;
    let end = high < r ? high : r;
    if (start > end) return 0n;

    if (start % 2n !== 0n) start++;
    if (end % 2n !== 0n) end--;

    if (start > end) return 0n;
    return (end - start) / 2n + 1n;
  }

  const num1 = 2n * a;
  let limit1;

  if (num1 % b === 0n) limit1 = num1 / b - 1n;
  else limit1 = floorDiv(num1, b);

  const num2 = 4n * n * b - 2n * a;
  const limit2 = floorDiv(num2, b) + 1n;

  let points1 = countLinearPoints(limit1);
  let points2 = countLinearPoints(-limit2);

  let coll1 = countCollinear(-r - 1n, limit1);
  let coll2 = countCollinear(limit2, r + 1n);

  const distNum = n * b - a;
  const circleNum = 2n * distNum * distNum;

  let R2;
  const denom = b * b;

  if (circleNum % denom === 0n) R2 = circleNum / denom - 1n;
  else R2 = circleNum / denom;

  let circlePoints = 0n;
  let circleColl = 0n;

  if (R2 >= 0n) {
    const Rint = bigSqrt(R2);
    const Xdiag = bigSqrt(R2 / 2n);

    let wedge = 0n;

    if (Xdiag >= 1n) {
      wedge += (Xdiag * (Xdiag + 1n)) / 2n - Xdiag;
    }

    let yCur = Xdiag;
    while ((yCur + 1n) * (yCur + 1n) <= R2 - (Xdiag + 1n) * (Xdiag + 1n)) {
      yCur++;
    }

    for (let x = Xdiag + 1n; x <= Rint; x++) {
      const rem = R2 - x * x;
      while (yCur * yCur > rem) yCur--;
      wedge += yCur;
    }

    circlePoints = 1n + 4n * Rint + 4n * Xdiag + 8n * wedge;
    circleColl = 2n * Xdiag + 1n;
  }

  const ans = points1 - coll1 + (points2 - coll2) + (circlePoints - circleColl);

  console.log(ans.toString());
};

process.stdin.resume();
process.stdin.setEncoding("ascii");
let input = "";
process.stdin.on("data", (chunk) => {
  input += chunk;
});
process.stdin.on("end", () => {
  processData(input);
});