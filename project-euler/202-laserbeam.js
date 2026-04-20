/*
 * Laserbeam
 * Time Complexity: O(Q * (F * 2^P))
 * Space Complexity: O(P)
 */

function mulMod(a, b, m) {
  return (a * b) % m;
};

function power(base, exp, mod) {
  let res = 1n;
  base %= mod;

  while (exp > 0n) {
    if (exp % 2n === 1n) res = mulMod(res, base, mod);
    base = mulMod(base, base, mod);
    exp /= 2n;
  }

  return res;
};

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

    let x = power(a, d, n);
    if (x === 1n || x === n - 1n) continue;

    let composite = true;

    for (let r = 1n; r < s; r++) {
      x = mulMod(x, x, n);
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
  return b === 0n ? a : gcd(b, a % b);
};

function pollardRho(n) {
  if (n === 1n) return 1n;
  if (n % 2n === 0n) return 2n;

  let x = 2n,
    y = 2n,
    d = 1n,
    c = 1n;

  let f = (x) => (mulMod(x, x, n) + c) % n;

  while (d === 1n) {
    x = f(x);
    y = f(f(y));
    d = gcd(x > y ? x - y : y - x, n);

    if (d === n) {
      x = BigInt(Math.floor(Math.random() * 1000) + 2);
      y = x;
      c = BigInt(Math.floor(Math.random() * 1000) + 1);
      d = 1n;
    }
  }

  return d;
};

function getDistinctPrimeFactors(n) {
  if (n === 1n) return [];
  let factors = new Set();
  let queue = [n];

  while (queue.length > 0) {
    let curr = queue.pop();
    if (curr === 1n) continue;

    if (isPrime(curr)) {
      factors.add(curr);
      continue;
    }

    let factor = pollardRho(curr);
    queue.push(factor);
    queue.push(curr / factor);
  }

  return Array.from(factors);
};

function processData(input) {
  const lines = input.trim().split(/\s+/);
  let lineIdx = 0;
  const Q = parseInt(lines[lineIdx++]);

  for (let i = 0; i < Q; i++) {
    const nStr = lines[lineIdx++];
    if (!nStr) break;

    const n = BigInt(nStr);

    if (n % 2n === 0n) {
      console.log(0);
      continue;
    }

    const S = (n + 3n) / 2n;

    if (S % 3n === 0n) {
      console.log(0);
      continue;
    }

    const remS = Number(S % 3n);
    const k = remS === 1 ? 2 : 1;

    const primes = getDistinctPrimeFactors(S);

    let ans = 0n;
    const totalSubsets = 1 << primes.length;

    for (let mask = 0; mask < totalSubsets; mask++) {
      let d = 1n;
      let setBits = 0;

      for (let j = 0; j < primes.length; j++) {
        if ((mask >> j) & 1) {
          d *= primes[j];
          setBits++;
        }
      }

      const mu = setBits % 2 === 0 ? 1n : -1n;

      const d_mod3 = Number(d % 3n);
      let target_rem = (k * d_mod3) % 3;

      const M = S / d;

      let count = 0n;
      if (target_rem !== 0 && M >= BigInt(target_rem)) {
        count = (M - BigInt(target_rem)) / 3n + 1n;
      }

      ans += mu * count;
    }

    console.log(ans.toString());
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