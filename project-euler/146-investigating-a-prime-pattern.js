/**
 * Investigating a Prime Pattern
 * Time Complexity: O(L log log L + Candidates * k * log^3(N))
 * Space Complexity: O(L) for sieve
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

  const bases = [
    2n,
    325n,
    9375n,
    28178n,
    450775n,
    9780504n,
    1795265022n
  ];

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

  function isPrime(n) {
    if (n < 2n) return false;
    if (n === 2n || n === 3n) return true;
    if (n % 2n === 0n || n % 3n === 0n) return false;

    const nm1 = n - 1n;
    let d = nm1;
    let s = 0n;
    while ((d & 1n) === 0n) {
      d >>= 1n;
      s++;
    }

    for (const a of bases) {
      if (a >= n) break;

      let x = modPow(a, d, n);
      if (x === 1n || x === nm1) continue;

      let witness = true;
      for (let r = 1n; r < s; r++) {
        x = (x * x) % n;
        if (x === nm1) {
          witness = false;
          break;
        }
      }
      if (witness) return false;
    }
    return true;
  }

  for (let t = 0; t < T; t++) {
    const L = readInt();
    const A = [];
    for (let i = 0; i < 6; i++) {
      A.push(readInt());
    }

    A.sort((a, b) => a - b);

    const setA = new Set(A);
    const gaps = [];
    for (let g = A[0] + 1; g < A[A.length - 1]; g++) {
      if (!setA.has(g)) {
        gaps.push(g);
      }
    }

    const isValid = new Uint8Array(L);
    isValid.fill(1);

    const sievePrimes = [
      2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61,
    ];

    for (const p of sievePrimes) {
      const badResidues = [];
      for (let r = 0; r < p; r++) {
        const r2 = (r * r) % p;
        for (const a of A) {
          if ((r2 + a) % p === 0) {
            badResidues.push(r);
            break;
          }
        }
      }

      for (const r of badResidues) {
        for (let n = r; n < L; n += p) {
          isValid[n] = 0;
        }
      }
    }

    let totalSum = 0n;

    for (let n = 0; n < L; n++) {
      if (isValid[n] === 1 || n <= 100) {
        const n2 = BigInt(n) * BigInt(n);

        let allPrimes = true;
        for (const a of A) {
          if (!isPrime(n2 + BigInt(a))) {
            allPrimes = false;
            break;
          }
        }

        if (allPrimes) {
          let consecutive = true;
          for (const g of gaps) {
            if (isPrime(n2 + BigInt(g))) {
              consecutive = false;
              break;
            }
          }

          if (consecutive) {
            totalSum += BigInt(n);
          }
        }
      }
    }

    console.log(totalSum.toString());
  }
};

if (require.main === module) {
  solve();
};