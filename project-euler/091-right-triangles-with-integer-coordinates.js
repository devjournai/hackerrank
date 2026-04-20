/**
 * Right Triangles with Integer Coordinates
 * Time Complexity: O(N² log N)
 * Space Complexity: O(1)
 */

function processData(input) {
  const N = Number(input.trim());

  function gcd(a, b) {
    while (b !== 0) {
      const t = a % b;
      a = b;
      b = t;
    }
    return a;
  }

  let t = 0;

  for (let x = 1; x <= N; x++) {
    for (let y = 1; y < N; y++) {
      const m = gcd(x, y);

      t += Math.min(
        Math.floor((x * m) / y),
        Math.floor((m * (N - y)) / x)
      );
    }
  }

  const result = 2 * t + 3 * N * N;
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