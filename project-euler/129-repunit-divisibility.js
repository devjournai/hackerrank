/**
 * Repunit Divisibility
 * Time Complexity: O(T * n^0.25 * log n)
 * Space Complexity: O(log n)
 */

const BigIntZero = 0n;
const BigIntOne = 1n;
const BigIntTwo = 2n;

function power(base, exp, mod) {
  let res = 1n;
  base %= mod;
  while (exp > 0n) {
    if (exp & 1n) res = (res * base) % mod;
    base = (base * base) % mod;
    exp >>= 1n;
  }
  return res;
};

function isPrimeMR(n) {
  if (n < 2n) return false;
  if (n === 2n || n === 3n) return true;
  if (n % 2n === 0n) return false;

  let d = n - 1n;
  let s = 0n;
  while ((d & 1n) === 0n) {
    d >>= 1n;
    s++;
  }

  const bases = [2n, 3n, 5n, 7n, 11n, 13n, 17n, 19n, 23n];
  for (const a of bases) {
    if (n <= a) break;
    let x = power(a, d, n);
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
};

function gcd(a, b) {
  while (b > 0n) {
    let temp = b;
    b = a % b;
    a = temp;
  }
  return a;
};

function pollardRho(n) {
  if (n === 1n) return 1n;
  if (n % 2n === 0n) return 2n;
  let x = 2n;
  let y = 2n;
  let d = 1n;
  let c = 1n;
  const f = (val) => (val * val + c) % n;

  while (d === 1n) {
    x = f(x);
    y = f(f(y));
    let diff = x > y ? x - y : y - x;
    d = gcd(diff, n);
    if (d === n) {
      x = BigInt(Math.floor(Math.random() * Number(n - 2n)) + 2);
      y = x;
      c = BigInt(Math.floor(Math.random() * Number(n - 1n)) + 1);
      d = 1n;
    }
  }
  return d;
};

function getFactors(n, factors) {
  if (n === 1n) return;
  if (isPrimeMR(n)) {
    factors.set(n, (factors.get(n) || 0n) + 1n);
    return;
  }
  let divisor = pollardRho(n);
  getFactors(divisor, factors);
  getFactors(n / divisor, factors);
};

function getPhi(n) {
  const factors = new Map();
  getFactors(n, factors);
  let result = n;
  for (const [p, exponent] of factors) {
    result = (result / p) * (p - 1n);
  }
  return result;
};

function getPrimeFactorsOnly(n) {
  const factors = new Map();
  getFactors(n, factors);
  return factors;
};

function solve(nStr) {
  const n = BigInt(nStr);

  const M = 9n * n;
  const phiM = getPhi(M);

  let k = phiM;
  const phiFactors = getPrimeFactorsOnly(phiM);

  for (const [p, count] of phiFactors) {
    while (k % p === 0n) {
      const nextK = k / p;
      if (power(10n, nextK, M) === 1n) {
        k = nextK;
      } else {
        break;
      }
    }
  }

  return k.toString();
};

function processData(input) {
  const lines = input.trim().split(/\s+/);
  if (lines.length === 0) return;

  const T = parseInt(lines[0], 10);
  let ptr = 1;

  for (let i = 0; i < T; i++) {
    const nStr = lines[ptr++];
    console.log(solve(nStr));
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