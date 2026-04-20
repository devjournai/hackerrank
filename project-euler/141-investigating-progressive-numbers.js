/**
 * Investigating Progressive Numbers
 * Time Complexity: O(N log N + T log T + T log K)
 * Space Complexity: O(N)
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

  const queries = [];
  let maxL = 0;

  for (let i = 0; i < T; i++) {
    const K = readInt();
    const LStr = readString();
    const L = parseFloat(LStr);
    queries.push({ K, L, id: i });
    if (L > maxL) maxL = L;
  }

  const rawCandidates = [];

  const limitA = Math.floor(Math.pow(maxL, 1 / 3)) + 2;

  for (let a = 2; a < limitA; a++) {
    const a3 = a * a * a;
    if (a3 >= maxL) break;

    for (let b = 1; b < a; b++) {
      if (gcd(a, b) !== 1) continue;

      const a3b = a3 * b;
      const b2 = b * b;

      const limitK = Math.floor(Math.sqrt(maxL / a3b)) + 2;

      for (let k = 1; k < limitK; k++) {
        const term1 = k * k * a3b;
        const term2 = k * b2;
        const n = term1 + term2;

        if (n >= maxL) break;

        const root = Math.round(Math.sqrt(n));
        const dist = Math.abs(n - root * root);

        if (dist <= 1000000) {
          rawCandidates.push({ n, dist });
        }
      }
    }
  }

  const limitP_sq = Math.floor(Math.sqrt(maxL));
  const limitP = Math.min(1000000, limitP_sq);

  const isValidP = new Uint8Array(limitP + 1);

  for (let a = 2; a <= limitP; a++) {
    if (a > limitP) break;
    for (let b = 1; b < a; b++) {
      if (a * b > limitP) break;
      if (gcd(a, b) !== 1) continue;

      const prod = a * b;
      for (let pVal = prod; pVal <= limitP; pVal += prod) {
        isValidP[pVal] = 1;
      }
    }
  }

  for (let p = 1; p <= limitP; p++) {
    if (isValidP[p]) {
      const n = p * p + p;
      if (n < maxL) {
        rawCandidates.push({ n, dist: p });
      }
    }
  }

  rawCandidates.sort((a, b) => a.n - b.n);

  const candidates = [];
  if (rawCandidates.length > 0) {
    candidates.push(rawCandidates[0]);
    for (let i = 1; i < rawCandidates.length; i++) {
      if (rawCandidates[i].n !== rawCandidates[i - 1].n) {
        candidates.push(rawCandidates[i]);
      }
    }
  }

  queries.sort((a, b) => a.L - b.L);
  const BIT_SIZE = 1000005;
  const bit = new BigInt64Array(BIT_SIZE);

  function update(idx, val) {
    idx++;
    const v = BigInt(val);
    while (idx < BIT_SIZE) {
      bit[idx] += v;
      idx += idx & -idx;
    }
  }

  function query(idx) {
    idx++;
    if (idx >= BIT_SIZE) idx = BIT_SIZE - 1;
    let sum = 0n;
    while (idx > 0) {
      sum += bit[idx];
      idx -= idx & -idx;
    }
    return sum;
  }

  const results = new Array(T);
  let candIdx = 0;

  for (let i = 0; i < T; i++) {
    const q = queries[i];

    while (candIdx < candidates.length && candidates[candIdx].n < q.L) {
      update(candidates[candIdx].dist, candidates[candIdx].n);
      candIdx++;
    }

    results[q.id] = query(q.K).toString();
  }

  console.log(results.join("\n"));
};

function gcd(a, b) {
  while (b !== 0) {
    let t = b;
    b = a % b;
    a = t;
  }
  return a;
};

if (require.main === module) {
  solve();
};