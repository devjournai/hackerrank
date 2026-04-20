/**
 * Pythagorean Tiles
 * Time Complexity: O(T * log(MAX_P))
 * Space Complexity: O(log(MAX_P))
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

  const LIMIT = 1000000000000000000n;
  const primitives = [];
  let x = 1n;
  let y = 1n;

  while (true) {
    const m = x + y;
    const n = y;

    const p = 2n * m * (m + n);

    if (p > LIMIT) break;
    primitives.push(p);

    const next_x = x + 2n * y;
    const next_y = x + y;
    x = next_x;
    y = next_y;
  }

  const TStr = readString();
  if (!TStr) return;
  const T = parseInt(TStr, 10);

  for (let i = 0; i < T; i++) {
    const pStr = readString();
    if (!pStr) break;
    const P = BigInt(pStr);

    let count = 0n;

    for (const primP of primitives) {
      if (primP >= P) break;
      count += (P - 1n) / primP;
    }

    console.log(count.toString());
  }
};

if (require.main === module) {
  solve();
};