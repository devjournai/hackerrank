/**
 * Largest Exponential
 * Time Complexity: O(N log N)
 * Space Complexity: O(N)
 */

function processData(input) {
  const data = input.trim().split(/\s+/);
  let idx = 0;

  const N = Number(data[idx++]);

  const arr = [];

  for (let i = 0; i < N; i++) {
    const B = Number(data[idx++]);
    const E = Number(data[idx++]);
    arr.push([B, E, i]);
  }

  const K = Number(data[idx++]);

  arr.sort((a, b) => {
    const v1 = a[1] * Math.log(a[0]);
    const v2 = b[1] * Math.log(b[0]);
    return v1 - v2;
  });

  const result = arr[K - 1];
  console.log(result[0] + " " + result[1]);
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