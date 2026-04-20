/*
 * Dice Game
 * Time Complexity: O(M log M)
 * Space Complexity: O(M)
 */

const MOD = 1012924417n;
const G = 5n;

function modPow(base, exp, mod) {
  let res = 1n;
  base %= mod;
  while (exp > 0n) {
    if (exp % 2n === 1n) res = (res * base) % mod;
    base = (base * base) % mod;
    exp /= 2n;
  }
  return res;
};

function modInv(n, mod) {
  return modPow(n, mod - 2n, mod);
};

function ntt(a, invert) {
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
    let wlen = modPow(G, (MOD - 1n) / BigInt(len), MOD);
    if (invert) wlen = modInv(wlen, MOD);

    for (let i = 0; i < n; i += len) {
      let w = 1n;
      for (let j = 0; j < len / 2; j++) {
        const u = a[i + j];
        const v = (a[i + j + len / 2] * w) % MOD;
        a[i + j] = (u + v) % MOD;
        a[i + j + len / 2] = (u - v + MOD) % MOD;
        w = (w * wlen) % MOD;
      }
    }
  }

  if (invert) {
    const nInv = modInv(BigInt(n), MOD);
    for (let i = 0; i < n; i++) {
      a[i] = (a[i] * nInv) % MOD;
    }
  }
};

function getDistribution(n, s) {
  if (n === 0) return [1n];

  const maxSum = n * s;
  let size = 1;
  while (size <= maxSum) size <<= 1;

  const poly = new BigInt64Array(size);
  for (let i = 1; i <= s; i++) {
    poly[i] = 1n;
  }

  ntt(poly, false);

  const bigN = BigInt(n);
  for (let i = 0; i < size; i++) {
    poly[i] = modPow(poly[i], bigN, MOD);
  }

  ntt(poly, true);

  return poly;
};

function processData(input) {
  const tokens = input.trim().split(/\s+/);
  let ptr = 0;
  if (ptr >= tokens.length) return;

  const q = parseInt(tokens[ptr++], 10);

  for (let i = 0; i < q; i++) {
    const np = parseInt(tokens[ptr++], 10);
    const sp = parseInt(tokens[ptr++], 10);
    const nc = parseInt(tokens[ptr++], 10);
    const sc = parseInt(tokens[ptr++], 10);

    const distP = getDistribution(np, sp);
    const distC = getDistribution(nc, sc);

    let winningWays = 0n;
    let cumulativeColin = 0n;

    const maxLen = Math.max(distP.length, distC.length);

    for (let s = 0; s < maxLen; s++) {
      const pWays = s < distP.length ? distP[s] : 0n;
      const cWays = s < distC.length ? distC[s] : 0n;

      if (pWays > 0n) {
        winningWays = (winningWays + pWays * cumulativeColin) % MOD;
      }

      cumulativeColin = (cumulativeColin + cWays) % MOD;
    }

    const totalP = modPow(BigInt(sp), BigInt(np), MOD);
    const totalC = modPow(BigInt(sc), BigInt(nc), MOD);
    const totalSpace = (totalP * totalC) % MOD;

    const result = (winningWays * modInv(totalSpace, MOD)) % MOD;

    console.log(result.toString());
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