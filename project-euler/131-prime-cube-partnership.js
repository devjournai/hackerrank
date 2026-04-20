/**
 * Prime Cube Partnership
 * Time Complexity: O(sqrt(L_max) + Z_max * log(log(sqrt(L_max))) + T * log(Count))
 * Space Complexity: O(Z_max)
 */

function processData(input) {
  const tokens = input.trim().split(/\s+/);
  if (tokens.length === 0) return;

  let tIndex = 0;
  const T = parseInt(tokens[tIndex++], 10);
  const queries = [];
  let maxL = 0;

  for (let i = 0; i < T; i++) {
    const val = parseFloat(tokens[tIndex++]);
    queries.push(val);
    if (val > maxL) maxL = val;
  }

  if (maxL <= 7) {
    queries.forEach(() => console.log(0));
    return;
  }

  const Z_LIMIT = Math.floor(Math.sqrt((maxL - 1) / 3)) + 5;

  const SIEVE_LIMIT = Math.floor(Math.sqrt(maxL)) + 1000;

  const sieve = new Uint8Array(SIEVE_LIMIT + 1);
  sieve[0] = 1;
  sieve[1] = 1;
  for (let i = 2; i * i <= SIEVE_LIMIT; i++) {
    if (sieve[i] === 0) {
      for (let j = i * i; j <= SIEVE_LIMIT; j += i) {
        sieve[j] = 1;
      }
    }
  }

  const sievingPrimes = [];
  for (let p = 2; p <= SIEVE_LIMIT; p++) {
    if (sieve[p] === 0) {
      if (p > 3 && p % 3 === 1) {
        sievingPrimes.push(p);
      }
    }
  }

  const isPolyComposite = new Uint8Array(Z_LIMIT + 1);

  function modPow(base, exp, m) {
    let res = 1n;
    let b = BigInt(base);
    let e = BigInt(exp);
    let mod = BigInt(m);
    while (e > 0n) {
      if (e & 1n) res = (res * b) % mod;
      b = (b * b) % mod;
      e >>= 1n;
    }
    return Number(res);
  }

  function modInverse(n, m) {
    return modPow(n, m - 2, m);
  }

  function tonelliShanks(n, p) {
    if ((p & 3) === 3) {
      return modPow(n, (p + 1) / 4, p);
    }

    let s = 0;
    let q = p - 1;
    while ((q & 1) === 0) {
      q >>= 1;
      s++;
    }

    let z = 2;
    while (modPow(z, (p - 1) / 2, p) !== p - 1) {
      z++;
    }

    let m = s;
    let c = modPow(z, q, p);
    let t = modPow(n, q, p);
    let r = modPow(n, (q + 1) / 2, p);

    while (t !== 0 && t !== 1) {
      let t2i = t;
      let i = 0;
      for (i = 1; i < m; i++) {
        t2i = Number((BigInt(t2i) * BigInt(t2i)) % BigInt(p));
        if (t2i === 1) break;
      }
      let b = c;
      for (let k = 0; k < m - i - 1; k++) {
        b = Number((BigInt(b) * BigInt(b)) % BigInt(p));
      }
      m = i;
      c = Number((BigInt(b) * BigInt(b)) % BigInt(p));
      t = Number((BigInt(t) * BigInt(c)) % BigInt(p));
      r = Number((BigInt(r) * BigInt(b)) % BigInt(p));
    }
    return r;
  }

  for (const q of sievingPrimes) {
    let y = tonelliShanks(q - 3, q);
    let inv6 = modInverse(6, q);
    let roots = [];

    let r1 = Number(((BigInt(y) - 3n) * BigInt(inv6)) % BigInt(q));
    if (r1 < 0) r1 += q;
    roots.push(r1);

    let r2 = Number(((BigInt(-y) - 3n) * BigInt(inv6)) % BigInt(q));
    if (r2 < 0) r2 += q;
    if (r1 !== r2) roots.push(r2);

    for (let r of roots) {
      for (let z = r; z <= Z_LIMIT; z += q) {
        if (z === 0) continue;
        let val = 3 * z * z + 3 * z + 1;
        if (val > q) {
          isPolyComposite[z] = 1;
        }
      }
    }
  }

  const validPrimes = [];
  for (let z = 1; z <= Z_LIMIT; z++) {
    if (isPolyComposite[z] === 0) {
      validPrimes.push(3 * z * z + 3 * z + 1);
    }
  }

  function countPrimesLess(limit) {
    let low = 0,
      high = validPrimes.length;
    while (low < high) {
      let mid = (low + high) >>> 1;
      if (validPrimes[mid] < limit) {
        low = mid + 1;
      } else {
        high = mid;
      }
    }
    return low;
  }

  for (const L of queries) {
    console.log(countPrimesLess(L));
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