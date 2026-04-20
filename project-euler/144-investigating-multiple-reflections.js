/**
 * Investigating Multiple Reflections
 * Time Complexity: O(K)
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

  function readFloat() {
    const s = readString();
    return s ? parseFloat(s) : null;
  }

  const TStr = readString();
  if (!TStr) return;
  const T = parseInt(TStr, 10);

  for (let i = 0; i < T; i++) {
    const a = readFloat();
    const b = readFloat();
    const c = readFloat();

    const x0 = readFloat();
    const y0 = readFloat();
    const x1 = readFloat();
    const y1 = readFloat();

    let count = 1;

    let prevX = x0;
    let prevY = y0;
    let curX = x1;
    let curY = y1;

    while (count <= 20000) {
      const vx = curX - prevX;
      const vy = curY - prevY;

      const nx = a * curX;
      const ny = b * curY;

      const dotVN = vx * nx + vy * ny;
      const dotNN = nx * nx + ny * ny;
      const factor = (2 * dotVN) / dotNN;

      const ux = vx - factor * nx;
      const uy = vy - factor * ny;

      const num = 2 * (a * curX * ux + b * curY * uy);
      const den = a * ux * ux + b * uy * uy;
      const t = -num / den;
      const nextX = curX + t * ux;
      const nextY = curY + t * uy;

      if (Math.abs(nextX) <= 0.01 && nextY > 0) {
        break;
      }

      count++;
      prevX = curX;
      prevY = curY;
      curX = nextX;
      curY = nextY;
    }

    console.log(count);
  }
};

if (require.main === module) {
  solve();
};