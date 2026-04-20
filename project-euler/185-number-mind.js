/*
 * Number Mind
 * Time Complexity: O(10^(L/2) * N)
 * Space Complexity: O(10^(L/2))
 */

function processData(input) {
  const lines = input.trim().split("\n");
  if (lines.length < 2) return;

  let lineIdx = 0;
  while (lineIdx < lines.length && !lines[lineIdx].trim()) lineIdx++;
  const N = parseInt(lines[lineIdx++].trim(), 10);

  const guesses = [];
  for (let i = 0; i < N; i++) {
    while (lineIdx < lines.length && !lines[lineIdx].trim()) lineIdx++;
    if (lineIdx >= lines.length) break;

    const parts = lines[lineIdx++].trim().split(/\s+/);
    guesses.push({
      str: parts[0],
      target: parseInt(parts[1], 10),
    });
  }

  const HALF_LEN = 6;
  const TOTAL_LEN = 12;

  const firstHalfMap = new Map();
  const currentMatches = new Int8Array(N);

  function generateFirstHalf(idx, currentStr) {
    if (idx === HALF_LEN) {
      const key = currentMatches.join("");
      if (!firstHalfMap.has(key)) {
        firstHalfMap.set(key, currentStr);
      }
      return;
    }

    for (let d = 0; d <= 9; d++) {
      const char = String(d);
      let possible = true;

      for (let i = 0; i < N; i++) {
        if (guesses[i].str[idx] === char) currentMatches[i]++;
        if (currentMatches[i] > guesses[i].target) possible = false;
      }

      if (possible) generateFirstHalf(idx + 1, currentStr + char);

      for (let i = 0; i < N; i++) {
        if (guesses[i].str[idx] === char) currentMatches[i]--;
      }
    }
  }

  generateFirstHalf(0, "");

  let finalAnswer = null;

  function generateSecondHalf(idx, currentStr) {
    if (finalAnswer) return;

    if (idx === TOTAL_LEN) {
      let keyBuilder = "";

      for (let i = 0; i < N; i++) {
        keyBuilder += guesses[i].target - currentMatches[i];
      }

      if (firstHalfMap.has(keyBuilder)) {
        finalAnswer = firstHalfMap.get(keyBuilder) + currentStr;
      }
      return;
    }

    for (let d = 0; d <= 9; d++) {
      const char = String(d);
      let possible = true;

      for (let i = 0; i < N; i++) {
        if (guesses[i].str[idx] === char) currentMatches[i]++;
        if (currentMatches[i] > guesses[i].target) possible = false;
      }

      if (possible) generateSecondHalf(idx + 1, currentStr + char);
      if (finalAnswer) return;

      for (let i = 0; i < N; i++) {
        if (guesses[i].str[idx] === char) currentMatches[i]--;
      }
    }
  }

  generateSecondHalf(HALF_LEN, "");
  console.log(finalAnswer);
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