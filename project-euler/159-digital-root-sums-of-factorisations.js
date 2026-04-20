/**
 * Digital Root Sums of Factorisations
 * Time Complexity: O(maxN · log maxN)
 * Space Complexity: O(maxN)
 */

function processData(input) {
  let pos = 0;
  const len = input.length;

  function readInt() {
    while (pos < len && input.charCodeAt(pos) <= 32) pos++;
    if (pos >= len) return null;

    let res = 0;
    while (pos < len && input.charCodeAt(pos) > 32) {
      res = res * 10 + (input.charCodeAt(pos) - 48);
      pos++;
    }
    return res;
  }

  const T = readInt();
  if (T === null) return;

  const queries = new Int32Array(T);
  let maxN = 0;
  for (let i = 0; i < T; i++) {
    const n = readInt();
    queries[i] = n;
    if (n > maxN) maxN = n;
  }

  const mdrs = new Int32Array(maxN + 1);

  for (let i = 2; i <= maxN; i++) {
    mdrs[i] = ((i - 1) % 9) + 1;
  }

  for (let i = 2; i * 2 <= maxN; i++) {
    const val_i = mdrs[i];
    for (let j = i * 2, k = 2; j <= maxN; j += i, k++) {
      const candidate = val_i + mdrs[k];
      if (candidate > mdrs[j]) {
        mdrs[j] = candidate;
      }
    }
  }

  const ans = new Float64Array(maxN + 1);
  let currentSum = 0;

  for (let i = 2; i <= maxN; i++) {
    currentSum += mdrs[i];
    ans[i] = currentSum;
  }

  const output = [];
  for (let i = 0; i < T; i++) {
    output.push(ans[queries[i]]);
  }

  console.log(output.join("\n"));
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