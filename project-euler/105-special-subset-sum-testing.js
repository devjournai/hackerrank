/**
 * Special Subset Sum Testing
 * Time Complexity: O(2^N)
 * Space Complexity: O(2^N)
 */

function processData(input) {
  const lines = input.trim().split(/\s+/);
  let ptr = 0;
  const T = parseInt(lines[ptr++], 10);

  for (let t = 0; t < T; t++) {
    const n = parseInt(lines[ptr++], 10);
    const A = [];
    for (let i = 0; i < n; i++) {
      A.push(parseInt(lines[ptr++], 10));
    }

    if (isSpecialSumSet(A)) {
      console.log("YES");
    } else {
      console.log("NO");
    }
  }
};

function isSpecialSumSet(A) {
  const n = A.length;
  A.sort((a, b) => a - b);

  const prefixSum = new Int32Array(n + 1);
  prefixSum[0] = 0;
  for (let i = 0; i < n; i++) {
    prefixSum[i + 1] = prefixSum[i] + A[i];
  }

  for (let k = 1; k <= Math.floor((n - 1) / 2); k++) {
    const minSumLargerSize = prefixSum[k + 1];
    const maxSumSmallerSize = prefixSum[n] - prefixSum[n - k];

    if (minSumLargerSize <= maxSumSmallerSize) {
      return false;
    }
  }

  const seenSums = new Set();
  seenSums.add(0);
  let currentSums = [0];

  for (let i = 0; i < n; i++) {
    const val = A[i];
    const count = currentSums.length;
    for (let j = 0; j < count; j++) {
      const newSum = currentSums[j] + val;
      if (seenSums.has(newSum)) {
        return false;
      }
      seenSums.add(newSum);
      currentSums.push(newSum);
    }
  }

  return true;
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