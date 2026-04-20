/**
 * Digit power sum
 * Time Complexity: O(MaxSum * MaxPower * log(Limit))
 * Space Complexity: O(Number of Interesting Numbers)
 */

const LIMIT = 10n ** 100n;

function getDigitSum(n, b) {
  let sum = 0n;
  let temp = n;
  const bBig = BigInt(b);
  while (temp > 0n) {
    sum += temp % bBig;
    temp /= bBig;
  }
  return sum;
};

function processData(input) {
  const B = parseInt(input.trim(), 10);
  const results = [];
  const maxDigits = Math.ceil(100 * Math.log(10) / Math.log(B));
  const maxPossibleSum = maxDigits * (B - 1);

  for (let s = 2; s <= maxPossibleSum; s++) {
    let sBig = BigInt(s);
    let current = sBig;
    while (true) {
      current *= sBig;
      if (current >= LIMIT) break;
      if (current >= BigInt(B)) {
        if (getDigitSum(current, B) === sBig) {
          results.push(current);
        }
      }
    }
  }

  results.sort((a, b) => {
    if (a < b) return -1;
    if (a > b) return 1;
    return 0;
  });

  const uniqueResults = [];
  if (results.length > 0) {
    uniqueResults.push(results[0]);
    for (let i = 1; i < results.length; i++) {
      if (results[i] !== results[i - 1]) {
        uniqueResults.push(results[i]);
      }
    }
  }

  console.log(uniqueResults.join(" "));
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