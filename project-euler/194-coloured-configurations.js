/**
 * Coloured Configurations
 * Time Complexity: O()
 * Space Complexity: O()
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