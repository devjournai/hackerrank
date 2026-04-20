/**
 * Counting Capacitor Circuits
 * Time Complexity: O(N^2 * S^2 * log S)
 * Space Complexity: O(N * S)
 */

function processData(input) {
  const N = parseInt(input.trim());
  if (isNaN(N)) return;

  const OFFSET = 10000000;

  function gcd(u, v) {
    if (u === v) return u;
    if (u === 0) return v;
    if (v === 0) return u;
    let shift = 0;
    while (((u | v) & 1) === 0) {
      u >>= 1;
      v >>= 1;
      shift++;
    }
    while ((u & 1) === 0) u >>= 1;
    while (v !== 0) {
      while ((v & 1) === 0) v >>= 1;
      if (u > v) {
        let temp = u;
        u = v;
        v = temp;
      }
      v -= u;
    }
    return u << shift;
  }

  const sets = new Array(N + 1);
  sets[1] = [1 * OFFSET + 1];

  for (let k = 2; k <= N; k++) {
    const rawList = [];
    const half = Math.floor(k / 2);

    for (let i = 1; i <= half; i++) {
      const j = k - i;
      const list1 = sets[i];
      const list2 = sets[j];
      const isSameList = i === j;
      const len1 = list1.length;
      const len2 = list2.length;

      const add = (n, d) => {
        if (n < d) {
          let temp = n;
          n = d;
          d = temp;
        }

        const common = gcd(n, d);
        n = (n / common) | 0;
        d = (d / common) | 0;

        rawList.push(n * OFFSET + d);
      };
      if (isSameList) {
        for (let a = 0; a < len1; a++) {
          const packed1 = list1[a];
          const n1 = Math.floor(packed1 / OFFSET);
          const d1 = packed1 % OFFSET;

          for (let b = a; b < len1; b++) {
            const packed2 = list1[b];
            const n2 = Math.floor(packed2 / OFFSET);
            const d2 = packed2 % OFFSET;
            add(n1 * d2 + n2 * d1, d1 * d2);
            add(n1 * n2 + d1 * d2, d1 * n2);
            if (a !== b) {
              add(n2 * n1 + d2 * d1, d2 * n1);
            }
            add(n1 * n2, n1 * d2 + n2 * d1);
          }
        }
      } else {
        for (let a = 0; a < len1; a++) {
          const packed1 = list1[a];
          const n1 = Math.floor(packed1 / OFFSET);
          const d1 = packed1 % OFFSET;

          for (let b = 0; b < len2; b++) {
            const packed2 = list2[b];
            const n2 = Math.floor(packed2 / OFFSET);
            const d2 = packed2 % OFFSET;
            add(n1 * d2 + n2 * d1, d1 * d2);
            add(n1 * n2 + d1 * d2, d1 * n2);
            add(d1 * d2 + n2 * n1, n1 * d2);
            add(n1 * n2, n1 * d2 + n2 * d1);
          }
        }
      }
    }

    const numArr = new Float64Array(rawList);
    numArr.sort();

    const uniqueList = [];
    if (numArr.length > 0) {
      uniqueList.push(numArr[0]);
      for (let z = 1; z < numArr.length; z++) {
        if (numArr[z] !== numArr[z - 1]) {
          uniqueList.push(numArr[z]);
        }
      }
    }
    sets[k] = uniqueList;
  }
  const globalSet = new Float64Array(
    sets.reduce((acc, curr) => acc + curr.length, 0),
  );

  let offset = 0;
  for (let k = 1; k <= N; k++) {
    globalSet.set(sets[k], offset);
    offset += sets[k].length;
  }

  globalSet.sort();

  let countUniqueGE1 = 0;
  if (globalSet.length > 0) {
    countUniqueGE1 = 1;
    for (let z = 1; z < globalSet.length; z++) {
      if (globalSet[z] !== globalSet[z - 1]) {
        countUniqueGE1++;
      }
    }
  }
  if (countUniqueGE1 === 0) console.log(0);
  else console.log(2 * countUniqueGE1 - 1);
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