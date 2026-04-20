/**
 * Minimal Network
 * Time Complexity: O(M \log M)$
 * Space Complexity: O(N + M)$
 */

function processData(input) {
  const lines = input.trim().split(/\s+/);
  let ptr = 0;

  const N = parseInt(lines[ptr++], 10);
  const M = parseInt(lines[ptr++], 10);

  const edges = [];
  for (let i = 0; i < M; i++) {
    const u = parseInt(lines[ptr++], 10);
    const v = parseInt(lines[ptr++], 10);
    const w = parseInt(lines[ptr++], 10);
    edges.push({ u, v, w });
  }

  edges.sort((a, b) => a.w - b.w);

  const parent = new Int32Array(N + 1);
  for (let i = 1; i <= N; i++) parent[i] = i;

  function find(i) {
    let root = i;
    while (root !== parent[root]) {
      root = parent[root];
    }
    let curr = i;
    while (curr !== root) {
      let next = parent[curr];
      parent[curr] = root;
      curr = next;
    }
    return root;
  }

  function union(i, j) {
    const rootI = find(i);
    const rootJ = find(j);
    if (rootI !== rootJ) {
      parent[rootI] = rootJ;
      return true;
    }
    return false;
  }

  let mstWeight = 0;
  let edgesCount = 0;

  for (let i = 0; i < M; i++) {
    const e = edges[i];
    if (union(e.u, e.v)) {
      mstWeight += e.w;
      edgesCount++;
    }
  }

  console.log(mstWeight);
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