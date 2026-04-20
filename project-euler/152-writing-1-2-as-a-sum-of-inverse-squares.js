/**
 * Writing 1/2 as a Sum of Inverse Squares
 * Time Complexity: O(N * 2^(N/p)) roughly, efficient due to pruning.
 * Space Complexity: O(States)
 */

const fs = require('fs');

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
    return buffer.toString('utf8', start, bufferIdx);
  }

  function readInt() {
    const s = readString();
    return s ? parseInt(s, 10) : null;
  }

  const D_in = readInt();
  const N_in = readInt();

  if (D_in === null || N_in === null) return;

  const primes = [];
  const lpf = new Int32Array(N_in + 1).fill(0);

  for (let i = 2; i <= N_in; i++) {
    if (lpf[i] === 0) {
      primes.push(i);
      for (let j = i; j <= N_in; j += i) {
        lpf[j] = i;
      }
    }
  }

  let L = 1n;
  for (const p of primes) {
    let p_pow = p;
    while (p_pow * p <= N_in) p_pow *= p;
    const p_2e = BigInt(p_pow) * BigInt(p_pow);
    L *= p_2e;
  }

  if (L % BigInt(D_in) !== 0n) {
    console.log(0);
    return;
  }
  const TARGET = L / BigInt(D_in);

  const itemsByLPF = new Map();
  for (let i = 2; i <= N_in; i++) {
    const p = lpf[i];
    if (!itemsByLPF.has(p)) itemsByLPF.set(p, []);
    const val = L / BigInt(i * i);
    itemsByLPF.get(p).push(val);
  }

  const sortedPrimes = primes.slice().reverse();

  let dp = new Map();
  dp.set(0n, 1n);

  for (const p of sortedPrimes) {
    const items = itemsByLPF.get(p) || [];

    let modVal = 1n;
    let temp = L;
    while (temp % BigInt(p) === 0n) {
      modVal *= BigInt(p);
      temp /= BigInt(p);
    }

    const targetMod = TARGET % modVal;

    const groupSums = new Map();
    groupSums.set(0n, 1n);

    for (const val of items) {
      const nextGroup = new Map();
      for (const [s, c] of groupSums) {
        nextGroup.set(s, (nextGroup.get(s) || 0n) + c);
        const sNew = s + val;
        if (sNew <= TARGET) {
          nextGroup.set(sNew, (nextGroup.get(sNew) || 0n) + c);
        }
      }
      groupSums.clear();
      for (const [k, v] of nextGroup) groupSums.set(k, v);
    }

    const nextDp = new Map();

    const buckets = new Map();
    for (const [s2, c2] of groupSums) {
      const rem = s2 % modVal;
      if (!buckets.has(rem)) buckets.set(rem, []);
      buckets.get(rem).push([s2, c2]);
    }

    for (const [s1, c1] of dp) {
      let remNeeded = (targetMod - (s1 % modVal));
      if (remNeeded < 0n) remNeeded += modVal;

      const candidates = buckets.get(remNeeded);
      if (candidates) {
        for (const [s2, c2] of candidates) {
          const totalS = s1 + s2;
          if (totalS <= TARGET) {
            nextDp.set(totalS, (nextDp.get(totalS) || 0n) + c1 * c2);
          }
        }
      }
    }

    dp = nextDp;
    if (dp.size === 0) break;
  }

  const ans = dp.get(TARGET) || 0n;
  console.log(ans.toString());
};

if (require.main === module) {
  solve();
};