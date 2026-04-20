/**
 * RSA Encryption
 * Time Complexity:  O(√φ + 2^t)
 * Space Complexity: O(t)
 */

process.stdin.resume();
process.stdin.setEncoding("ascii");

const MOD = 1000000007n;
const INV2 = 500000004n;

let input_stdin = "";
process.stdin.on("data", function (data) {
  input_stdin += data;
});

process.stdin.on("end", function () {
  if (input_stdin.trim() === "") return;
  const lines = input_stdin.trim().split("\n");
  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed.length > 0) {
      solve(trimmed);
    }
  }
});

function solve(line) {
  const parts = line.split(/\s+/);
  if (parts.length < 2) return;

  const p = BigInt(parts[0]);
  const q = BigInt(parts[1]);

  const phi = (p - 1n) * (q - 1n);
  const maxK = phi / 2n - 1n;

  const factors = getDistinctPrimeFactors(phi);
  const constraints = [];

  for (const f of factors) {
    if (f === 2n) {
      if ((p & 3n) === 1n || (q & 3n) === 1n) {
        constraints.push({ f: f, bad: [0n] });
      }
    } else {
      constraints.push({ f: f, bad: [0n, (f - 1n) >> 1n] });
    }
  }

  const result = getSumAndCountIEP(0, 1n, 0n, constraints, maxK);
  const totalSumE = (2n * result.sum + result.count) % MOD;

  console.log(totalSumE.toString());
};

function getSumAndCountIEP(idx, currentMod, currentRem, constraints, limit) {
  if (idx === constraints.length) {
    return calcArithmeticSum(currentMod, currentRem, limit);
  }

  const { f, bad } = constraints[idx];
  let res = getSumAndCountIEP(
    idx + 1,
    currentMod,
    currentRem,
    constraints,
    limit,
  );
  let totalSum = res.sum;
  let totalCount = res.count;

  for (const badRem of bad) {
    const crt = combineCRT(currentMod, currentRem, f, badRem);
    if (crt) {
      const subRes = getSumAndCountIEP(
        idx + 1,
        crt.mod,
        crt.rem,
        constraints,
        limit,
      );
      totalSum = (totalSum - subRes.sum + MOD) % MOD;
      totalCount = (totalCount - subRes.count + MOD) % MOD;
    }
  }

  return { sum: totalSum, count: totalCount };
};

function calcArithmeticSum(mod, rem, limit) {
  if (rem > limit) return { sum: 0n, count: 0n };

  const maxJ = (limit - rem) / mod;
  const count = (maxJ + 1n) % MOD;
  const n = maxJ % MOD;
  const tri = (n * (n + 1n)) % MOD;
  const triVal = (tri * INV2) % MOD;
  const term1 = ((mod % MOD) * triVal) % MOD;
  const term2 = ((rem % MOD) * count) % MOD;
  const sum = (term1 + term2) % MOD;

  return { sum, count };
};

function combineCRT(m1, r1, m2, r2) {
  let diff = (((r2 - r1) % m2) + m2) % m2;
  const inv = modInverse(m1, m2);
  if (inv === null) return null;

  const k = (diff * inv) % m2;
  const newMod = m1 * m2;
  const newRem = (m1 * k + r1) % newMod;

  return { mod: newMod, rem: newRem };
};

function modInverse(a, m) {
  let m0 = m,
    x0 = 0n,
    x1 = 1n;
  if (m === 1n) return 0n;

  a %= m;
  while (a > 1n) {
    if (m === 0n) return null;
    const q = a / m;
    let t = m;
    m = a % m;
    a = t;
    t = x0;
    x0 = x1 - q * x0;
    x1 = t;
  }

  return x1 < 0n ? x1 + m0 : x1;
};

function getDistinctPrimeFactors(n) {
  const factors = [];

  if ((n & 1n) === 0n) {
    factors.push(2n);
    while ((n & 1n) === 0n) n >>= 1n;
  }

  for (let d = 3n; d * d <= n; d += 2n) {
    if (n % d === 0n) {
      factors.push(d);
      while (n % d === 0n) n /= d;
    }
  }

  if (n > 1n) factors.push(n);
  return factors;
};