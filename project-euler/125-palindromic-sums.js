/**
 * Palindromic Sums
 * Time Complexity ≈ O(2e6 per test)
 * Space Complexity: O(#palindromes)
*/

function isPalindrome(n) {
  const s = String(n);
  let i = 0,
    j = s.length - 1;
  while (i < j) {
    if (s[i++] !== s[j--]) return false;
  }
  return true;
};

function sumSquares(a, d, k) {
  return (
    k * a * a + a * d * k * (k - 1) + (d * d * (k * (k - 1) * (2 * k - 1))) / 6
  );
};

function processData(input) {
  const data = input.trim().split(/\s+/).map(Number);
  let idx = 0;
  const T = data[idx++];

  let out = [];

  for (let tc = 0; tc < T; tc++) {
    const N = data[idx++];
    const d = data[idx++];

    const found = new Set();

    for (let k = 2; ; k++) {
      let minSum = sumSquares(1, d, k);
      if (minSum >= N) break;

      for (let a = 1; ; a++) {
        const s = sumSquares(a, d, k);
        if (s >= N) break;

        if (isPalindrome(s)) {
          found.add(s);
        }
      }
    }

    let total = 0;
    for (let v of found) total += v;
    out.push(String(total));
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