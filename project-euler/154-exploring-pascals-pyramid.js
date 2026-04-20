/**
 * Exploring Pascal's Pyramid
 * Time Complexity: O(n^2)
 * Space Complexity: O(n)
 */

function processData(input) {
  const lines = input.trim().split(/\s+/);
  if (lines.length < 5) return;

  let ptr = 0;
  const n = parseInt(lines[ptr++], 10);
  const p0 = parseInt(lines[ptr++], 10);
  const a0 = parseInt(lines[ptr++], 10);
  const p1 = parseInt(lines[ptr++], 10);
  const a1 = parseInt(lines[ptr++], 10);

  const factVal0 = new Int32Array(n + 1);
  const factVal1 = new Int32Array(n + 1);

  for (let i = 1; i <= n; i++) {
    let c = 0;
    let t = i;
    while (t % p0 === 0) {
      c++;
      t = (t / p0) | 0;
    }
    factVal0[i] = factVal0[i - 1] + c;
  }

  for (let i = 1; i <= n; i++) {
    let c = 0;
    let t = i;
    while (t % p1 === 0) {
      c++;
      t = (t / p1) | 0;
    }
    factVal1[i] = factVal1[i - 1] + c;
  }

  let count = 0;
  const totalVal0 = factVal0[n];
  const totalVal1 = factVal1[n];

  for (let i = 0; i <= n; i++) {
    const limit0 = totalVal0 - factVal0[i] - a0;
    const limit1 = totalVal1 - factVal1[i] - a1;

    if (limit0 < 0 || limit1 < 0) continue;

    const range = n - i;
    const mid = range >> 1;
    let localCount = 0;

    for (let j = 0; j <= mid; j++) {
      const k = range - j;
      if (
        factVal0[j] + factVal0[k] <= limit0 &&
        factVal1[j] + factVal1[k] <= limit1
      ) {
        localCount += j === k ? 1 : 2;
      }
    }
    count += localCount;
  }

  console.log(count);
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