/**
 * Maximum product of parts
 * Time Complexity: O(N log N + Q)
 * Space Complexity: O(N)
 */

function processData(input) {
  function gcd(a, b) {
    a = Math.abs(a);
    b = Math.abs(b);
    while (b !== 0) {
      let t = b;
      b = a % b;
      a = t;
    }
    return a;
  }
 
  function getKmax(N) {
    let low = 2;
    let high = 2 * N;
    while (low < high) {
      let mid = Math.floor((low + high) / 2);
      let base = 1 + 1.0 / mid;
      let log_val = Math.log(base);
      let pow_val = Math.exp(mid * log_val);
      let thresh = (mid + 1) * pow_val;
      if (N <= thresh) {
        high = mid;
      } else {
        low = mid + 1;
      }
    }
    return low;
  }
  
  const MAXN = 1000000;
  let prefix = new Array(MAXN + 1).fill(0);
  for (let N = 1; N <= MAXN; N++) {
    if (N < 5) {
      prefix[N] = prefix[N - 1];
      continue;
    }
    let k = getKmax(N);
    let g = gcd(N, k);
    let l = k / g;
    let temp = l;
    while (temp % 2 === 0) temp /= 2;
    while (temp % 5 === 0) temp /= 5;
    let D = temp === 1 ? -N : N;
    prefix[N] = prefix[N - 1] + D;
  }
  let lines = input.trim().split(/\r?\n/);
  let q = parseInt(lines[0]);
  let idx = 1;
  for (let i = 0; i < q; i++) {
    let n = parseInt(lines[idx++]);
    console.log(prefix[n]);
  }
};

process.stdin.resume();
process.stdin.setEncoding("ascii");
_input = "";
process.stdin.on("data", function (input) {
  _input += input;
});
process.stdin.on("end", function () {
  processData(_input);
});