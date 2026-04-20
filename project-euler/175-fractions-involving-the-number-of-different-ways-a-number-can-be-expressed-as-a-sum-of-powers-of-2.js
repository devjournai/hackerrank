/**
 * Fractions Involving the Number of Different Ways a Number Can be Expressed as a Sum of Powers of 2
 * Time Complexity: O(log N)
 * Space Complexity: O(log N)
 */

function sternTree(x, y) {
  if (y === 0n) return [];
  const m = x / y;
  const n = x % y;
  return [m, ...sternTree(y, n)];
};

function findRat(x, y) {
  const k = sternTree(x, y);
  const l = k.length;
  if (l % 2 === 1) {
    const last = k[l - 1];
    return k.slice(0, l - 1).concat([last - 1n, 1n]);
  } else {
    return k;
  }
};

function p175(x, y) {
  const filtered = findRat(x, y).filter((v) => v !== 0n);
  const reversed = filtered.reverse();
  const strs = reversed.map((v) => v.toString());
  return strs.join(",");
};

function processData(input) {
  const [pStr, qStr] = input.trim().split(" ");
  const p = BigInt(pStr);
  const q = BigInt(qStr);
  console.log(p175(p, q));
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
