/**
 * Maximising a Weighted Product
 * Time Complexity: O(A log A log m)
 * Space Complexity: O(A)
 */

const MOD = 1000000007n;

function processData(input) {
  const [X, A, m] = input.trim().split(/\s+/).map(Number);

  if (A < m) {
    console.log(0);
    return;
  }

  const numerator = power(BigInt(X), BigInt(A), MOD);
  const denominator = power(BigInt(A), BigInt(A), MOD);
  const preFactor = (numerator * modInverse(denominator, MOD)) % MOD;
  const targetDegree = A - m;

  const polyS = new BigInt64Array(targetDegree + 1);
  for (let k = 1; k <= targetDegree + 1; k++) {
    polyS[k - 1] = power(BigInt(k), BigInt(k), MOD);
  }

  const polyResult = polyPow(polyS, m, targetDegree);

  const sumPart = polyResult[targetDegree];
  const ans = (preFactor * sumPart) % MOD;

  console.log(ans.toString());
};

function polyPow(basePoly, exponent, maxDegree) {
  let res = new BigInt64Array(1);
  res[0] = 1n;
  let base = basePoly;

  while (exponent > 0) {
    if (exponent & 1) {
      res = multiplyPoly(res, base, maxDegree);
    }
    base = multiplyPoly(base, base, maxDegree);
    exponent >>= 1;
  }
  return res;
};

function multiplyPoly(A, B, maxDegree) {
  if (A.length * B.length < 6400) {
    return multiplyNaive(A, B, maxDegree);
  }

  const size = 1 << (32 - Math.clz32(A.length + B.length - 2));

  const c1 = convolveNTT(A, B, size, 167772161n, 3n);
  const c2 = convolveNTT(A, B, size, 469762049n, 3n);
  const c3 = convolveNTT(A, B, size, 998244353n, 3n);

  const resultLen = Math.min(size, maxDegree + 1);
  const res = new BigInt64Array(resultLen);

  const P1 = 167772161n,
    P2 = 469762049n,
    P3 = 998244353n;
  const P1P2 = P1 * P2;
  const invP1_modP2 = modInverse(P1, P2);
  const invP1P2_modP3 = modInverse(P1P2, P3);

  for (let i = 0; i < resultLen; i++) {
    const a1 = c1[i],
      a2 = c2[i],
      a3 = c3[i];

    let k = (((a2 - a1) % P2) + P2) % P2;
    k = (k * invP1_modP2) % P2;
    let x = a1 + k * P1;

    let mVal = (((a3 - (x % P3)) % P3) + P3) % P3;
    mVal = (mVal * invP1P2_modP3) % P3;

    let finalVal = (x + mVal * P1P2) % MOD;
    res[i] = finalVal;
  }

  return res;
};

function multiplyNaive(A, B, maxDegree) {
  const len = Math.min(A.length + B.length - 1, maxDegree + 1);
  const res = new BigInt64Array(len);
  for (let i = 0; i < A.length; i++) {
    for (let j = 0; j < B.length; j++) {
      if (i + j < len) {
        res[i + j] = (res[i + j] + A[i] * B[j]) % MOD;
      }
    }
  }
  return res;
};

function convolveNTT(A, B, size, mod, root) {
  const aVals = new BigInt64Array(size);
  const bVals = new BigInt64Array(size);
  aVals.set(A);
  bVals.set(B);

  ntt(aVals, false, mod, root);
  ntt(bVals, false, mod, root);

  for (let i = 0; i < size; i++) {
    aVals[i] = (aVals[i] * bVals[i]) % mod;
  }

  ntt(aVals, true, mod, root);
  return aVals;
};

function ntt(a, invert, mod, root) {
  const n = a.length;

  let j = 0;
  for (let i = 1; i < n; i++) {
    let bit = n >> 1;
    while (j & bit) {
      j ^= bit;
      bit >>= 1;
    }
    j ^= bit;
    if (i < j) {
      const temp = a[i];
      a[i] = a[j];
      a[j] = temp;
    }
  }

  for (let len = 2; len <= n; len <<= 1) {
    const halfLen = len >> 1;
    const angle = (mod - 1n) / BigInt(len);
    let wLen = power(root, angle, mod);
    if (invert) wLen = modInverse(wLen, mod);

    for (let i = 0; i < n; i += len) {
      let w = 1n;
      for (let j = 0; j < halfLen; j++) {
        const u = a[i + j];
        const v = (a[i + j + halfLen] * w) % mod;
        a[i + j] = (u + v) % mod;
        a[i + j + halfLen] = (u - v + mod) % mod;
        w = (w * wLen) % mod;
      }
    }
  }

  if (invert) {
    const nInv = modInverse(BigInt(n), mod);
    for (let i = 0; i < n; i++) {
      a[i] = (a[i] * nInv) % mod;
    }
  }
};

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

function modInverse(n, mod) {
  return power(n, mod - 2n, mod);
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