/*
 * Investigating the Behaviour of a Recursively Defined Sequence
 * Time Complexity: O(1)
 * Space Complexity: O(1)
 */

function processData(input) {
  const tokens = input.trim().split(/\s+/);
  const u0 = parseFloat(tokens[0]);
  const b = parseFloat(tokens[1]);

  let u_curr = u0;
  const limit = 10000;

  for (let i = 0; i < limit; i++) {
    u_curr = Math.floor(Math.pow(2, b - u_curr * u_curr)) * 1e-9;
  }

  let u_next = Math.floor(Math.pow(2, b - u_curr * u_curr)) * 1e-9;

  console.log(u_curr + u_next);
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