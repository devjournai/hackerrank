/**
 * Same Differences
 * Time Complexity: O(N_max * log(N_max))
 * Space Complexity: O(N_max)
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
  let globalMax = 0;

  for (let i = 0; i < T; i++) {
    const n = readInt();
    queries.push(n);
    if (n > globalMax) globalMax = n;
  }

  const counts = new Uint16Array(globalMax + 1);

  for (let u = 1; u <= globalMax; u++) {
    const max_v_by_n = Math.floor(globalMax / u);
    const max_v_by_rule = 3 * u - 1;
    const limit = max_v_by_n < max_v_by_rule ? max_v_by_n : max_v_by_rule;
    let v = (4 - (u % 4)) % 4;
    if (v === 0) v = 4;

    for (; v <= limit; v += 4) {
      counts[u * v]++;
    }
  }

  console.log(queries.map((q) => counts[q]).join("\n"));
};

if (require.main === module) {
  solve();
};