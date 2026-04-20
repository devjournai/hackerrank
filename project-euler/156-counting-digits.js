/**
 * Counting Digits
 * Time Complexity: O(b * log_b(Limit))
 * Space Complexity: O(log_b(Limit))
 */

function processData(input) {
  const lines = input.trim().split("\n");
  const firstLine = lines[0].trim().split(/\s+/);
  const base = parseInt(firstLine[0]);
  const digits = lines[1].trim().split(/\s+/).map(Number);

  const LIMIT = BigInt(Math.pow(base, base + 1));
  const BASE_BI = BigInt(base);

  let totalSum = 0n;

  function countDigit(n, d) {
    if (n < 0n) return 0n;
    let s = n.toString(base);
    let count = 0n;
    let len = s.length;

    for (let i = 0; i < len; i++) {
      let digit = parseInt(s[i], base);
      let powerOfBase = BASE_BI ** BigInt(len - 1 - i);

      let prefix = i === 0 ? 0n : BigInt(parseInt(s.substring(0, i), base));
      let currentDigit = BigInt(digit);

      count += prefix * powerOfBase;

      if (currentDigit > BigInt(d)) {
        count += powerOfBase;
      } else if (currentDigit === BigInt(d)) {
        let suffix =
          i === len - 1 ? 0n : BigInt(parseInt(s.substring(i + 1), base));
        count += suffix + 1n;
      }
    }
    return count;
  }

  function solveForDigit(d, min, max, fMin, fMax) {
    if (fMin > max || fMax < min) return 0n;

    if (min === max) {
      return fMin === min ? min : 0n;
    }

    let mid = (min + max) / 2n;
    let fMid = countDigit(mid, d);

    let solutions = 0n;
    solutions += solveForDigit(d, min, mid, fMin, fMid);

    let fMidPlus1 = countDigit(mid + 1n, d);
    solutions += solveForDigit(d, mid + 1n, max, fMidPlus1, fMax);

    return solutions;
  }

  for (let d of digits) {
    let fMin = countDigit(0n, d);
    let fMax = countDigit(LIMIT, d);
    totalSum += solveForDigit(d, 0n, LIMIT, fMin, fMax);
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