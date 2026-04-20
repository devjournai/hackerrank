/**
 * Connectedness of a Network
 * Time Complexity: O(M * alpha(N))
 * Space Complexity: O(N)
 */

function processData(input) {
  const lines = input.trim().split("\n");
  const [pmStr, pStr] = lines[0].trim().split(/\s+/);
  const pm = parseInt(pmStr, 10);
  const p = parseInt(pStr, 10);

  const TOTAL_USERS = 1000000;
  const targetSize = Math.ceil((TOTAL_USERS * p) / 100);

  if (targetSize <= 1) {
    console.log(0);
    return;
  }

  const parent = new Int32Array(TOTAL_USERS);
  const size = new Int32Array(TOTAL_USERS);

  for (let i = 0; i < TOTAL_USERS; i++) {
    parent[i] = i;
    size[i] = 1;
  }

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
      if (size[rootI] < size[rootJ]) {
        parent[rootI] = rootJ;
        size[rootJ] += size[rootI];
      } else {
        parent[rootJ] = rootI;
        size[rootI] += size[rootJ];
      }
      return true;
    }
    return false;
  }

  const MAX_S_SIZE = 20000000;
  const S = new Int32Array(MAX_S_SIZE);

  for (let k = 1; k <= 55; k++) {
    let val = (100003 - 200003 * k + 300007 * Math.pow(k, 3)) % 1000000;
    if (val < 0) val += 1000000;
    S[k] = val;
  }

  let kGen = 55;
  let successfulCalls = 0;
  let n = 1;

  while (true) {
    const neededK = 2 * n;

    while (kGen < neededK) {
      kGen++;
      let val = S[kGen - 24] + S[kGen - 55];
      if (val >= 1000000) val -= 1000000;
      S[kGen] = val;
    }

    const caller = S[2 * n - 1];
    const called = S[2 * n];

    if (caller !== called) {
      successfulCalls++;
      union(caller, called);

      if (size[find(pm)] >= targetSize) {
        console.log(successfulCalls);
        break;
      }
    }

    n++;

    if (n * 2 >= MAX_S_SIZE) {
      break;
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
