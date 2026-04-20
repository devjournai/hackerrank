/**
 * Repunit Non-Factors
 * Time Complexity: O(L_max + T * log T)
 * Space Complexity: O(L_max)
 */

const fs = require("fs");

function processData() {
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

  const queries = new Array(T);
  let maxL = 0;
  for (let i = 0; i < T; i++) {
    const l = readInt();
    queries[i] = { L: l, index: i, ans: 0 };
    if (l > maxL) maxL = l;
  }

  queries.sort((a, b) => a.L - b.L);

  const sieve = new Uint8Array(maxL + 1);
  const limitSq = Math.floor(Math.sqrt(maxL));

  sieve[0] = 1;
  sieve[1] = 1;
  for (let i = 2; i <= limitSq; i++) {
    if (sieve[i] === 0) {
      for (let j = i * i; j <= maxL; j += i) {
        sieve[j] = 1;
      }
    }
  }

  function modPow(base, exp, mod) {
    let res = 1;
    let b = base;
    let e = exp;
    while (e > 0) {
      if ((e & 1) === 1) res = (res * b) % mod;
      b = (b * b) % mod;
      e >>= 1;
    }
    return res;
  }

  let currentSum = 0;
  let qIdx = 0;

  for (let p = 2; p <= maxL; p++) {
    while (qIdx < T && queries[qIdx].L <= p) {
      queries[qIdx].ans = currentSum;
      qIdx++;
    }

    if (sieve[p] === 0) {
      let isFactor = false;

      if (p === 2 || p === 3 || p === 5) {
        isFactor = false;
      } else {
        const E = modPow(10, 30, p - 1);

        const check = modPow(10, E, p);

        if (check === 1) {
          isFactor = true;
        }
      }

      if (!isFactor) {
        currentSum += p;
      }
    }
  }

  while (qIdx < T) {
    queries[qIdx].ans = currentSum;
    qIdx++;
  }

  const results = new Array(T);
  for (let i = 0; i < T; i++) {
    results[queries[i].index] = queries[i].ans;
  }

  console.log(results.join("\n"));
};

if (require.main === module) {
  processData();
};