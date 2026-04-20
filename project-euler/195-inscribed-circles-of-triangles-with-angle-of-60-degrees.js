/*
 * Inscribed Circles of Triangles with Angle of 60 Degrees
 * Time Complexity: O(Q * sqrt(N) * d(y))
 * Space Complexity: O(MAX_SQRT)
 */

function bigSqrt(n) {
  if (n < 0n) throw new Error("sqrt of negative");
  if (n < 2n) return n;

  let x = BigInt(Math.floor(Math.sqrt(Number(n))));
  let limit = 20;

  while (limit--) {
    let y = (x + n / x) / 2n;
    if (y >= x) return x;
    x = y;
  }
  return x;
};

function processData(input) {
  const lines = input.trim().split(/\s+/);
  if (lines.length === 0) return;

  const Q = parseInt(lines[0], 10);
  const results = [];

  const MAX_SQRT = 65000;
  const mu = new Int8Array(MAX_SQRT + 1);
  mu[1] = 1;
  const primes = [];
  const is_composite = new Uint8Array(MAX_SQRT + 1);

  for (let i = 2; i <= MAX_SQRT; i++) {
    if (!is_composite[i]) {
      primes.push(i);
      mu[i] = -1;
    }
    for (let p of primes) {
      if (i * p > MAX_SQRT) break;
      is_composite[i * p] = 1;
      if (i % p === 0) {
        mu[i * p] = 0;
        break;
      } else {
        mu[i * p] = -mu[i];
      }
    }
  }

  function sumFloors(limit, lower, upper) {
    if (lower > upper) return 0n;
    let sum = 0n;
    let i = lower;

    while (i <= upper) {
      let val = Math.floor(limit / i);
      if (val === 0) break;

      let next_i = Math.floor(limit / val) + 1;
      if (next_i > upper + 1) next_i = upper + 1;

      sum += BigInt(val) * BigInt(next_i - i);
      i = next_i;
    }

    return sum;
  }

  function sumFloorsMod(limit, lower, upper, badMod) {
    if (lower > upper) return 0n;

    let total = sumFloors(limit, lower, upper);

    let jMin = Math.ceil((lower - badMod) / 3);
    let jMax = Math.floor((upper - badMod) / 3);

    if (jMin > jMax) return total;

    let sub = 0n;

    for (let j = jMin; j <= jMax; ) {
      let k = 3 * j + badMod;
      if (k <= 0) {
        j++;
        continue;
      }

      let val = Math.floor(limit / k);
      if (val === 0) break;

      let maxK = Math.floor(limit / val);
      let maxJ = Math.floor((maxK - badMod) / 3);
      if (maxJ > jMax) maxJ = jMax;

      sub += BigInt(maxJ - j + 1) * BigInt(val);
      j = maxJ + 1;
    }

    return total - sub;
  }

  function invMod3(x) {
    x %= 3;
    if (x < 0) x += 3;
    if (x === 1) return 1;
    if (x === 2) return 2;
    return -1;
  }

  for (let q = 1; q <= Q; q++) {
    const N_val = lines[q];
    const Bn = BigInt(N_val);

    const Limit1 = Number(bigSqrt((4n * Bn * Bn) / 3n));
    const Limit2 = Number(bigSqrt(12n * Bn * Bn));

    let totalCount = 0n;
    const Y_MAX = Math.floor(Math.sqrt(Limit2));

    for (let y = 1; y <= Y_MAX; y++) {
      const divisors = [];
      for (let d = 1; d * d <= y; d++) {
        if (y % d === 0) {
          divisors.push(d);
          if (d * d !== y) divisors.push(y / d);
        }
      }

      for (let d of divisors) {
        if (mu[d] === 0) continue;

        let kMin = Math.floor(y / d) + 1;

        let term1 = 0n;
        let term2 = 0n;

        let kMax1 = Math.floor(Math.floor(Limit1 / y) / d);

        if (kMax1 >= kMin) {
          let badMod = -1;

          if (y % 3 === 0) {
            if (d % 3 !== 0) badMod = 0;
            else badMod = -2;
          } else {
            let invD = invMod3(d);
            let target = (3 - (y % 3)) % 3;
            badMod = (2 * target * invD) % 3;
          }

          if (badMod !== -2) {
            term1 = sumFloorsMod(
              Math.floor(Limit1 / (y * d)),
              kMin,
              kMax1,
              badMod,
            );
          }
        }

        let kMax2 = Math.floor(Math.floor(Limit2 / y) / d);

        if (kMax2 >= kMin) {
          let reqMod = -1;

          if (y % 3 === 0) {
            if (d % 3 === 0) reqMod = -1;
            else reqMod = 0;
          } else {
            let invD = invMod3(d);
            let target = (3 - (y % 3)) % 3;
            reqMod = (2 * target * invD) % 3;
          }

          let innerLim = Math.floor(Limit2 / (y * d));

          if (reqMod === -1) {
            term2 = sumFloors(innerLim, kMin, kMax2);
          } else {
            let jMin = Math.ceil((kMin - reqMod) / 3);
            let jMax = Math.floor((kMax2 - reqMod) / 3);

            for (let j = jMin; j <= jMax; ) {
              let k = 3 * j + reqMod;
              if (k <= 0) {
                j++;
                continue;
              }

              let val = Math.floor(innerLim / k);
              if (val === 0) break;

              let maxK = Math.floor(innerLim / val);
              let maxJ = Math.floor((maxK - reqMod) / 3);
              if (maxJ > jMax) maxJ = jMax;

              term2 += BigInt(maxJ - j + 1) * BigInt(val);
              j = maxJ + 1;
            }
          }
        }

        if (mu[d] === 1) totalCount += term1 + term2;
        else totalCount -= term1 + term2;
      }
    }

    results.push(totalCount.toString());
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