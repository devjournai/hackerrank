/**
 * Paper Sheets of Standard Sizes - An Expected Value Problem
 * Time Complexity: O(S * N^2)
 * Space Complexity: O(S * N)
 */

function processData(input) {
  const N = parseInt(input.trim());
  const MOD = 1000000007n;

  function power(base, exp) {
    let res = 1n;
    base = base % MOD;
    while (exp > 0n) {
      if (exp % 2n === 1n) res = (res * base) % MOD;
      base = (base * base) % MOD;
      exp /= 2n;
    }
    return res;
  }

  function modInverse(n) {
    return power(n, MOD - 2n);
  }

  const memo = new Map();
  const allStates = new Set();

  function getKey(counts) {
    return counts.join(" ");
  }

  function solve(counts) {
    const key = getKey(counts);

    if (memo.has(key)) return memo.get(key);

    const totalSheets = counts.reduce((sum, val) => sum + val, 0);

    if (totalSheets === 0) {
      allStates.add(key);
      memo.set(key, 0n);
      return 0n;
    }

    let currentExpected = 0n;

    if (totalSheets === 1) {
      currentExpected = 1n;
    }

    const invTotal = modInverse(BigInt(totalSheets));

    for (let i = 0; i < N; i++) {
      if (counts[i] > 0) {
        const nextCounts = [...counts];
        nextCounts[i]--;
        if (i < N - 1) {
          for (let j = i + 1; j < N; j++) {
            nextCounts[j]++;
          }
        }

        const prob = (BigInt(counts[i]) * invTotal) % MOD;
        const nextVal = solve(nextCounts);
        const term = (prob * nextVal) % MOD;
        currentExpected = (currentExpected + term) % MOD;
      }
    }

    allStates.add(key);
    memo.set(key, currentExpected);
    return currentExpected;
  }

  const startCounts = new Array(N).fill(0);
  startCounts[0] = 1;

  solve(startCounts);

  const sortedKeys = Array.from(allStates).sort((a, b) => {
    const arrA = a.split(" ").map(Number);
    const arrB = b.split(" ").map(Number);
    for (let i = 0; i < N; i++) {
      if (arrA[i] !== arrB[i]) return arrA[i] - arrB[i];
    }
    return 0;
  });

  const outputBuffer = [];
  for (const key of sortedKeys) {
    outputBuffer.push(`${key}: ${memo.get(key)}`);
  }
  console.log(outputBuffer.join("\n"));
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