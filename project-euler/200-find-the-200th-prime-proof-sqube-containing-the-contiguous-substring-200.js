/*
 * Find the 200th Prime Proof Sqube containing the contiguous sub-string 200
 * Time Complexity: O(P^2 + C log C + K * D * log N)
 * Space Complexity: O(P + C)
 */

function processData(input) {
  const lines = input.trim().split(/\s+/);
  let lineIdx = 0;

  const s = lines[lineIdx++];
  const qCount = parseInt(lines[lineIdx++], 10);
  const queries = [];
  let maxK = 0;

  for (let i = 0; i < qCount; i++) {
    const k = parseInt(lines[lineIdx++], 10);
    queries.push(k);
    if (k > maxK) maxK = k;
  }

  const LIMIT = 1000000000000000;
  const SIEVE_LIMIT = 11200000;
  const primes = sieve(SIEVE_LIMIT);

  const candidates = [];
  const pLen = primes.length;

  for (let i = 0; i < pLen; i++) {
    const q = primes[i];
    const q3 = q * q * q;

    if (q3 * 4 > LIMIT) break;

    const maxP2 = Math.floor(LIMIT / q3);

    for (let j = 0; j < pLen; j++) {
      const p = primes[j];
      if (p === q) continue;

      const p2 = p * p;
      if (p2 > maxP2) break;

      const sqube = p2 * q3;

      if (sqube.toString().includes(s)) {
        candidates.push(sqube);
      }
    }
  }

  candidates.sort((a, b) => a - b);

  const validSqubes = [];

  for (let i = 0; i < candidates.length; i++) {
    if (validSqubes.length >= maxK) break;

    const cand = candidates[i];
    if (isPrimeProof(cand)) {
      validSqubes.push(cand);
    }
  }

  for (const k of queries) {
    console.log(validSqubes[k - 1]);
  }
}

function sieve(limit) {
  const isComposite = new Uint8Array(limit + 1);
  const primes = [];
  isComposite[0] = 1;
  isComposite[1] = 1;

  for (let i = 2; i <= limit; i++) {
    if (isComposite[i] === 0) {
      primes.push(i);
      for (let j = i * i; j <= limit; j += i) {
        isComposite[j] = 1;
      }
    }
  }
  return primes;
}

function isPrimeMR(n) {
  if (n < 2) return false;
  if (n === 2 || n === 3) return true;
  if (n % 2 === 0) return false;

  const nBig = BigInt(n);
  const dVal = nBig - 1n;
  let s = 0n;
  let d = dVal;

  while (d % 2n === 0n) {
    d /= 2n;
    s++;
  }

  const bases = [2, 3, 5, 7, 11, 13, 17, 19, 23];

  for (const a of bases) {
    if (n <= a) break;
    if (checkComposite(BigInt(a), d, nBig, s)) return false;
  }
  return true;
}

function checkComposite(a, d, n, s) {
  let x = modPow(a, d, n);
  if (x === 1n || x === n - 1n) return false;

  for (let r = 1n; r < s; r++) {
    x = (x * x) % n;
    if (x === n - 1n) return false;
  }
  return true;
}

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

function isPrimeProof(n) {
  const str = n.toString();
  const len = str.length;

  const powers = new Array(len);
  for (let i = 0; i < len; i++) {
    powers[i] = Math.pow(10, len - 1 - i);
  }

  for (let i = 0; i < len; i++) {
    const originalDigit = parseInt(str[i], 10);
    const powerOf10 = powers[i];

    for (let d = 0; d <= 9; d++) {
      if (d === originalDigit) continue;
      if (i === 0 && d === 0 && len > 1) continue;

      const newNum = n - originalDigit * powerOf10 + d * powerOf10;

      if (newNum < 2) continue;
      if (newNum % 2 === 0 && newNum !== 2) continue;
      if (newNum % 3 === 0 && newNum !== 3) continue;
      if (newNum % 5 === 0 && newNum !== 5) continue;

      if (isPrimeMR(newNum)) return false;
    }
  }
  return true;
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