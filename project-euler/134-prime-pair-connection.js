/**
 * Prime Pair Connection
 * Time Complexity: O(sqrt(R_max) + T * ((R-L) * log(log(R)) + (R-L)/log(R) * log(p)))
 * Space Complexity: O(sqrt(R_max) + (R-L))
 */

const fs = require("fs");

function solve() {
  const buffer = fs.readFileSync(0);
  let bufferIdx = 0;

  function readString() {
    let start = bufferIdx;
    while (bufferIdx < buffer.length && buffer[bufferIdx] <= 32) {
      bufferIdx++;
    }
    if (bufferIdx >= buffer.length) return null;
    start = bufferIdx;
    while (bufferIdx < buffer.length && buffer[bufferIdx] > 32) {
      bufferIdx++;
    }
    return buffer.toString("utf8", start, bufferIdx);
  }

  function readInt() {
    const s = readString();
    return s ? parseInt(s, 10) : null;
  }

  const T = readInt();
  if (T === null) return;

  const LIMIT_SQRT = 32000;
  const smallPrimes = [];
  const isSmallComposite = new Uint8Array(LIMIT_SQRT + 1);
  for (let i = 2; i <= LIMIT_SQRT; i++) {
    if (isSmallComposite[i] === 0) {
      smallPrimes.push(i);
      for (let j = i * i; j <= LIMIT_SQRT; j += i) {
        isSmallComposite[j] = 1;
      }
    }
  }

  function modPow(base, exp, mod) {
    let res = 1n;
    let b = base % mod;
    let e = exp;
    while (e > 0n) {
      if ((e & 1n) === 1n) res = (res * b) % mod;
      b = (b * b) % mod;
      e >>= 1n;
    }
    return res;
  }

  function modInverse(n, mod) {
    return modPow(n, mod - 2n, mod);
  }

  for (let t = 0; t < T; t++) {
    const L = readInt();
    const R = readInt();

    const rangeLen = R - L + 1000;
    const sieve = new Uint8Array(rangeLen + 1);

    for (const p of smallPrimes) {
      let start = Math.ceil(L / p) * p;
      if (start < L) start += p;
      if (start === p) start += p;

      let idx = start - L;

      if (idx <= rangeLen) {
        for (let j = idx; j <= rangeLen; j += p) {
          sieve[j] = 1;
        }
      }
    }

    const primes = [];
    for (let i = 0; i <= rangeLen; i++) {
      const val = L + i;
      if (val === 1) continue;
      if (sieve[i] === 0) {
        primes.push(val);
      }
    }

    let totalSum = 0n;

    for (let i = 0; i < primes.length - 1; i++) {
      const p1 = primes[i];
      const p2 = primes[i + 1];

      if (p1 < L) continue;
      if (p1 > R) break;
      let tempP1 = p1;
      let mult = 1n;
      while (tempP1 > 0) {
        mult *= 10n;
        tempP1 = Math.floor(tempP1 / 10);
      }

      const p1_bn = BigInt(p1);
      const p2_bn = BigInt(p2);

      const invMult = modInverse(mult, p2_bn);
      const target = (p2_bn - (p1_bn % p2_bn)) % p2_bn;

      const x = (target * invMult) % p2_bn;

      const S = x * mult + p1_bn;
      totalSum += S;
    }

    console.log(totalSum.toString());
  }
};

if (require.main === module) {
  solve();
};