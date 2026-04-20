/*
 * Squarefree Numbers
 * Time Complexity: O(limit + SIEVE_SIZE log log SIEVE_SIZE)
 * Space Complexity: O(SIEVE_SIZE)
 */

function processData(input) {
  const tokens = input.trim().split(/\s+/);
  if (tokens.length < 2) return;

  const N_str = tokens[0];
  const K_str = tokens[1];

  const N = BigInt(N_str);
  const K = BigInt(K_str);

  if (K === 1n) {
    console.log("1");
    return;
  }

  if (K >= 60n) {
    console.log(N.toString());
    return;
  }

  const kNum = Number(K);

  let limit = Math.floor(Math.pow(Number(N_str), 1 / kNum));
  let limitBig = BigInt(limit);

  if ((limitBig + 1n) ** K <= N) limit++;
  else if (limitBig ** K > N) limit--;

  const SIEVE_SIZE = Math.min(limit, 2000000);

  const mu = new Int8Array(SIEVE_SIZE + 1);
  const primes = [];
  const isPrime = new Uint8Array(SIEVE_SIZE + 1);

  isPrime.fill(1);
  isPrime[0] = isPrime[1] = 0;

  mu[1] = 1;

  for (let i = 2; i <= SIEVE_SIZE; i++) {
    if (isPrime[i]) {
      primes.push(i);
      mu[i] = -1;
    }

    for (let j = 0; j < primes.length && primes[j] * i <= SIEVE_SIZE; j++) {
      const p = primes[j];
      const prod = p * i;
      isPrime[prod] = 0;

      if (i % p === 0) {
        mu[prod] = 0;
        break;
      } else {
        mu[prod] = -mu[i];
      }
    }
  }

  const M = new Int32Array(SIEVE_SIZE + 1);
  for (let i = 1; i <= SIEVE_SIZE; i++) {
    M[i] = M[i - 1] + mu[i];
  }

  let ans = 0n;

  for (let i = 1; i <= SIEVE_SIZE; i++) {
    if (mu[i] !== 0) {
      ans += BigInt(mu[i]) * (N / BigInt(i) ** K);
    }
  }

  if (limit > SIEVE_SIZE) {
    const mertensCache = new Map();

    function mertens(x) {
      if (x <= SIEVE_SIZE) return M[x];
      if (mertensCache.has(x)) return mertensCache.get(x);

      let result = 1;
      const sqrtX = Math.floor(Math.sqrt(x));

      for (let i = 2; i <= sqrtX; i++) {
        result -= mertens(Math.floor(x / i));
      }

      let prevQuotient = Math.floor(x / (sqrtX + 1));
      for (let q = 1; q <= prevQuotient; q++) {
        const count = Math.floor(x / q) - Math.floor(x / (q + 1));
        result -= count * mertens(q);
      }

      mertensCache.set(x, result);
      return result;
    }

    let i = SIEVE_SIZE + 1;

    while (i <= limit) {
      const v = N / BigInt(i) ** K;
      if (v === 0n) break;

      const quotient = N / v;
      let j = Math.floor(Math.pow(Number(quotient), 1.0 / kNum));

      while (j < limit && BigInt(j + 1) ** K <= quotient) j++;
      while (j > i && BigInt(j) ** K > quotient) j--;

      j = Math.min(j, limit);
      if (j < i) break;

      const delta = mertens(j) - mertens(i - 1);
      ans += v * BigInt(delta);

      i = j + 1;
    }
  }

  console.log(ans.toString());
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