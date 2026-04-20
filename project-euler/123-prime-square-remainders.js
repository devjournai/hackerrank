/**
 * Prime Square Remainders
 * Time Complexity: O(M log log M + T log N)
 * Space Complexity: O(M)
 */

const MAX_PRIME_LIMIT = 5000000;
const primes = [];
const sieve = new Uint8Array(MAX_PRIME_LIMIT + 1);

function precomputePrimes() {
  sieve[0] = 1;
  sieve[1] = 1;

  for (let i = 2; i * i <= MAX_PRIME_LIMIT; i++) {
    if (sieve[i] === 0) {
      for (let j = i * i; j <= MAX_PRIME_LIMIT; j += i) {
        sieve[j] = 1;
      }
    }
  }

  for (let i = 2; i <= MAX_PRIME_LIMIT; i++) {
    if (sieve[i] === 0) {
      primes.push(i);
    }
  }
};

precomputePrimes();

function solve(B) {
  const limit = BigInt(B);
  if (limit < 2n) return 2;
  if (limit < 5n) return 3;
  let low = 3;
  let high = Math.floor(primes.length / 2);
  let ans = -1;

  while (low <= high) {
    const k = Math.floor((low + high) / 2);
    const n = 2 * k - 1;

    if (n - 1 >= primes.length) {
      high = k - 1;
      continue;
    }

    const pn = BigInt(primes[n - 1]);
    const nBig = BigInt(n);

    const remainder = 2n * nBig * pn;

    if (remainder > limit) {
      ans = n;
      high = k - 1;
    } else {
      low = k + 1;
    }
  }

  return ans;
};

function processData(input) {
  const lines = input.trim().split(/\s+/);
  if (lines.length === 0) return;

  let ptr = 0;
  const T = parseInt(lines[ptr++], 10);

  for (let i = 0; i < T; i++) {
    if (ptr < lines.length) {
      const B = lines[ptr++];
      console.log(solve(B).toString());
    }
  }
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