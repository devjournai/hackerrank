/**
 * Cross Hatched Triangles
 * Time Complexity: O(1) - Closed form solution
 * Space Complexity: O(1)
 */

function processData(input) {
  const n = BigInt(input.trim());

  const term1 = 1678n * n ** 3n;
  const term2 = 3117n * n ** 2n;
  const term3 = 88n * n;

  const d1 = (n % 2n) * 345n;
  const d2 = (n % 3n) * 320n;
  const d3 = (n % 4n) * 90n;

  const polyMod5 = (n ** 3n - n ** 2n + n) % 5n;
  const d4 = polyMod5 * 288n;

  const delta = d1 + d2 + d3 + d4;
  const numerator = term1 + term2 + term3 - delta;
  const result = numerator / 240n;

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