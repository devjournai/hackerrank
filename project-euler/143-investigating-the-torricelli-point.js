/**
 * Investigating the Torricelli Point (Project Euler 143)
 * Time Complexity: O(N * log(N)) roughly, dependent on number of valid pairs
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

  const N = readInt();
  if (N === null) return;

  const adj = new Array(N + 1).fill(null).map(() => []);
  const mLimit = Math.floor(Math.sqrt(N)) + 1;

  for (let m = 2; m <= mLimit; m++) {
    for (let n = 1; n < m; n++) {
      if ((m - n) % 3 === 0) continue;
      if (gcd(m, n) !== 1) continue;

      let u = 2 * m * n + n * n;
      let v = m * m - n * n;
      for (let k = 1; ; k++) {
        let ku = k * u;
        let kv = k * v;

        if (ku + kv >= N) break;

        let min = ku < kv ? ku : kv;
        let max = ku < kv ? kv : ku;

        adj[min].push(max);
      }
    }
  }

  for (let i = 0; i <= N; i++) {
    if (adj[i].length > 1) {
      adj[i].sort((a, b) => a - b);
    }
  }

  function hasEdge(u, target) {
    const list = adj[u];
    let l = 0,
      r = list.length - 1;
    while (l <= r) {
      let mid = (l + r) >>> 1;
      if (list[mid] === target) return true;
      if (list[mid] < target) l = mid + 1;
      else r = mid - 1;
    }
    return false;
  }

  const results = [];
  for (let p = 1; p <= N; p++) {
    const qList = adj[p];
    if (qList.length === 0) continue;

    for (let i = 0; i < qList.length; i++) {
      let q = qList[i];
      if (p + q + q + 1 > N) break;

      const rList = adj[q];
      if (rList.length === 0) continue;

      for (let j = 0; j < rList.length; j++) {
        let r = rList[j];

        if (p + q + r > N) break;

        if (hasEdge(p, r)) {
          let a = Math.round(Math.sqrt(q * q + r * r + q * r));
          let b = Math.round(Math.sqrt(p * p + r * r + p * r));
          let c = Math.round(Math.sqrt(p * p + q * q + p * q));

          let sides = [a, b, c];
          sides.sort((x, y) => x - y);
          results.push(sides);
        }
      }
    }
  }

  results.sort((arr1, arr2) => {
    if (arr1[0] !== arr2[0]) return arr1[0] - arr2[0];
    if (arr1[1] !== arr2[1]) return arr1[1] - arr2[1];
    return arr1[2] - arr2[2];
  });

  if (results.length > 0) {
    let prev = results[0];
    console.log(`${prev[0]} ${prev[1]} ${prev[2]}`);

    for (let i = 1; i < results.length; i++) {
      let curr = results[i];
      if (curr[0] !== prev[0] || curr[1] !== prev[1] || curr[2] !== prev[2]) {
        console.log(`${curr[0]} ${curr[1]} ${curr[2]}`);
        prev = curr;
      }
    }
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