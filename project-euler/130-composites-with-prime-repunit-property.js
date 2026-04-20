/**
 * Composites with Prime Repunit Property
 * Time Complexity: O(sqrt(R) + (R-L) * log(R))
 * Space Complexity: O(R-L + sqrt(R))
 */

function power(base, exp, mod) {
  let res = 1n;
  base %= mod;
  while (exp > 0n) {
    if (exp & 1n) res = (res * base) % mod;
    base = (base * base) % mod;
    exp >>= 1n;
  }
  return res;
};

function processData(input) {
  const parts = input.trim().split(/\s+/);
  if (parts.length < 2) return;

  const L = parseInt(parts[0], 10);
  const R = parseInt(parts[1], 10);
  const rangeLen = R - L + 1;

  const sqrtR = Math.floor(Math.sqrt(R));
  const limit = Math.max(sqrtR, 100);
  const primes = [];
  const sieve = new Uint8Array(limit + 1);

  for (let i = 2; i * i <= limit; i++) {
    if (sieve[i] === 0) {
      for (let j = i * i; j <= limit; j += i) {
        sieve[j] = 1;
      }
    }
  }
  for (let i = 2; i <= limit; i++) {
    if (sieve[i] === 0) primes.push(i);
  }
  const isPrimeRange = new Uint8Array(rangeLen);

  for (const p of primes) {
    let start = Math.floor((L + p - 1) / p) * p;
    if (start < p * p) start = p * p;

    let startIdx = start - L;

    if (startIdx < rangeLen) {
      for (let j = startIdx; j < rangeLen; j += p) {
        isPrimeRange[j] = 1;
      }
    }
  }

  if (L === 1) isPrimeRange[0] = 1;

  const output = [];
  const ten = 10n;
  const one = 1n;

  for (let i = 0; i < rangeLen; i++) {
    const nVal = L + i;

    if (nVal % 2 === 0 || nVal % 5 === 0) continue;
    if (isPrimeRange[i] === 0) continue;
    if (nVal === 1) continue;

    const n = BigInt(nVal);
    let valid = false;

    if (nVal % 3 !== 0) {
      if (power(ten, n - one, n) === one) {
        valid = true;
      }
    } else {
      const mod9n = 9n * n;
      if (power(ten, n - one, mod9n) === one) {
        valid = true;
      }
    }

    if (valid) {
      output.push(nVal);
    }
  }

  console.log(output.join("\n"));
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