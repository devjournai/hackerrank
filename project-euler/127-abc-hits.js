/**
 * ABC Hits
 * Time Complexity: O(N^2 + T log T + (H + T) log N)
 * Space Complexity: O(N + T + H)
 */

function processData(input) {
  const tokens = input.trim().split(/\s+/);
  let tokenIdx = 0;

  const T = parseInt(tokens[tokenIdx++], 10);
  const queries = new Array(T);

  for (let i = 0; i < T; i++) {
    queries[i] = {
      id: i,
      r: parseFloat(tokens[tokenIdx++]),
      L: parseInt(tokens[tokenIdx++], 10),
    };
  }

  const MAX_L = 100000;
  const rad = new Int32Array(MAX_L + 1).fill(1);

  for (let i = 2; i <= MAX_L; i++) {
    if (rad[i] === 1) {
      for (let j = i; j <= MAX_L; j += i) {
        rad[j] *= i;
      }
    }
  }

  const hits = [];

  for (let c = 1; c <= MAX_L; c++) {
    const rad_c = rad[c];
    const limit = Math.pow(c, 1.5) / rad_c;

    if (limit < 2) continue;

    const half_c = c >> 1;
    for (let a = 1; a <= half_c; a++) {
      const b = c - a;

      if (rad[a] * rad[b] >= limit) continue;

      let x = a,
        y = b;
      while (y) {
        let t = y;
        y = x % y;
        x = t;
      }
      if (x !== 1) continue;

      const rad_abc = rad[a] * rad[b] * rad_c;
      const req_r = Math.log(rad_abc) / Math.log(c);

      if (req_r < 1.5) {
        hits.push({ r: req_r, c: c });
      }
    }
  }

  queries.sort((a, b) => a.r - b.r);
  hits.sort((a, b) => a.r - b.r);

  const results = new Float64Array(T);
  const bit = new Float64Array(MAX_L + 1);

  let hitIdx = 0;
  const numHits = hits.length;

  for (let i = 0; i < T; i++) {
    const q = queries[i];

    while (hitIdx < numHits && hits[hitIdx].r < q.r) {
      const val = hits[hitIdx].c;
      for (let idx = val; idx <= MAX_L; idx += idx & -idx) {
        bit[idx] += val;
      }
      hitIdx++;
    }

    let sum = 0;
    let queryIdx = q.L - 1 > MAX_L ? MAX_L : q.L - 1;

    for (; queryIdx > 0; queryIdx -= queryIdx & -queryIdx) {
      sum += bit[queryIdx];
    }

    results[q.id] = sum;
  }

  console.log(results.join("\n"));
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