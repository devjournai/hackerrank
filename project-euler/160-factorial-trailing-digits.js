/**
 * Factorial Trailing Digits
 * Time Complexity: O(q · log_b(n) · k^2)
 * Space Complexity: O(k · b^5)
 */

function processData(input) {
  let pos = 0;
  const len = input.length;

  function readWord() {
    while (pos < len && input.charCodeAt(pos) <= 32) pos++;
    if (pos >= len) return null;
    const start = pos;
    while (pos < len && input.charCodeAt(pos) > 32) pos++;
    return input.slice(start, pos);
  }

  const b = parseInt(readWord(), 10);
  const q = parseInt(readWord(), 10);

  const factors = [];
  let tempB = b;
  for (let i = 2; i * i <= tempB; i++) {
    if (tempB % i === 0) {
      let c = 0;
      while (tempB % i === 0) {
        tempB /= i;
        c++;
      }
      factors.push({ p: i, e: c });
    }
  }
  if (tempB > 1) factors.push({ p: tempB, e: 1 });

  function modPow(base, exp, mod) {
    let res = 1n;
    base %= mod;
    while (exp > 0n) {
      if (exp & 1n) res = (res * base) % mod;
      base = (base * base) % mod;
      exp >>= 1n;
    }
    return res;
  }

  function modInverse(a, p, mod) {
    const phi = mod - mod / p;
    return modPow(a, phi - 1n, mod);
  }

  function getLegendre(n, p) {
    let c = 0n;
    while (n > 0n) {
      n /= p;
      c += n;
    }
    return c;
  }

  const factorData = factors.map((f) => {
    const modNum = Math.pow(f.p, 5 * f.e);
    const mod = BigInt(modNum);
    const pre = new Int32Array(modNum + 1);
    let cur = 1n;
    pre[0] = 1;
    for (let i = 1; i <= modNum; i++) {
      if (i % f.p !== 0) cur = (cur * BigInt(i)) % mod;
      pre[i] = Number(cur);
    }
    return {
      p: BigInt(f.p),
      e: BigInt(f.e),
      mod,
      modNumBig: BigInt(modNum),
      pre,
      cycleVal: BigInt(pre[modNum]),
    };
  });

  function factNoP(n, d) {
    let r = 1n;
    while (n > 0n) {
      const cycles = n / d.modNumBig;
      const rem = Number(n % d.modNumBig);
      if (cycles & 1n) r = (r * d.cycleVal) % d.mod;
      if (rem > 0) r = (r * BigInt(d.pre[rem])) % d.mod;
      n /= d.p;
    }
    return r;
  }

  const bBig = BigInt(b);
  const globalMod = bBig ** 5n;

  const crt = factorData.map((fd) => {
    const Mi = globalMod / fd.mod;
    return { Mi, coeff: Mi * modInverse(Mi, fd.p, fd.mod) };
  });

  const invTable = factorData.map((fd) =>
    factorData.map((other) =>
      fd === other ? 1n : modInverse(other.p, fd.p, fd.mod),
    ),
  );

  const out = [];

  for (let _ = 0; _ < q; _++) {
    const s = readWord();
    let n = 0n;
    for (let i = 0; i < s.length; i++) {
      const code = s.charCodeAt(i);
      const val = code <= 57 ? code - 48 : code - 55;
      n = n * bBig + BigInt(val);
    }

    const E = factorData.map((fd) => getLegendre(n, fd.p));

    let Z = E[0] / factorData[0].e;
    for (let i = 1; i < E.length; i++) {
      const z = E[i] / factorData[i].e;
      if (z < Z) Z = z;
    }

    const rems = [];

    for (let i = 0; i < factorData.length; i++) {
      const fd = factorData[i];
      let v = factNoP(n, fd);

      for (let j = 0; j < factorData.length; j++) {
        const need = E[j] - Z * factorData[j].e;
        if (j !== i) {
          v = (v * modPow(invTable[i][j], E[j], fd.mod)) % fd.mod;
        }
        if (need > 0n) {
          v = (v * modPow(factorData[j].p, need, fd.mod)) % fd.mod;
        }
      }
      rems.push(v);
    }

    let ans = 0n;
    for (let i = 0; i < rems.length; i++) {
      ans = (ans + rems[i] * crt[i].coeff) % globalMod;
    }

    let r = ans.toString(b).toUpperCase();
    while (r.length < 5) r = "0" + r;
    out.push(r);
  }

  console.log(out.join("\n"));
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