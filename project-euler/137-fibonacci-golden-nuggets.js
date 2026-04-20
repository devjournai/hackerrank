/**
 * Fibonacci Golden Nuggets
 * Time Complexity: O(T * log(N))
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

  const MOD = 1000000007n;

  function getFibPair(nStr) {
    let a = 0n;
    let b = 1n;

    for (let i = 0; i < nStr.length; i++) {
      let t1 = (2n * b - a) % MOD;
      if (t1 < 0n) t1 += MOD;

      let c = (a * t1) % MOD;

      let d = (a * a + b * b) % MOD;

      if (nStr[i] === "0") {
        a = c;
        b = d;
      } else {
        a = d;
        b = (c + d) % MOD;
      }
    }
    return [a, b];
  }

  const TStr = readString();
  if (!TStr) return;
  const T = parseInt(TStr, 10);

  for (let i = 0; i < T; i++) {
    const nStrRaw = readString();
    if (!nStrRaw) break;

    const N = BigInt(nStrRaw);

    const binaryN = N.toString(2);
    const [fN, fN1] = getFibPair(binaryN);
    let term = (2n * fN1 - fN) % MOD;
    if (term < 0n) term += MOD;

    const f2N = (fN * term) % MOD;
    const f2N1 = (fN * fN + fN1 * fN1) % MOD;
    const ans = (f2N * f2N1) % MOD;

    process.stdout.write(ans.toString() + "\n");
  }
};

if (require.main === module) {
  solve();
};