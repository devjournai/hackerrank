/**
 * Investigating numbers with few repeating digits
 * Time Complexity: O(K log K)
 * Space Complexity: O(K)
 */

const MOD = 1000000007n;

const NTT_PRIMES = [998244353n, 167772161n, 469762049n];
const NTT_ROOTS = [3n, 3n, 3n];
const MAX_SIZE = 262144;
const BUFFERS = [
  new BigUint64Array(MAX_SIZE),
  new BigUint64Array(MAX_SIZE),
  new BigUint64Array(MAX_SIZE),
];

let REV_CACHE = new Uint32Array(MAX_SIZE);
let CURRENT_REV_BITS = -1;

function getRev(n, bits) {
  if (bits === CURRENT_REV_BITS) return;
  CURRENT_REV_BITS = bits;
  for (let i = 0; i < n; i++) {
    REV_CACHE[i] = (REV_CACHE[i >> 1] >> 1) | ((i & 1) << (bits - 1));
  }
}

function power(base, exp, mod) {
  let res = 1n;
  base %= mod;
  while (exp > 0n) {
    if (exp & 1n) res = (res * base) % mod;
    base = (base * base) % mod;
    exp >>= 1n;
  }
  return res;
}

function modInverse(n, mod) {
  return power(n, mod - 2n, mod);
}

function ntt(a, n, invert, mod, root) {
  let bits = 0;
  while (1 << bits < n) bits++;
  getRev(n, bits);

  for (let i = 0; i < n; i++) {
    if (i < REV_CACHE[i]) {
      const temp = a[i];
      a[i] = a[REV_CACHE[i]];
      a[REV_CACHE[i]] = temp;
    }
  }

  for (let len = 2; len <= n; len <<= 1) {
    let wlen = power(root, (mod - 1n) / BigInt(len), mod);
    if (invert) wlen = modInverse(wlen, mod);

    const len2 = len >> 1;
    for (let i = 0; i < n; i += len) {
      let w = 1n;
      for (let j = 0; j < len2; j++) {
        const u = a[i + j];
        const v = (a[i + j + len2] * w) % mod;
        a[i + j] = (u + v) % mod;

        let diff = u - v;
        if (diff < 0n) diff += mod;
        a[i + j + len2] = diff;

        w = (w * wlen) % mod;
      }
    }
  }

  if (invert) {
    const nInv = modInverse(BigInt(n), mod);
    for (let i = 0; i < n; i++) {
      a[i] = (a[i] * nInv) % mod;
    }
  }
}

function multiplyPoly(polyA, lenA, polyB, lenB, outLimit) {
  let size = 1;
  while (size < lenA + lenB) size <<= 1;

  const bufA = BUFFERS[0];
  const bufB = BUFFERS[1];

  const finalPoly = new BigUint64Array(outLimit);

  const m1 = NTT_PRIMES[0],
    m2 = NTT_PRIMES[1],
    m3 = NTT_PRIMES[2];
  const M = m1 * m2 * m3;
  const M1 = m2 * m3;
  const y1 = modInverse(M1, m1);
  const w1 = ((M1 % M) * y1) % M;

  const M2 = m1 * m3;
  const y2 = modInverse(M2, m2);
  const w2 = ((M2 % M) * y2) % M;

  const M3 = m1 * m2;
  const y3 = modInverse(M3, m3);
  const w3 = ((M3 % M) * y3) % M;

  const results = [
    new BigUint64Array(size),
    new BigUint64Array(size),
    new BigUint64Array(size),
  ];

  for (let i = 0; i < 3; i++) {
    const p = NTT_PRIMES[i];
    const r = NTT_ROOTS[i];

    bufA.fill(0n, 0, size);
    bufB.fill(0n, 0, size);
    bufA.set(polyA.subarray(0, lenA));
    bufB.set(polyB.subarray(0, lenB));

    ntt(bufA, size, false, p, r);
    ntt(bufB, size, false, p, r);

    for (let j = 0; j < size; j++) {
      bufA[j] = (bufA[j] * bufB[j]) % p;
    }

    ntt(bufA, size, true, p, r);
    results[i].set(bufA.subarray(0, size));
  }

  const loopLimit = Math.min(size, outLimit);
  for (let i = 0; i < loopLimit; i++) {
    const r1 = results[0][i];
    const r2 = results[1][i];
    const r3 = results[2][i];

    let val = (r1 * w1 + r2 * w2 + r3 * w3) % M;
    finalPoly[i] = val % MOD;
  }

  return finalPoly;
}

function processData(input) {
  const lines = input.trim().split(/\s+/);
  let ptr = 0;

  const m = parseInt(lines[ptr++]);
  const t = parseInt(lines[ptr++]);

  const MAX_K = 100005;

  const fact = new BigUint64Array(MAX_K);
  const invFact = new BigUint64Array(MAX_K);

  fact[0] = 1n;
  for (let i = 1; i < MAX_K; i++) fact[i] = (fact[i - 1] * BigInt(i)) % MOD;
  invFact[MAX_K - 1] = modInverse(fact[MAX_K - 1], MOD);
  for (let i = MAX_K - 2; i >= 0; i--)
    invFact[i] = (invFact[i + 1] * BigInt(i + 1)) % MOD;

  const lenP = Math.min(m + 1, MAX_K);
  const P = new BigUint64Array(lenP);
  for (let i = 0; i < lenP; i++) P[i] = invFact[i];

  let P2 = multiplyPoly(P, lenP, P, lenP, MAX_K);
  let lenP2 = Math.min(2 * (lenP - 1) + 1, MAX_K);

  let P4 = multiplyPoly(P2, lenP2, P2, lenP2, MAX_K);
  let lenP4 = Math.min(2 * (lenP2 - 1) + 1, MAX_K);

  let P8 = multiplyPoly(P4, lenP4, P4, lenP4, MAX_K);
  let lenP8 = Math.min(2 * (lenP4 - 1) + 1, MAX_K);

  let P9 = multiplyPoly(P8, lenP8, P, lenP, MAX_K);
  let lenP9 = Math.min(lenP8 - 1 + (lenP - 1) + 1, MAX_K);

  let P10 = multiplyPoly(P8, lenP8, P2, lenP2, MAX_K);
  let lenP10 = Math.min(lenP8 - 1 + (lenP2 - 1) + 1, MAX_K);

  const results = [];

  for (let i = 0; i < t; i++) {
    const k = parseInt(lines[ptr++]);

    if (k >= MAX_K) {
      results.push(0);
      continue;
    }

    let term1 = 0n;
    if (k < lenP10) {
      term1 = (fact[k] * P10[k]) % MOD;
    }

    let term2 = 0n;

    let coeffA = 0n;
    if (k - 1 >= 0 && k - 1 < lenP10) {
      coeffA = P10[k - 1];
    }

    let coeffB = 0n;
    let idxB = k - 1 - m;
    if (idxB >= 0 && idxB < lenP9) {
      coeffB = (P9[idxB] * invFact[m]) % MOD;
    }

    let diff = coeffA - coeffB;
    if (diff < 0n) diff += MOD;

    if (k - 1 >= 0) {
      term2 = (fact[k - 1] * diff) % MOD;
    }

    let ans = term1 - term2;
    if (ans < 0n) ans += MOD;

    results.push(ans.toString());
  }

  console.log(results.join("\n"));
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