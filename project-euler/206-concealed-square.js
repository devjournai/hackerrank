/*
 * Concealed Square
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */

function processData(input) {
  const tokens = input.trim().split(/\s+/);
  if (!tokens.length) return;

  const n = parseInt(tokens[0]);

  const constraints = new Int8Array(2 * n).fill(-1);

  for (let i = 1; i <= n; i++) {
    const val = parseInt(tokens[i]);
    const pos = (n - i) * 2;
    constraints[pos] = val;
  }

  const digits = new Int8Array(n);
  let found = false;

  function dfs(k, carry) {
    if (found) return;

    if (k === n) {
      let currentCarry = carry;
      let valid = true;

      for (let pos = n; pos < 2 * n - 1; pos++) {
        let sum = currentCarry;

        const startI = Math.max(0, pos - (n - 1));
        const endI = Math.min(n - 1, pos);

        for (let i = startI; i <= endI; i++) {
          sum += digits[i] * digits[pos - i];
        }

        const digit = sum % 10;
        currentCarry = Math.floor(sum / 10);

        if (constraints[pos] !== -1 && constraints[pos] !== digit) {
          valid = false;
          break;
        }
      }

      if (valid && currentCarry === 0) {
        let res = "";
        for (let i = n - 1; i >= 0; i--) res += digits[i];
        console.log(res);
        found = true;
      }
      return;
    }

    let partialSum = carry;
    for (let i = 1; i < k; i++) {
      partialSum += digits[i] * digits[k - i];
    }

    let startD = k === n - 1 ? 1 : 0;
    let endD = k === n - 1 ? 3 : 9;

    for (let d = startD; d <= endD; d++) {
      let currentSum = partialSum;

      if (k === 0) currentSum += d * d;
      else currentSum += 2 * digits[0] * d;

      const calculatedDigit = currentSum % 10;

      if (constraints[k] !== -1 && calculatedDigit !== constraints[k]) {
        continue;
      }

      digits[k] = d;
      dfs(k + 1, Math.floor(currentSum / 10));
      if (found) return;
    }
  }

  dfs(0, 0);
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