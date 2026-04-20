/**
 * Find the Largest 0 to 9 Pandigital that can be Formed by Concatenating Products
 * Time Complexity: O(T log M)
 * Space Complexity: O(M)
 */

const solutions = [];

function precompute() {
  const bestReps = new Map();

  function updateBest(pStr, m, a, bList) {
    const newRep = { m: m, a: a, b: [...bList] };

    if (!bestReps.has(pStr)) {
      bestReps.set(pStr, newRep);
      return;
    }

    const oldRep = bestReps.get(pStr);

    if (newRep.m < oldRep.m) {
      bestReps.set(pStr, newRep);
      return;
    }
    if (newRep.m > oldRep.m) return;

    if (newRep.a < oldRep.a) {
      bestReps.set(pStr, newRep);
      return;
    }
    if (newRep.a > oldRep.a) return;

    for (let i = 0; i < newRep.m; i++) {
      const nb = BigInt(newRep.b[i]);
      const ob = BigInt(oldRep.b[i]);
      if (nb < ob) {
        bestReps.set(pStr, newRep);
        return;
      }
      if (nb > ob) return;
    }
  }

  function search(a, inMask, outMask, currentP, currentBList) {
    if (currentP.length === 10) {
      if (inMask === 1023 && currentBList.length >= 2) {
        updateBest(currentP, currentBList.length, a, currentBList);
      }
      return;
    }

    if (currentP.length > 10) return;

    findNextB(a, inMask, outMask, currentP, currentBList, 0, 0);
  }

  function findNextB(a, inMask, outMask, currentP, currentBList, bVal, bLen) {
    if (bLen > 0) {
      const prod = a * bVal;
      const prodStr = prod.toString();

      if (currentP.length + prodStr.length <= 10) {
        let validProd = true;
        let tempOutMask = outMask;
        for (let i = 0; i < prodStr.length; i++) {
          const d = prodStr.charCodeAt(i) - 48;
          if ((tempOutMask >> d) & 1) {
            validProd = false;
            break;
          }
          tempOutMask |= 1 << d;
        }

        if (validProd) {
          currentBList.push(bVal.toString());
          search(a, inMask, tempOutMask, currentP + prodStr, currentBList);
          currentBList.pop();
        }
      }
    }

    if (currentP.length + bLen >= 10) return;

    for (let d = 0; d <= 9; d++) {
      if (!((inMask >> d) & 1)) {
        if (bLen === 0 && d === 0) continue;
        findNextB(
          a,
          inMask | (1 << d),
          outMask,
          currentP,
          currentBList,
          bVal * 10 + d,
          bLen + 1,
        );
      }
    }
  }
  for (let a = 2; a < 100; a++) {
    let aMask = 0;
    let validA = true;
    let tempA = a;
    while (tempA > 0) {
      let d = tempA % 10;
      if ((aMask >> d) & 1) {
        validA = false;
        break;
      }
      aMask |= 1 << d;
      tempA = Math.floor(tempA / 10);
    }
    if (validA) {
      search(a, aMask, 0, "", []);
    }
  }

  for (const [p, obj] of bestReps) {
    const fmt = `${obj.a}*(${obj.b.join(",")})=${p}`;
    solutions.push({ val: p, fmt: fmt });
  }

  solutions.sort((x, y) => (x.val < y.val ? -1 : 1));
}

precompute();

function processData(input) {
  const lines = input.trim().split("\n");
  const T = parseInt(lines[0]);
  const results = [];

  for (let i = 1; i <= T; i++) {
    const N = lines[i].trim();
    let low = 0,
      high = solutions.length - 1;
    let ans = -1;

    while (low <= high) {
      const mid = (low + high) >>> 1;
      if (solutions[mid].val <= N) {
        ans = mid;
        low = mid + 1;
      } else {
        high = mid - 1;
      }
    }

    if (ans !== -1) {
      results.push(solutions[ans].fmt);
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