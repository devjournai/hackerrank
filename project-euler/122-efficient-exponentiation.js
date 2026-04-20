/**
 * Efficient Exponentiation
 * Time Complexity: O(T * K^1.5) approx via IDDFS
 * Space Complexity: O(log K)
 */

const solutionCache = new Map();

function solve(k) {
  if (solutionCache.has(k)) return solutionCache.get(k);
  let lowerBound = 0;
  let temp = 1;
  while (temp < k) {
    temp *= 2;
    lowerBound++;
  }

  for (let depth = lowerBound; ; depth++) {
    const path = new Int32Array(depth + 1);
    path[0] = 1;
    if (dfs(1, depth, k, path)) {
      const result = Array.from(path);
      solutionCache.set(k, result);
      return result;
    }
  }
};

function dfs(currentIdx, maxDepth, target, path) {
  const currentVal = path[currentIdx - 1];

  if (currentVal === target) {
    return true;
  }

  if (currentIdx > maxDepth) {
    return false;
  }

  const remainingSteps = maxDepth - (currentIdx - 1);
  if (currentVal * (1 << remainingSteps) < target) {
    return false;
  }

  for (let i = currentIdx - 1; i >= 0; i--) {
    const nextVal = currentVal + path[i];

    if (nextVal <= currentVal) break;
    if (nextVal > target) continue;

    path[currentIdx] = nextVal;

    if (dfs(currentIdx + 1, maxDepth, target, path)) {
      return true;
    }
  }

  return false;
};

function processData(input) {
  const tokens = input.trim().split(/\s+/);
  if (tokens.length === 0) return;

  const T = parseInt(tokens[0], 10);
  let ptr = 1;

  for (let i = 0; i < T; i++) {
    const k = parseInt(tokens[ptr++], 10);

    if (k === 1) {
      console.log(0);
      continue;
    }

    const chain = solve(k);
    const steps = chain.length - 1;
    console.log(steps);

    for (let j = 1; j < chain.length; j++) {
      const result = chain[j];
      const op1 = chain[j - 1];
      const op2 = result - op1;
      const s1 = op1 === 1 ? "n^1" : `n^${op1}`;
      const s2 = op2 === 1 ? "n^1" : `n^${op2}`;
      const s3 = `n^${result}`;
      console.log(`${s1} * ${s2} = ${s3}`);
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