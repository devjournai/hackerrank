/**
 * Large Repunit Factors
 * Time Complexity: O(MAX_PRIME * log(log(MAX_PRIME)) + T * k * log(a))
 * Space Complexity: O(MAX_PRIME)
 */

function processData(input) {
}

process.stdin.resume();
process.stdin.setEncoding("ascii");
let _input = "";
process.stdin.on("data", function (input) {
  _input += input;
});
process.stdin.on("end", function () {
  processData(_input);
});