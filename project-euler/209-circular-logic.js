/*
 * Circular Logic
 * Time Complexity: O(2^2n)
 * Space Complexity: O(2^2n)
 */

function processData(input) {
  const lines = input
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter((l) => l.length > 0);
  let lineIdx = 0;

  if (lineIdx >= lines.length) return;
  const q = parseInt(lines[lineIdx++]);

  for (let i = 0; i < q; i++) {
    if (lineIdx >= lines.length) break;
    const n = parseInt(lines[lineIdx++]);

    const F_exprs = [];
    const G_exprs = [];

    for (let j = 0; j < n; j++) F_exprs.push(lines[lineIdx++]);
    for (let j = 0; j < n; j++) G_exprs.push(lines[lineIdx++]);

    console.log(solveTestCase(n, F_exprs, G_exprs).toString());
  }
};

function solveTestCase(n, F_exprs, G_exprs) {
  const numInputs = 1 << n;
  const bad = new Uint8Array(numInputs);
  const adj = Array.from({ length: numInputs }, () => new Set());

  for (let a = 0; a < numInputs; a++) {
    let u = 0;
    let v = 0;

    for (let bit = 0; bit < n; bit++) {
      const valF = evaluate(F_exprs[bit], a, n);
      if (valF) u |= 1 << (n - 1 - bit);

      const valG = evaluate(G_exprs[bit], a, n);
      if (valG) v |= 1 << (n - 1 - bit);
    }

    if (u === v) {
      bad[u] = 1;
    } else {
      adj[u].add(v);
      adj[v].add(u);
    }
  }

  const visited = new Uint8Array(numInputs);
  let totalCount = 1n;

  for (let i = 0; i < numInputs; i++) {
    if (bad[i] || visited[i]) continue;

    const component = [];
    const queue = [i];
    visited[i] = 1;

    while (queue.length > 0) {
      const curr = queue.shift();
      component.push(curr);

      for (const neighbor of adj[curr]) {
        if (bad[neighbor]) continue;
        if (!visited[neighbor]) {
          visited[neighbor] = 1;
          queue.push(neighbor);
        }
      }
    }

    totalCount *= countComponentIS(component, adj, bad);
  }

  return totalCount;
};

function countComponentIS(nodes, globalAdj, bad) {
  const k = nodes.length;
  const nodeToIdx = new Map();
  nodes.forEach((val, idx) => nodeToIdx.set(val, idx));

  const localAdj = new BigInt64Array(k);
  for (let i = 0; i < k; i++) {
    const u = nodes[i];
    let mask = 0n;
    for (const v of globalAdj[u]) {
      if (!bad[v] && nodeToIdx.has(v)) {
        mask |= 1n << BigInt(nodeToIdx.get(v));
      }
    }
    localAdj[i] = mask;
  }

  const memo = new Map();

  function solve(mask) {
    if (mask === 0n) return 1n;
    if (memo.has(mask)) return memo.get(mask);

    let bestNode = -1;
    let bestDeg = 1000;
    let maxDegNode = -1;
    let maxDeg = -1;

    for (let i = 0; i < k; i++) {
      if (!((mask >> BigInt(i)) & 1n)) continue;

      const neighbors = localAdj[i] & mask;

      if (neighbors === 0n) {
        bestNode = i;
        bestDeg = 0;
        break;
      }

      if ((neighbors & (neighbors - 1n)) === 0n) {
        if (bestDeg > 1) {
          bestNode = i;
          bestDeg = 1;
        }
        continue;
      }

      let d = 0;
      let temp = neighbors;
      while (temp > 0n) {
        temp &= temp - 1n;
        d++;
      }

      if (d > maxDeg) {
        maxDeg = d;
        maxDegNode = i;
      }
    }

    let res = 0n;

    if (bestDeg === 0) {
      res = 2n * solve(mask ^ (1n << BigInt(bestNode)));
    } else if (bestDeg === 1) {
      const uBit = 1n << BigInt(bestNode);
      const neighborBit = localAdj[bestNode] & mask;
      res = solve(mask ^ uBit) + solve(mask ^ uBit ^ neighborBit);
    } else {
      const u = maxDegNode;
      const uBit = 1n << BigInt(u);
      const neighborBits = localAdj[u] & mask;
      res = solve(mask ^ uBit) + solve((mask ^ uBit) & ~neighborBits);
    }

    memo.set(mask, res);
    return res;
  }

  return solve((1n << BigInt(k)) - 1n);
};

function evaluate(expr, val, n) {
  let pos = 0;

  function parseSummand() {
    if (pos < expr.length) {
      if (expr[pos] === "0") {
        pos++;
        return 0;
      }
      if (expr[pos] === "1") {
        pos++;
        return 1;
      }
    }
    return parseProduct();
  }

  function parseProduct() {
    let res = parseLetter();
    while (pos < expr.length && expr[pos] === "&") {
      pos++;
      res &= parseProduct();
    }
    return res;
  }

  function parseLetter() {
    pos++;
    let idx = 0;
    while (pos < expr.length) {
      const code = expr.charCodeAt(pos);
      if (code >= 48 && code <= 57) {
        idx = idx * 10 + (code - 48);
        pos++;
      } else break;
    }
    return (val >> (n - idx)) & 1;
  }

  let res = parseSummand();
  while (pos < expr.length && expr[pos] === "+") {
    pos++;
    res ^= parseSummand();
  }

  return res;
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