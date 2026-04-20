/**
 * Counting the Number of Hollow Square Laminae That Can Form One, Two, Three Distinct Arrangements
 * Time Complexity: O(K log K)
 * Space Complexity: O(K)
 */

function processData(input) {
  const lines = input.trim().split(/\s+/).map(Number);
  const T = lines[0];
  const queries = lines.slice(1);

  let MAX_K = 0;
  for (let i = 0; i < T; i++) {
    if (queries[i] > MAX_K) MAX_K = queries[i];
  }

  const count = new Array(MAX_K + 1).fill(0);

  for (let k = 1; 4 * k * (k + 1) <= MAX_K; k++) {
    for (let b = 1; ; b++) {
      const t = 4 * k * (b + k);
      if (t > MAX_K) break;
      count[t]++;
    }
  }

  const prefix = Array.from({ length: 11 }, () => new Array(MAX_K + 1).fill(0));

  for (let i = 1; i <= MAX_K; i++) {
    for (let n = 1; n <= 10; n++) {
      prefix[n][i] = prefix[n][i - 1];
    }
    if (count[i] >= 1 && count[i] <= 10) {
      prefix[count[i]][i]++;
    }
  }

  let out = [];
  let idx = 0;

  for (let i = 0; i < T; i++) {
    const K = queries[idx++];
    let ans = 0;
    for (let n = 1; n <= 10; n++) {
      ans += prefix[n][K];
    }
    out.push(ans.toString());
  }

  console.log(out.join("\n"));
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