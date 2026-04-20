/**
 * Using Up to One Million Tiles, How Many Different Hollow Square Laminae Can Be Formed?
 * Time Complexity: O(√n)
 * Space Complexity: O(1)
 */

function processData(input) {
  const n = BigInt(input.trim());

  let count = 0n;

  for (let k = 1n; 4n * k * (k + 1n) <= n; k++) {
    const maxB = n / (4n * k) - k;
    if (maxB > 0n) {
      count += maxB;
    }
  }

  console.log(count.toString());
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