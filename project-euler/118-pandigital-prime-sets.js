/**
 * Pandigital prime sets
 * Time Complexity: O(T * D! * 2^D)
 * Space Complexity: O(D!)
 */

const cache = new Map();

function power(a, b, m) {
  let res = 1n;
  a %= m;
  while (b > 0n) {
    if (b & 1n) res = (res * a) % m;
    a = (a * a) % m;
    b >>= 1n;
  }
  return res;
};

function isPrime(n) {
  if (n < 2) return false;
  if (n === 2 || n === 3) return true;
  if (n % 2 === 0 || n % 3 === 0) return false;

  if (n < 1000000) {
    const limit = Math.floor(Math.sqrt(n));
    for (let i = 5; i <= limit; i += 6) {
      if (n % i === 0 || n % (i + 2) === 0) return false;
    }
    return true;
  }

  const nBig = BigInt(n);
  let dBig = nBig - 1n;
  let sBig = 0n;
  while ((dBig & 1n) === 0n) {
    dBig >>= 1n;
    sBig++;
  }

  const bases = [2n, 7n, 61n];
  for (const a of bases) {
    if (a >= nBig) break;
    let x = power(a, dBig, nBig);
    if (x === 1n || x === nBig - 1n) continue;
    let composite = true;
    for (let r = 1n; r < sBig; r++) {
      x = (x * x) % nBig;
      if (x === nBig - 1n) {
        composite = false;
        break;
      }
    }
    if (composite) return false;
  }
  return true;
};

function getPermutations(str) {
  if (str.length <= 1) return [str];
  const perms = [];
  const smallerPerms = getPermutations(str.slice(1));
  const char = str[0];
  for (let p of smallerPerms) {
    for (let i = 0; i <= p.length; i++) {
      perms.push(p.slice(0, i) + char + p.slice(i));
    }
  }
  return perms;
};

function findPartitions(str, start, currentPrimes, validSets) {
  if (start === str.length) {
    const sortedPrimes = [...currentPrimes].sort((a, b) => a - b);
    validSets.add(sortedPrimes.join(','));
    return;
  }

  for (let i = start; i < str.length; i++) {
    const sub = str.substring(start, i + 1);
    const num = parseInt(sub, 10);

    if (sub.length > 1) {
      const lastDigit = num % 10;
      if (lastDigit % 2 === 0 || lastDigit === 5) continue;
    }

    if (isPrime(num)) {
      currentPrimes.push(num);
      findPartitions(str, i + 1, currentPrimes, validSets);
      currentPrimes.pop();
    }
  }
};

function solve(digits) {
  if (cache.has(digits)) return cache.get(digits);

  const perms = getPermutations(digits);
  const validSets = new Set();

  for (const p of perms) {
    findPartitions(p, 0, [], validSets);
  }

  const sums = [];
  for (const s of validSets) {
    const parts = s.split(',').map(Number);
    let currentSum = 0;
    for (let x of parts) currentSum += x;
    sums.push(currentSum);
  }

  sums.sort((a, b) => a - b);
  cache.set(digits, sums);
  return sums;
};

function processData(input) {
  const lines = input.trim().split(/\s+/);
  if (lines.length === 0) return;

  const T = parseInt(lines[0], 10);

  for (let i = 1; i <= T; i++) {
    const digits = lines[i];
    const results = solve(digits);

    if (results.length > 0) {
      console.log(results.join('\n'));
    }
    console.log("");
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