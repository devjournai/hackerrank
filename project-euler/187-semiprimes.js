/**
 * Semiprimes
 * Time Complexity: O(M log log M + T * pi(sqrt(M)) * log(pi(M))) where M is max(N)/2
 * Space Complexity: O(M) for the Sieve and Primes array
 */

function processData(input) {
  const lines = input.trim().split(/\s+/);
  if (lines.length === 0) return;

  let lineIdx = 0;
  const T = parseInt(lines[lineIdx++]);

  const queries = [];
  let maxN = 0;

  for (let i = 0; i < T; i++) {
    const n = parseInt(lines[lineIdx++]);
    queries.push(n);
    if (n > maxN) maxN = n;
  }

  const limit = Math.floor(maxN / 2);
  const sieveLimit = limit + 1;

  const isComposite = new Uint8Array(sieveLimit);
  const primes = [];

  if (sieveLimit > 2) primes.push(2);

  for (let i = 3; i < sieveLimit; i += 2) {
    if (isComposite[i] === 0) {
      primes.push(i);
      if (i * i < sieveLimit) {
        for (let j = i * i; j < sieveLimit; j += 2 * i) {
          isComposite[j] = 1;
        }
      }
    }
  }

  function findUpperBoundIndex(val) {
    let l = 0;
    let r = primes.length - 1;
    let res = -1;

    while (l <= r) {
      const mid = (l + r) >>> 1;
      if (primes[mid] <= val) {
        res = mid;
        l = mid + 1;
      } else {
        r = mid - 1;
      }
    }
    return res;
  }

  for (const N of queries) {
    let count = 0;

    const sqrtN = Math.sqrt(N);

    for (let i = 0; i < primes.length; i++) {
      const p = primes[i];

      if (p >= sqrtN && p * p >= N) break;

      const maxQ = Math.floor((N - 1) / p);

      const idx = findUpperBoundIndex(maxQ);

      if (idx >= i) {
        count += idx - i + 1;
      }
    }
    console.log(count);
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