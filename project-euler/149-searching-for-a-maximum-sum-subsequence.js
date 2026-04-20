/**
 * Searching for a Maximum Sum Subsequence
 * Time Complexity:  O(N^2)
 * Space Complexity: O(N^2)
 */

function processData(input) {
  const lines = input.trim().split("\n");
  let lineIdx = 0;

  const N = parseInt(lines[lineIdx++].trim());
  const l = parseInt(lines[lineIdx++].trim());
  const A = lines[lineIdx++].trim().split(/\s+/).map(Number);
  const f_init = lines[lineIdx++].trim().split(/\s+/).map(Number);
  const m = parseInt(lines[lineIdx++].trim());
  const B = lines[lineIdx++].trim().split(/\s+/).map(Number);
  const g_init = lines[lineIdx++].trim().split(/\s+/).map(Number);

  const limit = N * N;

  const f = new Int32Array(limit);
  const g = new Int32Array(limit);
  const grid = new Int32Array(limit);

  for (let i = 0; i < limit; i++) {
    if (i < 5) f[i] = f_init[i];
    else {
      let sum = f[i - 1] + f[i - 2] + f[i - 3] + f[i - 4] + f[i - 5];
      f[i] = sum % l;
    }
  }

  for (let i = 0; i < limit; i++) {
    if (i < 5) g[i] = g_init[i];
    else {
      let sum = g[i - 1] + g[i - 2] + g[i - 3] + g[i - 4] + g[i - 5];
      g[i] = sum % m;
    }
  }

  for (let i = 0; i < limit; i++) {
    grid[i] = A[f[i]] + B[g[i]];
  }

  let globalMax = -Infinity;
  const NEG_INF = -1e15;

  const rowSuffix = new Float64Array(N).fill(NEG_INF);
  const colSuffix = new Float64Array(N).fill(NEG_INF);
  const mainDiagSuffix = new Float64Array(2 * N + 1).fill(NEG_INF);

  const adTotal = new Float64Array(2 * N + 1).fill(0);
  const adPre = new Float64Array(2 * N + 1).fill(NEG_INF);
  const adSuf = new Float64Array(2 * N + 1).fill(NEG_INF);
  const adMax = new Float64Array(2 * N + 1).fill(NEG_INF);
  const adInit = new Int8Array(2 * N + 1).fill(0);

  function updateGlobal(val) {
    if (val > globalMax) globalMax = val;
  }

  for (let k = 0; k < N; k++) {
    for (let c = 0; c < k; c++) {
      let val = grid[k * N + c];
      colSuffix[c] = colSuffix[c] > 0 ? colSuffix[c] + val : val;
      updateGlobal(colSuffix[c]);
    }

    let rRun = 0;
    let rMax = NEG_INF;

    for (let c = 0; c <= k; c++) {
      let val = grid[k * N + c];
      rRun = rRun > 0 ? rRun + val : val;
      if (rRun > rMax) rMax = rRun;
    }

    updateGlobal(rMax);

    let run = 0;
    let maxSuf = NEG_INF;
    for (let c = k; c >= 0; c--) {
      run += grid[k * N + c];
      if (run > maxSuf) maxSuf = run;
    }
    rowSuffix[k] = maxSuf;

    for (let r = 0; r < k; r++) {
      let val = grid[r * N + k];
      rowSuffix[r] = rowSuffix[r] > 0 ? rowSuffix[r] + val : val;
      updateGlobal(rowSuffix[r]);
    }

    let cRun = 0;
    let cMax = NEG_INF;
    for (let r = 0; r <= k; r++) {
      let val = grid[r * N + k];
      cRun = cRun > 0 ? cRun + val : val;
      if (cRun > cMax) cMax = cRun;
    }

    updateGlobal(cMax);

    run = 0;
    maxSuf = NEG_INF;
    for (let r = k; r >= 0; r--) {
      run += grid[r * N + k];
      if (run > maxSuf) maxSuf = run;
    }
    colSuffix[k] = maxSuf;

    for (let c = 0; c <= k; c++) {
      let val = grid[k * N + c];
      let idx = k - c + N;
      mainDiagSuffix[idx] =
        mainDiagSuffix[idx] > 0 ? mainDiagSuffix[idx] + val : val;
      updateGlobal(mainDiagSuffix[idx]);
    }

    for (let r = 0; r < k; r++) {
      let val = grid[r * N + k];
      let idx = r - k + N;
      mainDiagSuffix[idx] =
        mainDiagSuffix[idx] > 0 ? mainDiagSuffix[idx] + val : val;
      updateGlobal(mainDiagSuffix[idx]);
    }

    for (let c = 0; c <= k; c++) {
      let val = grid[k * N + c];
      let s = k + c;

      if (adInit[s] === 0) {
        adInit[s] = 1;
        adTotal[s] = val;
        adPre[s] = val;
        adSuf[s] = val;
        adMax[s] = val;
      } else {
        let oldTotal = adTotal[s];
        let oldPre = adPre[s];
        let oldSuf = adSuf[s];
        let oldMax = adMax[s];

        adTotal[s] = oldTotal + val;
        adPre[s] = Math.max(oldPre, oldTotal + val);
        adSuf[s] = Math.max(val, oldSuf + val);
        adMax[s] = Math.max(oldMax, adSuf[s]);
      }

      updateGlobal(adMax[s]);
    }

    for (let r = 0; r < k; r++) {
      let val = grid[r * N + k];
      let s = r + k;

      if (adInit[s] === 0) {
        adInit[s] = 1;
        adTotal[s] = val;
        adPre[s] = val;
        adSuf[s] = val;
        adMax[s] = val;
      } else {
        let oldTotal = adTotal[s];
        let oldPre = adPre[s];
        let oldSuf = adSuf[s];
        let oldMax = adMax[s];

        adTotal[s] = val + oldTotal;
        adPre[s] = Math.max(val, val + oldPre);
        adSuf[s] = Math.max(oldSuf, oldTotal + val);
        adMax[s] = Math.max(oldMax, adPre[s]);
      }

      updateGlobal(adMax[s]);
    }

    console.log(globalMax);
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