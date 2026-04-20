/**
 * Rectangular Triangles That Share a Cathetus
 * Time Complexity: O(MAX_N)
 * Space Complexity: O(MAX_N)
 */

const BIGINT_ZERO = 0n;
const BIGINT_ONE = 1n;
const BIGINT_TWO = 2n;
const BIGINT_NEG_ONE = -1n;
const MAX_M = 10000000000000000n;
const MAX_N = 1000000;
const MAX_D = 2 * MAX_N + 10;

function getPrimes(limit) {
  const isPrime = new Array(limit + 1).fill(true);
  isPrime[0] = isPrime[1] = false;
  for (let i = 2; i * i <= limit; i++) {
    if (isPrime[i]) {
      for (let j = i * i; j <= limit; j += i) {
        isPrime[j] = false;
      }
    }
  }
  const primes = [];
  for (let i = 3; i <= limit; i += 2) {
    if (isPrime[i]) primes.push(i);
  }
  return primes;
}

const oddPrimes = getPrimes(300);

const smallest = new Array(MAX_D + 1).fill(MAX_M + BIGINT_ONE);
smallest[1] = BIGINT_ONE;

for (let p of oddPrimes) {
  for (let oldD = MAX_D; oldD >= 1; oldD--) {
    if (smallest[oldD] > MAX_M) continue;
    let powP = BigInt(p);
    let e = 1;
    while (true) {
      const newM = smallest[oldD] * powP;
      if (newM > MAX_M) break;
      const addFactor = 2 * e + 1;
      const newD = oldD * addFactor;
      if (newD > MAX_D) break;
      if (newM < smallest[newD]) smallest[newD] = newM;
      e++;
      powP *= BigInt(p);
    }
  }
};

const ans = new Array(MAX_N + 1).fill(MAX_M + BIGINT_ONE);

for (let d = 1; d <= 2 * MAX_N + 1; d += 2) {
  const f = (d - 1) / 2;
  if (f > MAX_N) break;
  const m = smallest[d];
  if (m > MAX_M) continue;
  if (m < ans[f]) ans[f] = m;
};

const maxProd = 2 * MAX_N + 1;
for (let t = 1; t <= maxProd; t++) {
  const r = smallest[t];
  if (r > MAX_M) continue;
  let maxA = Math.floor(maxProd / t);
  if (maxA % 2 === 0) maxA--;
  for (let a = 1; a <= maxA; a += 2) {
    const prod = a * t;
    const nn = (prod - 1) / 2;
    if (nn > MAX_N || nn < 1) continue;
    const v = (a + 1) / 2;
    if (v >= 54) continue;
    const pow2 = BIGINT_TWO ** BigInt(v);
    const m = pow2 * r;
    if (m > MAX_M) continue;
    if (m < ans[nn]) ans[nn] = m;
  }
};

function processData(input) {
  const lines = input.trim().split("\n");
  const q = parseInt(lines[0]);
  let output = "";
  for (let i = 1; i <= q; i++) {
    const n = parseInt(lines[i]);
    const res = ans[n];
    output += (res > MAX_M ? "-1" : res.toString()) + "\n";
  }
  console.log(output.trim());
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