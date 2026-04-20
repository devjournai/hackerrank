/*
 * Prime Triples
 * Time Complexity: O(sqrt(M) log log sqrt(M) + R log log R + n)
 * Space Complexity: O(R)
 */

const MAX_PRIME_LIMIT = 7200000;
const smallPrimes = [];
const sieveBuffer = new Uint8Array(MAX_PRIME_LIMIT + 1);

function initPrimes() {
  sieveBuffer[0] = 1;
  sieveBuffer[1] = 1;

  for (let i = 2; i * i <= MAX_PRIME_LIMIT; i++) {
    if (sieveBuffer[i] === 0) {
      for (let j = i * i; j <= MAX_PRIME_LIMIT; j += i) {
        sieveBuffer[j] = 1;
      }
    }
  }

  for (let i = 2; i <= MAX_PRIME_LIMIT; i++) {
    if (sieveBuffer[i] === 0) {
      smallPrimes.push(i);
    }
  }
};

initPrimes();

function getRowStart(n) {
  return Math.floor((n * (n - 1)) / 2) + 1;
};

function solveForN(n) {
  if (n < 1) return 0n;

  const rMin = Math.max(1, n - 2);
  const rMax = n + 2;

  const startVal = getRowStart(rMin);
  const endRowStart = getRowStart(rMax);
  const endVal = endRowStart + rMax - 1;

  const rangeLen = endVal - startVal + 1;
  const rangeComposites = new Uint8Array(rangeLen);

  for (let i = 0; i < smallPrimes.length; i++) {
    const p = smallPrimes[i];
    if (p * p > endVal) break;

    let firstMultiple = Math.floor((startVal + p - 1) / p) * p;
    if (firstMultiple < p * p) firstMultiple = p * p;

    let startIdx = firstMultiple - startVal;

    for (let j = startIdx; j < rangeLen; j += p) {
      rangeComposites[j] = 1;
    }
  }

  if (startVal === 1) rangeComposites[0] = 1;

  function isPrime(r, c) {
    if (r < rMin || r > rMax) return false;
    if (c < 0 || c >= r) return false;

    const val = getRowStart(r) + c;
    const idx = val - startVal;
    return rangeComposites[idx] === 0;
  }

  function countPrimeNeighbors(r, c) {
    let count = 0;
    for (let dr = -1; dr <= 1; dr++) {
      const nr = r + dr;
      for (let dc = -1; dc <= 1; dc++) {
        if (dr === 0 && dc === 0) continue;
        if (isPrime(nr, c + dc)) count++;
      }
    }
    return count;
  }

  let rowSum = 0n;

  for (let c = 0; c < n; c++) {
    if (!isPrime(n, c)) continue;

    const val = BigInt(getRowStart(n) + c);
    const neighbors = countPrimeNeighbors(n, c);

    if (neighbors >= 2) {
      rowSum += val;
    } else {
      let connected = false;

      for (let dr = -1; dr <= 1; dr++) {
        const nr = n + dr;
        for (let dc = -1; dc <= 1; dc++) {
          if (dr === 0 && dc === 0) continue;
          const nc = c + dc;

          if (isPrime(nr, nc)) {
            if (countPrimeNeighbors(nr, nc) >= 2) {
              connected = true;
              break;
            }
          }
        }
        if (connected) break;
      }

      if (connected) rowSum += val;
    }
  }

  return rowSum;
};

function processData(input) {
  const parts = input.trim().split(/\s+/);
  if (parts.length < 2) return;

  const a = parseInt(parts[0], 10);
  const b = parseInt(parts[1], 10);

  const sumA = solveForN(a);
  const sumB = solveForN(b);

  console.log((sumA + sumB).toString());
};

process.stdin.resume();
process.stdin.setEncoding("ascii");
let _input = "";
process.stdin.on("data", function (input) {
  _input += input;
});
process.stdin.on("end", function () {
  processData(_input);
});