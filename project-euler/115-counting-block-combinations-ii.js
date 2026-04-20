/**
 * Counting block combinations II
 * Time Complexity: O(T * K) - K is small (iterations beyond 2m)
 * Space Complexity: O(K) - Storage for values beyond 2m
 */

function bigIntSqrt(n) {
  if (n < 0n) throw new Error("negative");
  if (n < 2n) return n;
  let x = n;
  let y = (x + 1n) >> 1n;
  while (y < x) {
    x = y;
    y = (x + n / x) >> 1n;
  }
  return x;
};

function solve(m, X) {
  const limit2m = 2n * m;

  const calcQuad = (i) => {
    const k = i - m;
    const term = (k + 1n) * (k + 2n) / 2n;
    return 1n + term;
  };

  const val2m = calcQuad(limit2m);

  if (val2m > X) {
    const target = 2n * (X - 1n);
    let k = bigIntSqrt(target);
    if ((k + 1n) * (k + 2n) > target) {
      while (k > 0n && k * (k + 1n) > target) {
        k--;
      }
    }
    else {
      while ((k + 1n) * (k + 2n) <= target) {
        k++;
      }
    }
    return m + k;
  }

  let w_prev = val2m;
  let w_prev2 = calcQuad(limit2m - 1n);

  const storage = [];

  let curr = limit2m + 1n;

  while (true) {
    const lag_idx = curr - m - 1n;
    let w_lag;

    if (lag_idx <= limit2m) {
      w_lag = calcQuad(lag_idx);
    } else {
      const idx = Number(lag_idx - (limit2m + 1n));
      w_lag = storage[idx];
    }

    const w_curr = 2n * w_prev - w_prev2 + w_lag;

    if (w_curr > X) {
      return curr;
    }

    storage.push(w_curr);

    w_prev2 = w_prev;
    w_prev = w_curr;
    curr++;
  }
};

function processData(input) {
  const tokens = input.trim().split(/\s+/);
  if (tokens.length === 0) return;

  const T = parseInt(tokens[0]);
  let ptr = 1;

  for (let i = 0; i < T; i++) {
    const m = BigInt(tokens[ptr++]);
    const X = BigInt(tokens[ptr++]);
    console.log(solve(m, X).toString());
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