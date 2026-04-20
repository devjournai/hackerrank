/**
 * Investigating Ulam Sequences
 * Time Complexity:  O(k)
 * Space Complexity: O(2^(2n))
 */

function processData(input) {
  const lines = input.trim().split("\n");
  const firstLine = lines[0].trim().split(/\s+/);
  const n = parseInt(firstLine[0], 10);
  const k = parseInt(firstLine[1], 10);

  if (k === 1) {
    console.log(2);
    return;
  }

  const u2 = 2 * n + 1;
  if (k === 2) {
    console.log(u2);
    return;
  }

  const E = 4 * n + 4;
  let count = 2;
  let ans = u2;
  let even_found = false;

  let X = 1;
  const mask = (1 << (2 * n + 2)) - 1;

  const history = new Map();

  while (count < k) {
    ans += 2;

    const first = X & 1;
    const last = (X >> (2 * n + 1)) & 1;
    const is_term = first ^ last;

    X = ((X << 1) & mask) | is_term;

    if (is_term) {
      if (!even_found && ans > E) {
        count++;
        if (count === k) {
          console.log(E);
          return;
        }
        even_found = true;
      }

      count++;
      if (count === k) {
        console.log(ans);
        return;
      }
    }

    if (even_found) {
      if (history.has(X)) {
        const prev = history.get(X);
        const period_len = count - prev.count;
        const period_val_diff = ans - prev.ans;

        const remaining = k - count;
        const jumps = Math.floor(remaining / period_len);

        if (jumps > 0) {
          count += jumps * period_len;
          ans += jumps * period_val_diff;
          history.clear();
        }
      } else {
        history.set(X, { count: count, ans: ans });
      }
    }
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