/**
 * Rectangles in Cross-Hatched Grids
 * Time Complexity: O(T * log(MOD))
 * Space Complexity: O(1)
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

  const MOD = 1000000007n;

  function modAdd(a, b) {
    return (a + b) % MOD;
  }
  function modSub(a, b) {
    return (((a - b) % MOD) + MOD) % MOD;
  }
  function modMul(a, b) {
    return (a * b) % MOD;
  }

  function modPow(base, exp) {
    let res = 1n;
    base = base % MOD;
    while (exp > 0n) {
      if (exp % 2n === 1n) res = (res * base) % MOD;
      base = (base * base) % MOD;
      exp /= 2n;
    }
    return res;
  }

  function modInv(n) {
    return modPow(n, MOD - 2n);
  }

  const INV2 = modInv(2n);
  const INV3 = modInv(3n);
  const INV6 = modInv(6n);
  const INV30 = modInv(30n);

  function getPowerSums(nVal) {
    const n = BigInt(nVal);
    const n_plus_1 = n + 1n;
    const n2_plus_1 = 2n * n + 1n;

    const s1 = modMul(modMul(n, n_plus_1), INV2);
    const s2 = modMul(modMul(modMul(n, n_plus_1), n2_plus_1), INV6);
    const s3 = modMul(s1, s1);

    let term4 = modSub(modAdd(modMul(3n, modMul(n, n)), modMul(3n, n)), 1n);
    let s4 = modMul(
      modMul(modMul(modMul(n, n_plus_1), n2_plus_1), term4),
      INV30
    );

    return { s1, s2, s3, s4 };
  }

  function solveCase(M_in, N_in) {
    let M = BigInt(Math.max(M_in, N_in));
    let N = BigInt(Math.min(M_in, N_in));

    const sumM = modMul(modMul(M, M + 1n), modMul(M + 2n, INV6));
    const sumN = modMul(modMul(N, N + 1n), modMul(N + 2n, INV6));
    const ansUp = modMul(sumM, sumN);

    const K1 = modAdd(modAdd(M, N), 1n);

    let mTerm = modAdd(modMul(M, M), M);
    let nTerm = modAdd(modMul(N, N), N);
    const K2 = modMul(modAdd(mTerm, nTerm), INV2);
    const c4 = modSub(0n, modMul(modMul(2n, K1), INV3));
    const c3 = modMul(modMul(4n, K2), INV3);
    const c2 = modAdd(1n, modMul(K1, INV6));
    const term1_1 = modMul(K1, INV2);
    const term1_2 = modMul(K2, INV3);
    const c1 = modSub(0n, modAdd(term1_1, term1_2));
    const sums = getPowerSums(Number(N));

    let ansDiag = 0n;
    ansDiag = modAdd(ansDiag, modMul(c4, sums.s4));
    ansDiag = modAdd(ansDiag, modMul(c3, sums.s3));
    ansDiag = modAdd(ansDiag, modMul(c2, sums.s2));
    ansDiag = modAdd(ansDiag, modMul(c1, sums.s1));

    process.stdout.write(ansUp + " " + ansDiag + "\n");
  }

  for (let i = 0; i < T; i++) {
    const m = readInt();
    const n = readInt();
    solveCase(m, n);
  }
};

if (require.main === module) {
  solve();
};