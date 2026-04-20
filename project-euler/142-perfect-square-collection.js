/**
 * Perfect Square Collection
 * Time Complexity: O(Limit * log(Limit))
 * Space Complexity: O(Limit)
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

  const N = readInt();
  if (N === null) return;

  const LIMIT = 1450000;

  const MAX_EDGES = 15000000;
  const head = new Int32Array(LIMIT + 1).fill(-1);
  const next = new Int32Array(MAX_EDGES);
  const val = new Int32Array(MAX_EDGES);
  let edgePtr = 0;

  function addEdge(u, v) {
    if (edgePtr >= MAX_EDGES) return;
    val[edgePtr] = v;
    next[edgePtr] = head[u];
    head[u] = edgePtr++;
  }

  const mLimit = Math.sqrt(LIMIT) + 1;
  for (let m = 2; m <= mLimit; m++) {
    for (let n = 1; n < m; n++) {
      if (m % 2 === n % 2) continue;
      if (gcd(m, n) !== 1) continue;

      const m2 = m * m;
      const n2 = n * n;
      const h = m2 + n2;
      const l1 = m2 - n2;
      const l2 = 2 * m * n;

      if (h > LIMIT) break;

      for (let k = 1; k * h <= LIMIT; k++) {
        const kh = k * h;
        addEdge(kh, k * l1);
        addEdge(kh, k * l2);
      }
    }
  }

  const solutions = [];
  const tempLegs = new Int32Array(500);

  for (let a = 1; a <= LIMIT; a++) {
    let count = 0;
    let ptr = head[a];
    while (ptr !== -1) {
      tempLegs[count++] = val[ptr];
      ptr = next[ptr];
    }

    if (count < 2) continue;
    const currentLegs = tempLegs.subarray(0, count).sort((u, v) => v - u);

    const threshold = 0.7071 * a;

    for (let i = 0; i < count; i++) {
      const c = currentLegs[i];
      if (c <= threshold) break;

      const c2 = c * c;
      const a2 = a * a;
      const diff = c2 - a2;

      for (let j = i + 1; j < count; j++) {
        const d = currentLegs[j];

        const valCheck = diff + d * d;

        if (valCheck <= 0) break;

        const root = Math.floor(Math.sqrt(valCheck));
        if (root * root === valCheck) {
          const b = root;

          if (((c ^ d) & 1) !== 0) continue;

          const x = (1.0 * c * c + 1.0 * d * d) / 2;
          const y = (1.0 * a * a - valCheck) / 2;
          const z = (1.0 * c * c - 1.0 * d * d) / 2;

          solutions.push({ x: x, y: y, z: z });
        }
      }
    }
  }

  solutions.sort((o1, o2) => {
    const s1 = o1.x + o1.y + o1.z;
    const s2 = o2.x + o2.y + o2.z;
    return s1 - s2;
  });

  for (let k = 0; k < N && k < solutions.length; k++) {
    const sx = BigInt(solutions[k].x);
    const sy = BigInt(solutions[k].y);
    const sz = BigInt(solutions[k].z);
    console.log(`${sx} ${sy} ${sz}`);
  }
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