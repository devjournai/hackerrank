/**
 * Almost Equilateral Triangles
 * Time Complexity: O(T * log(MaxLimit))
 * Space Complexity: O(log(MaxLimit))
 */

function processData(input) {
  const lines = input.trim().split(/\s+/);
  let lineIdx = 0;

  if (lineIdx >= lines.length) return;
  const T = parseInt(lines[lineIdx++], 10);
  const limit = 10n ** 18n;
  const perimeters = [];
  let x_prev = 2n;
  let x_curr = 4n;

  while (true) {
    let x_next = 4n * x_curr - x_prev;
    let p = 0n;
    if (x_next % 3n === 2n) {
      p = x_next + 2n;
    } else {
      p = x_next - 2n;
    }

    if (p > limit) break;
    if (p > 0n) {
      perimeters.push(p);
    }

    x_prev = x_curr;
    x_curr = x_next;
  }

  const prefixSums = [0n];
  let currentSum = 0n;
  for (const p of perimeters) {
    currentSum += p;
    prefixSums.push(currentSum);
  }

  for (let t = 0; t < T; t++) {
    if (lineIdx >= lines.length) break;
    const N = BigInt(lines[lineIdx++]);
    let count = 0;
    while (count < perimeters.length && perimeters[count] <= N) {
      count++;
    }

    console.log(prefixSums[count].toString());
  }
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