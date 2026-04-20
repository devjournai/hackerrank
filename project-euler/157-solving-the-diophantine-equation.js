/**
 * Solving the Diophantine Equation
 * Time Complexity: O(T * r1 * r2 * P^(1/4))
 * Space Complexity: O(1)
 */

function processData(input) {
  const lines = input.trim().split(/\s+/);
  let ptr = 0;

  if (lines.length === 0 || lines[0] === "") return;

  const T = parseInt(lines[ptr++]);

  function modPow(base, exp, mod) {
    let res = 1n;
    base %= mod;
    while (exp > 0n) {
      if (exp % 2n === 1n) res = (res * base) % mod;
      base = (base * base) % mod;
      exp /= 2n;
    }
    return res;
  }

  function isPrime(n) {
    if (n < 2n) return false;
    if (n === 2n || n === 3n) return true;
    if (n % 2n === 0n) return false;

    let d = n - 1n;
    let s = 0n;
    while (d % 2n === 0n) {
      d /= 2n;
      s++;
    }

    const bases = [2n, 3n, 5n, 7n, 11n, 13n, 17n, 19n, 23n, 29n, 31n, 37n];
    for (let a of bases) {
      if (n <= a) break;
      let x = modPow(a, d, n);
      if (x === 1n || x === n - 1n) continue;
      let composite = true;
      for (let r = 1n; r < s; r++) {
        x = (x * x) % n;
        if (x === n - 1n) {
          composite = false;
          break;
        }
      }
      if (composite) return false;
    }
    return true;
  }

  function pollardRho(n) {
    if (n === 1n) return 1n;
    if (n % 2n === 0n) return 2n;
    if (isPrime(n)) return n;

    let x = 2n,
      y = 2n,
      d = 1n,
      c = 1n;
    const f = (x, c, n) => (x * x + c) % n;

    while (d === 1n) {
      x = f(x, c, n);
      y = f(f(y, c, n), c, n);
      let absVal = x > y ? x - y : y - x;
      let a = absVal,
        b = n;
      while (b > 0n) {
        let t = b;
        b = a % b;
        a = t;
      }
      d = a;
      if (d === n) {
        x = BigInt(Math.floor(Math.random() * 100)) + 2n;
        y = x;
        c++;
        d = 1n;
      }
    }
    return d;
  }

  function getTau(n) {
    if (n <= 1n) return 1n;
    let factors = {};
    let stack = [n];
    while (stack.length > 0) {
      let curr = stack.pop();
      if (curr === 1n) continue;
      if (isPrime(curr)) {
        factors[curr] = (factors[curr] || 0) + 1;
        continue;
      }
      let factor = pollardRho(curr);
      stack.push(factor);
      stack.push(curr / factor);
    }
    let count = 1n;
    for (let p in factors) count *= BigInt(factors[p] + 1);
    return count;
  }

  for (let t = 0; t < T; t++) {
    if (ptr >= lines.length) break;
    const p1 = BigInt(lines[ptr++]);
    const r1 = parseInt(lines[ptr++]);
    const p2 = BigInt(lines[ptr++]);
    const r2 = parseInt(lines[ptr++]);

    let totalSolutions = 0n;
    const getConfigs = (r) => {
      const configs = [];
      configs.push({ u: 0, v: 0 });
      for (let i = 1; i <= r; i++) configs.push({ u: i, v: 0 });
      for (let i = 1; i <= r; i++) configs.push({ u: 0, v: i });
      return configs;
    };

    const configs1 = getConfigs(r1);
    const configs2 = getConfigs(r2);

    const p1Pows = [1n];
    const p2Pows = [1n];
    for (let i = 1; i <= r1; i++) p1Pows.push(p1Pows[i - 1] * p1);
    for (let i = 1; i <= r2; i++) p2Pows.push(p2Pows[i - 1] * p2);

    for (let c1 of configs1) {
      for (let c2 of configs2) {
        const u1 = c1.u,
          v1 = c1.v;
        const u2 = c2.u,
          v2 = c2.v;

        const x = p1Pows[u1] * p2Pows[u2];
        const y = p1Pows[v1] * p2Pows[v2];

        if (x > y) continue;

        let sum = x + y;
        let A = 0;
        let B = 0;

        while (sum % p1 === 0n) {
          sum /= p1;
          A++;
        }
        while (sum % p2 === 0n) {
          sum /= p2;
          B++;
        }

        const tauZ = getTau(sum);
        const L1 = Math.max(1, u1 + v1);
        const L2 = Math.max(1, u2 + v2);

        if (L1 > r1 || L2 > r2) continue;
        const calcSeries = (L, R, uv, Exp) => {
          const count = BigInt(R - L + 1);
          const first = BigInt(L - uv + Exp + 1);
          const last = BigInt(R - uv + Exp + 1);
          return (count * (first + last)) / 2n;
        };

        const sum1 = calcSeries(L1, r1, u1 + v1, A);
        const sum2 = calcSeries(L2, r2, u2 + v2, B);

        totalSolutions += tauZ * sum1 * sum2;
      }
    }

    console.log(totalSolutions.toString());
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