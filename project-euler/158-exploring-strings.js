/**
 * Exploring Strings
 * Time Complexity: O(N^2)
 * Space Complexity: O(N)
 */

function processData(input) {
  const lines = input.trim().split("\n");
  if (lines.length < 2) return;

  const firstLine = lines[0].trim().split(/\s+/);
  const N = parseInt(firstLine[0], 10);
  const q = parseInt(firstLine[1], 10);

  const queries = lines[1].trim().split(/\s+/).map(Number);

  const max_p = new Array(N).fill(0n);

  let prevRow = [1n];

  let combinations = BigInt(N);

  max_p[0] = combinations;

  for (let n = 2; n <= N; n++) {
    const currentRow = [];

    combinations = (combinations * BigInt(N - n + 1)) / BigInt(n);
    for (let m = 0; m < n; m++) {
      let term1 = 0n;
      let term2 = 0n;

      if (m < prevRow.length) {
        term1 = BigInt(m + 1) * prevRow[m];
      }

      if (m - 1 >= 0 && m - 1 < prevRow.length) {
        term2 = BigInt(n - m) * prevRow[m - 1];
      }

      const Anm = term1 + term2;
      currentRow.push(Anm);

      const p_nm = combinations * Anm;

      if (p_nm > max_p[m]) {
        max_p[m] = p_nm;
      }
    }

    prevRow = currentRow;
  }

  let totalSum = 0n;
  for (let i = 0; i < q; i++) {
    const m = queries[i];
    if (m < max_p.length) {
      totalSum += max_p[m];
    }
  }

  console.log(totalSum.toString());
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