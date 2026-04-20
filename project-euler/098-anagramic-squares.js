/**
 * Anagramic Squares
 * Time Complexity: O(M log M)
 * Space Complexity: O(M)
 */

function processData(input) {
  const N = Number(input.trim());

  const low = BigInt(10) ** BigInt(N - 1);
  const high = BigInt(10) ** BigInt(N) - 1n;

  const start = BigInt(Math.ceil(Math.sqrt(Number(low))));
  const end = BigInt(Math.floor(Math.sqrt(Number(high))));

  const map = new Map();

  for (let i = start; i <= end; i++) {
    const sq = (i * i).toString();
    if (sq.length !== N) continue;

    const key = sq.split("").sort().join("");
    if (!map.has(key)) map.set(key, []);
    map.get(key).push(sq);
  }

  let bestSize = 0;
  let bestMax = "0";

  for (const arr of map.values()) {
    if (arr.length >= 2) {
      const maxVal = arr.reduce((a, b) => a > b ? a : b);
      if (
        arr.length > bestSize ||
        (arr.length === bestSize && maxVal > bestMax)
      ) {
        bestSize = arr.length;
        bestMax = maxVal;
      }
    }
  }

  console.log(bestMax);
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