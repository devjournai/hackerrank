/**
 * Primes with runs
 * Time Complexity: O(T * n^2 * log^3(V))
 * Space Complexity: O(n)
 */

function processData(input) {
  const tokens = input.trim().split(/\s+/);
  let tokenIdx = 0;
  const T = parseInt(tokens[tokenIdx++]);

  for (let i = 0; i < T; i++) {
    const n = parseInt(tokens[tokenIdx++]);
    const d = parseInt(tokens[tokenIdx++]);
    solve(n, d);
  }
};

function solve(n, d) {
  for (let changes = 0; changes <= n; changes++) {
    const results = [];
    const indices = getCombinations(n, changes);

    for (const combo of indices) {
      generateCandidates(n, d, combo, 0, [], results);
    }

    if (results.length > 0) {
      results.sort((a, b) => {
        if (a < b) return -1;
        if (a > b) return 1;
        return 0;
      });
      console.log(results.join(' '));
      return;
    }
  }
};

function getCombinations(n, k) {
  const result = [];
  function backtrack(start, current) {
    if (current.length === k) {
      result.push([...current]);
      return;
    }
    for (let i = start; i < n; i++) {
      current.push(i);
      backtrack(i + 1, current);
      current.pop();
    }
  }
  backtrack(0, []);
  return result;
};

function generateCandidates(n, d, indices, idxPtr, currentAssignments, results) {
  if (idxPtr === indices.length) {
    const digits = new Array(n).fill(d);
    for (let i = 0; i < indices.length; i++) {
      digits[indices[i]] = currentAssignments[i];
    }

    if (digits[0] === 0) return;

    const lastDigit = digits[n - 1];
    if (lastDigit % 2 === 0 || lastDigit === 5) return;

    const numStr = digits.join('');
    const bigVal = BigInt(numStr);

    if (isPrime(bigVal)) {
      results.push(bigVal);
    }
    return;
  }

  for (let v = 0; v <= 9; v++) {
    if (v === d) continue;
    currentAssignments.push(v);
    generateCandidates(n, d, indices, idxPtr + 1, currentAssignments, results);
    currentAssignments.pop();
  }
};

function power(base, exponent, modulus) {
  let result = 1n;
  base = base % modulus;
  while (exponent > 0n) {
    if (exponent % 2n === 1n) result = (result * base) % modulus;
    exponent = exponent >> 1n;
    base = (base * base) % modulus;
  }
  return result;
};

function isPrime(n) {
  if (n < 2n) return false;
  if (n === 2n || n === 3n) return true;
  if (n % 2n === 0n || n % 3n === 0n) return false;

  let d = n - 1n;
  let s = 0n;
  while (d % 2n === 0n) {
    d /= 2n;
    s++;
  }

  const bases = [2n, 3n, 5n, 7n, 11n, 13n, 17n, 19n, 23n, 29n, 31n, 37n];
  for (const a of bases) {
    if (n <= a) break;
    let x = power(a, d, n);
    if (x === 1n || x === n - 1n) continue;
    let composite = true;
    for (let r = 1n; r < s; r++) {
      x = (x * x) % n;
      if (x === n - 1n) {
        composite = false;
        break;
      }
    }
    if (composite) return false;
  }
  return true;
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