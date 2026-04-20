/**
 * Singleton Difference
 * Time Complexity: O(MAX_SMALL * log(log(MAX_SMALL)))
 * Space Complexity: O(MAX_SMALL)
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

  function readBigInt() {
    const s = readString();
    return s ? BigInt(s) : null;
  }

  const PRECOMP_LIMIT = 8000000;

  const sieve = new Uint8Array(PRECOMP_LIMIT + 1);

  sieve[0] = 1;
  sieve[1] = 1;
  for (let i = 2; i * i <= PRECOMP_LIMIT; i++) {
    if (sieve[i] === 0) {
      for (let j = i * i; j <= PRECOMP_LIMIT; j += i) {
        sieve[j] = 1;
      }
    }
  }

  const countArr = new Int32Array(PRECOMP_LIMIT + 1);

  let currentCount = 0;
  for (let n = 1; n <= PRECOMP_LIMIT; n++) {
    let isValid = false;

    if (n === 4 || n === 16) {
      isValid = true;
    } else {
      if (sieve[n] === 0) {
        if (n % 4 === 3) isValid = true;
      } else if (n % 4 === 0) {
        let p = n / 4;
        if (p > 2 && p <= PRECOMP_LIMIT && sieve[p] === 0) {
          isValid = true;
        } else if (n % 16 === 0) {
          p = n / 16;
          if (p > 2 && p <= PRECOMP_LIMIT && sieve[p] === 0) {
            isValid = true;
          }
        }
      }
    }

    if (isValid) currentCount++;
    countArr[n] = currentCount;
  }

  const SEG_SIEVE_BASE_LIMIT = 1000000;
  const basePrimes = [];
  for (let i = 2; i <= SEG_SIEVE_BASE_LIMIT; i++) {
    if (sieve[i] === 0) basePrimes.push(i);
  }

  function solveLarge(L, R) {
    const len = Number(R - L) + 1;

    function segmentSieve(start, length) {
      const res = new Uint8Array(length);
      if (start === 1n && length > 0) res[0] = 1;
      const end = start + BigInt(length);

      for (const p of basePrimes) {
        const pBig = BigInt(p);
        if (pBig * pBig >= end) break;

        let rem = start % pBig;
        let firstIdx = rem === 0n ? 0n : pBig - rem;

        if (start <= pBig) {
          firstIdx += pBig;
        }

        if (firstIdx < BigInt(length)) {
          let curr = Number(firstIdx);
          for (let k = curr; k < length; k += p) {
            res[k] = 1;
          }
        }
      }
      return res;
    }

    const sieveMain = segmentSieve(L, len);

    const start4 = (L + 3n) / 4n;
    const end4 = R / 4n;
    let sieve4 = null;
    if (start4 <= end4) {
      const len4 = Number(end4 - start4) + 1;
      sieve4 = segmentSieve(start4, len4);
    }

    const start16 = (L + 15n) / 16n;
    const end16 = R / 16n;
    let sieve16 = null;
    if (start16 <= end16) {
      const len16 = Number(end16 - start16) + 1;
      sieve16 = segmentSieve(start16, len16);
    }

    let count = 0;
    for (let i = 0; i < len; i++) {
      const n = L + BigInt(i);

      if (n === 4n || n === 16n) {
        count++;
        continue;
      }

      if (sieveMain[i] === 0) {
        if (n % 4n === 3n) count++;
        continue;
      }

      if (n % 4n === 0n) {
        const pVal = n / 4n;
        if (pVal > 2n && sieve4) {
          const idx4 = Number(pVal - start4);
          if (idx4 >= 0 && idx4 < sieve4.length) {
            if (sieve4[idx4] === 0) {
              count++;
              continue;
            }
          }
        }

        if (n % 16n === 0n) {
          const pVal16 = n / 16n;
          if (pVal16 > 2n && sieve16) {
            const idx16 = Number(pVal16 - start16);
            if (idx16 >= 0 && idx16 < sieve16.length) {
              if (sieve16[idx16] === 0) {
                count++;
              }
            }
          }
        }
      }
    }
    return count;
  }

  const TStr = readString();
  if (!TStr) return;
  const T = parseInt(TStr, 10);

  for (let i = 0; i < T; i++) {
    const L = readBigInt();
    const R = readBigInt();

    if (R <= BigInt(PRECOMP_LIMIT)) {
      const rInt = Number(R);
      const lInt = Number(L);
      const ans = countArr[rInt] - countArr[lInt - 1];
      process.stdout.write(ans + "\n");
    } else {
      const ans = solveLarge(L, R);
      process.stdout.write(ans + "\n");
    }
  }
};

if (require.main === module) {
  solve();
};