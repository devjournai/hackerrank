"use strict";

process.stdin.resume();
process.stdin.setEncoding("utf-8");

let inputString = "";
let currentLine = 0;

process.stdin.on("data", function (inputStdin) {
  inputString += inputStdin;
});

process.stdin.on("end", function () {
  inputString = inputString.split("\n");

  main();
});

function readLine() {
  return inputString[currentLine++];
}

/*
 * Complete the 'findCombinationsByWeightIndices' function below.
 *
 * The function is expected to return a 2D_INTEGER_ARRAY.
 * The function accepts following parameters:
 *  1. INTEGER_ARRAY weights
 *  2. INTEGER capacity
 */

function explore(w, cap, weights, dp) {
  if (cap < 0 || w < 0 || !dp[cap][w]) return [];
  if (cap === 0) return [[]];

  let result = [];

  const subResultExclude = explore(w - 1, cap, weights, dp);

  for (const path of subResultExclude) {
    result.push(path);
  }

  if (cap - weights[w] >= 0) {
    const subResultInclude = explore(w, cap - weights[w], weights, dp);

    for (const path of subResultInclude) {
      result.push([...path, w]);
    }
  }

  return result;
}

function findCombinationsByWeightIndices(weights, capacity) {
  const dp = Array.from({ length: capacity + 1 }, () =>
    new Array(weights.length).fill(false),
  );

  for (let i = 0; i < weights.length; i++) {
    dp[0][i] = true;
  }

  for (let cap = 1; cap <= capacity; cap++) {
    for (let i = 0; i < weights.length; i++) {
      if (i > 0 && dp[cap][i - 1]) {
        dp[cap][i] = true;
      } else if (cap - weights[i] >= 0) {
        if (dp[cap - weights[i]][i]) {
          dp[cap][i] = true;
        }
      }
    }
  }

  return explore(weights.length - 1, capacity, weights, dp);
}

function main() {
  const weightsCount = parseInt(readLine().trim(), 10);

  let weights = [];

  for (let i = 0; i < weightsCount; i++) {
    const weightsItem = parseInt(readLine().trim(), 10);
    weights.push(weightsItem);
  }

  const capacity = parseInt(readLine().trim(), 10);

  const result = findCombinationsByWeightIndices(weights, capacity);

  process.stdout.write(result.map((x) => x.join(" ")).join("\n") + "\n");
}
