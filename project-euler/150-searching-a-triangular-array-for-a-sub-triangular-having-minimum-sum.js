/**
 * Searching a Triangular Array for a Sub-Triangle Having Minimum Sum
 * Time Complexity: O(N^3)
 * Space Complexity: O(N^3)
 */

const fs = require("fs");

function solve() {
  const buffer = fs.readFileSync(0);
  let bufferIdx = 0;

  function readString() {
    let start = bufferIdx;
    while (bufferIdx < buffer.length && buffer[bufferIdx] <= 32) {
      bufferIdx++;
    }
    if (bufferIdx >= buffer.length) return null;
    start = bufferIdx;
    while (bufferIdx < buffer.length && buffer[bufferIdx] > 32) {
      bufferIdx++;
    }
    return buffer.toString("utf8", start, bufferIdx);
  }

  function readInt() {
    const s = readString();
    return s ? parseInt(s, 10) : null;
  }

  const N = readInt();
  const K = readInt();

  if (N === null) return;

  const prefix = new Array(N);

  for (let r = 0; r < N; r++) {
    const rowLen = r + 1;
    const pRow = new Int32Array(rowLen + 1);
    pRow[0] = 0;
    let runningSum = 0;
    for (let c = 0; c < rowLen; c++) {
      const val = readInt();
      runningSum += val;
      pRow[c + 1] = runningSum;
    }
    prefix[r] = pRow;
  }

  const totalSubTriangles = Math.floor((N * (N + 1) * (N + 2)) / 6);
  const sums = new Int32Array(totalSubTriangles);
  let count = 0;

  for (let r = 0; r < N; r++) {
    for (let c = 0; c <= r; c++) {
      let currentSum = 0;
      const maxHeight = N - r;

      for (let h = 1; h <= maxHeight; h++) {
        const rowIdx = r + h - 1;
        const sliceSum = prefix[rowIdx][c + h] - prefix[rowIdx][c];

        currentSum += sliceSum;
        sums[count++] = currentSum;
      }
    }
  }

  sums.sort();
  let out = "";
  const limit = Math.min(K, totalSubTriangles);
  for (let i = 0; i < limit; i++) {
    out += sums[i] + "\n";
  }
  process.stdout.write(out);
};

if (require.main === module) {
  solve();
};