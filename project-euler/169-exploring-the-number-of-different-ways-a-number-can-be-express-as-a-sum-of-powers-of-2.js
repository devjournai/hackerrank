/**
 * Exploring the Number of Different Ways a Number Can Be Express as a Sum of Powers of 2
 * Time Complexity: O(log n)
 * Space Complexity: O(log n)
 */

function processData(input) {
  const cleanInput = input.trim();
  if (!cleanInput) return;

  const n = BigInt(cleanInput.split(/\s+/)[0]);
  const memo = new Map();

  memo.set(0n, 1n);
  memo.set(1n, 1n);

  function getWays(val) {
    if (memo.has(val)) {
      return memo.get(val);
    }

    let res;
    const half = val / 2n;

    if (val % 2n === 0n) {
      res = getWays(half) + getWays(half - 1n);
    } else {
      res = getWays(half);
    }

    memo.set(val, res);
    return res;
  }

  const result = getWays(n);
  console.log(result.toString());
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