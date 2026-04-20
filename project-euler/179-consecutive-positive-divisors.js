/**
 * Consecutive Positive Divisors
 * Time Complexity: O(N log N + Q)
 * Space Complexity: O(N)
 */

function processData(input) {
  const data = input.trim().split(/\s+/).map(Number);
  const t = data[0];
  const queries = data.slice(1);

  const MAX = 10_000_000;

  const divisors = new Uint16Array(MAX + 2);

  for (let i = 1; i <= MAX + 1; i++) {
    for (let j = i; j <= MAX + 1; j += i) {
      divisors[j]++;
    }
  }

  const prefix = new Uint32Array(MAX + 2);
  for (let i = 2; i <= MAX; i++) {
    prefix[i] = prefix[i - 1];
    if (divisors[i] === divisors[i + 1]) {
      prefix[i]++;
    }
  }

  let output = [];
  for (let i = 0; i < t; i++) {
    const k = queries[i];
    output.push(prefix[k - 1]);
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