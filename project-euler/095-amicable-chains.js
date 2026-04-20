/**
 * Amicable Chains
 * Time Complexity: O(N log N)
 * Space Complexity: O(N)
 */

function processData(input) {
  const N = Number(input.trim());

  const divSum = new Array(N + 1).fill(1);
  divSum[0] = 0;
  divSum[1] = 0;

  for (let i = 2; i <= N / 2; i++) {
    for (let j = i * 2; j <= N; j += i) {
      divSum[j] += i;
    }
  }

  const visited = new Array(N + 1).fill(false);

  let bestLen = 0;
  let bestMin = 0;

  for (let i = 2; i <= N; i++) {
    if (visited[i]) continue;

    let curr = i;
    const map = new Map();
    let step = 0;

    while (curr <= N && curr > 0 && !map.has(curr)) {
      map.set(curr, step++);
      curr = divSum[curr];
    }

    if (map.has(curr)) {
      const start = map.get(curr);
      const chain = [];

      for (const [k, v] of map.entries()) {
        if (v >= start) chain.push(k);
      }

      let valid = true;
      for (const x of chain) {
        if (x > N) {
          valid = false;
          break;
        }
      }

      if (valid) {
        if (chain.length > bestLen) {
          bestLen = chain.length;
          bestMin = Math.min(...chain);
        } else if (chain.length === bestLen) {
          bestMin = Math.min(bestMin, Math.min(...chain));
        }
      }
    }

    curr = i;
    while (curr <= N && curr > 0 && !visited[curr]) {
      visited[curr] = true;
      curr = divSum[curr];
    }
  }

  console.log(bestMin.toString());
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