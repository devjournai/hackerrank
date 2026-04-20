/**
 * The Hyperexponentiation of a Number
 * Time Complexity: O(m^(1/4))
 * Space Complexity: O(log m)
 */

function processData(input) {
  const tokens = input.trim().split(/\s+/);
  let ptr = 0;

  if (ptr >= tokens.length) return;
  const Q = Number(tokens[ptr++]);

  for (let i = 0; i < Q; i++) {
    const a = BigInt(tokens[ptr++]);
    const b = BigInt(tokens[ptr++]);
    const m = BigInt(tokens[ptr++]);
    console.log(solve(a, b, m).toString());
  }

  function solve(a, b, m) {
    if (m === 1n) return 0n;
    if (a === 1n) return 1n;
    if (b === 1n) return a % m;

    const prevB = b - 1n;

    if (isLarge(a, prevB)) {
      const phi = getPhi(m);
      const exponent = solve(a, prevB, phi);
      return power(a, exponent + phi, m);
    } else {
      const trueVal = computeTower(a, prevB);
      return power(a, trueVal, m);
    }
  }

  function isLarge(a, b) {
    if (b >= 5n) return true;
    if (b === 4n) return a >= 2n;
    if (b === 3n) {
      if (a >= 3n) return true;
      return false;
    }
    if (b === 2n) {
      if (a >= 4n) return true;
      return false;
    }
    if (b === 1n) return a >= 60n;
    return false;
  }

  function computeTower(a, b) {
    if (b === 1n) return a;
    if (b === 2n) return a ** a;
    if (b === 3n) return a ** (a ** a);
    if (b === 4n) return a ** (a ** (a ** a));
    return a;
  }

  function power(base, exp, mod) {
    let res = 1n;
    base %= mod;
    while (exp > 0n) {
      if (exp % 2n === 1n) res = (res * base) % mod;
      base = (base * base) % mod;
      exp /= 2n;
    }
    return res;
  }

  function getPhi(n) {
    let result = n;
    const factors = getFactors(n);

    const distinctFactors = [...new Set(factors)];

    for (const p of distinctFactors) {
      result = (result / p) * (p - 1n);
    }
    return result;
  }

  function getFactors(n) {
    if (n === 1n) return [];
    if (millerRabin(n)) return [n];

    if (n % 2n === 0n) return [2n, ...getFactors(n / 2n)];
    if (n % 3n === 0n) return [3n, ...getFactors(n / 3n)];
    if (n % 5n === 0n) return [5n, ...getFactors(n / 5n)];

    const factor = pollardRho(n);
    return [...getFactors(factor), ...getFactors(n / factor)];
  }

  function gcd(a, b) {
    while (b) {
      [a, b] = [b, a % b];
    }
    return a;
  }

  function pollardRho(n) {
    if (n === 1n) return 1n;
    if (n % 2n === 0n) return 2n;

    let x = 2n,
      y = 2n,
      d = 1n,
      c = 1n;
    const f = (x) => (x * x + c) % n;

    while (d === 1n) {
      x = f(x);
      y = f(f(y));
      d = gcd(x > y ? x - y : y - x, n);
      if (d === n) {
        x = BigInt(Math.floor(Math.random() * 100)) + 2n;
        y = x;
        c = BigInt(Math.floor(Math.random() * 100)) + 1n;
        d = 1n;
      }
    }
    return d;
  }

  function millerRabin(n) {
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
    for (const a of bases) {
      if (n <= a) break;
      if (checkComposite(n, a, d, s)) return false;
    }
    return true;
  }

  function checkComposite(n, a, d, s) {
    let x = power(a, d, n);
    if (x === 1n || x === n - 1n) return false;
    for (let r = 1n; r < s; r++) {
      x = (x * x) % n;
      if (x === n - 1n) return false;
    }
    return true;
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