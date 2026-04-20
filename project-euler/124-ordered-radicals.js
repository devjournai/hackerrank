/**
 * Ordered Radicals
 * Time Complexity: O(N log N + T log N) for small L, O(K) for large L
 * Space Complexity: O(N)
 */

const MAX_SMALL_L = 200000;
const BIT_SIZE = MAX_SMALL_L + 1;

const spf = new Uint32Array(MAX_SMALL_L + 10);
const rad = new Uint32Array(MAX_SMALL_L + 10);

function precompute() {
  for (let i = 1; i <= MAX_SMALL_L; i++) {
    spf[i] = i;
    rad[i] = 1;
  }
  for (let i = 2; i * i <= MAX_SMALL_L; i++) {
    if (spf[i] === i) {
      for (let j = i * i; j <= MAX_SMALL_L; j += i) {
        if (spf[j] === j) spf[j] = i;
      }
    }
  }
  for (let i = 1; i <= MAX_SMALL_L; i++) {
    let temp = i;
    let r = 1;
    while (temp > 1) {
      const p = spf[temp];
      r *= p;
      while (temp % p === 0) temp /= p;
    }
    rad[i] = r;
  }
};

const bit = new Int32Array(BIT_SIZE);

function update(idx, val) {
  for (; idx < BIT_SIZE; idx += idx & -idx) {
    bit[idx] += val;
  }
};

function findKth(k) {
  let idx = 0;
  let currentSum = 0;
  for (let i = 17; i >= 0; i--) {
    const nextIdx = idx + (1 << i);
    if (nextIdx < BIT_SIZE && currentSum + bit[nextIdx] < k) {
      idx = nextIdx;
      currentSum += bit[nextIdx];
    }
  }
  return idx + 1;
};

function solveLarge(L, k) {
  let count = 0;
  for (let r = 1; ; r++) {
    const primes = [];
    let isSquareFree = true;

    if (r <= MAX_SMALL_L) {
      if (rad[r] !== r) continue;
      let x = r;
      while (x > 1) {
        const p = spf[x];
        primes.push(p);
        while (x % p === 0) x /= p;
      }
    } else {
      let x = r;
      for (let i = 2; i * i <= x; i++) {
        if (x % i === 0) {
          primes.push(i);
          x /= i;
          if (x % i === 0) {
            isSquareFree = false;
            break;
          }
        }
      }
      if (!isSquareFree) continue;
      if (x > 1) primes.push(x);
    }

    const batch = [];

    const dfs = (val, idx) => {
      batch.push(val);
      for (let i = idx; i < primes.length; i++) {
        const p = BigInt(primes[i]);
        const nextVal = val * p;
        if (nextVal <= L) {
          dfs(nextVal, i);
        }
      }
    };

    dfs(BigInt(r), 0);
    batch.sort((a, b) => (a < b ? -1 : a > b ? 1 : 0));

    if (count + batch.length >= k) {
      return batch[k - count - 1].toString();
    }

    count += batch.length;
  }
};

function processData(input) {
  const lines = input.trim().split(/\s+/);
  if (lines.length === 0) return;

  precompute();

  const T = parseInt(lines[0], 10);
  let ptr = 1;

  const smallQueries = [];
  const results = new Array(T);

  for (let i = 0; i < T; i++) {
    const L = BigInt(lines[ptr++]);
    const k = parseInt(lines[ptr++], 10);

    if (L <= BigInt(MAX_SMALL_L)) {
      smallQueries.push({ L: Number(L), k, id: i });
    } else {
      results[i] = solveLarge(L, k);
    }
  }

  if (smallQueries.length > 0) {
    const masterList = new Int32Array(MAX_SMALL_L);
    const pairs = new Int32Array(MAX_SMALL_L);
    for (let i = 0; i < MAX_SMALL_L; i++) pairs[i] = i + 1;

    pairs.sort((a, b) => {
      if (rad[a] !== rad[b]) return rad[a] - rad[b];
      return a - b;
    });

    const posInSorted = new Int32Array(MAX_SMALL_L + 1);
    for (let i = 0; i < MAX_SMALL_L; i++) {
      masterList[i] = pairs[i];
      posInSorted[pairs[i]] = i + 1;
    }

    smallQueries.sort((a, b) => a.L - b.L);

    let currentL = 0;
    for (const q of smallQueries) {
      while (currentL < q.L) {
        currentL++;
        update(posInSorted[currentL], 1);
      }

      const idxInSorted = findKth(q.k);
      results[q.id] = masterList[idxInSorted - 1].toString();
    }
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