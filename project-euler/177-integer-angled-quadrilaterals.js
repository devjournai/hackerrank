/**
 * Integer Angled Quadrilaterals
 * Time Complexity: O(180^3 log 180)
 * Space Complexity: O(180^2 + Q) ≈ O(Q)
 */

function processData(input) {
  const lines = input.trim().split(/\s+/);
  if (lines.length < 8) return;

  const B = lines
    .slice(0, 8)
    .map(Number)
    .sort((a, b) => a - b);

  const logSin = new Float64Array(180);
  for (let i = 1; i < 180; i++) {
    logSin[i] = Math.log(Math.sin((i * Math.PI) / 180));
  }

  const validQuads = new Set();
  const EPSILON = 1e-9;

  for (let phi = 2; phi <= 178; phi++) {
    const pairsPhi = [];
    for (let u = 1; u < phi; u++) {
      const v = phi - u;
      pairsPhi.push({ u, v, val: logSin[u] - logSin[v] });
    }

    const supp = 180 - phi;
    const pairsSupp = [];
    for (let u = 1; u < supp; u++) {
      const v = supp - u;
      pairsSupp.push({ u, v, val: logSin[u] - logSin[v] });
    }

    const list1 = [];
    for (let i = 0; i < pairsPhi.length; i++) {
      for (let j = 0; j < pairsPhi.length; j++) {
        list1.push({
          sum: pairsPhi[i].val + pairsPhi[j].val,
          p1: pairsPhi[i],
          p2: pairsPhi[j],
        });
      }
    }

    const list2 = [];
    for (let i = 0; i < pairsSupp.length; i++) {
      for (let j = 0; j < pairsSupp.length; j++) {
        list2.push({
          sum: pairsSupp[i].val + pairsSupp[j].val,
          p3: pairsSupp[i],
          p4: pairsSupp[j],
        });
      }
    }

    list1.sort((a, b) => a.sum - b.sum);
    list2.sort((a, b) => a.sum - b.sum);

    let j = list2.length - 1;
    for (let i = 0; i < list1.length; i++) {
      const target = -list1[i].sum;

      while (j >= 0 && list2[j].sum > target + EPSILON) {
        j--;
      }

      let k = j;
      while (k >= 0 && Math.abs(list2[k].sum - target) < EPSILON) {
        const p1 = list1[i].p1;
        const p2 = list1[i].p2;
        const p3 = list2[k].p3;
        const p4 = list2[k].p4;

        const qArr = [
          p1.u,
          p3.v,
          p3.u,
          p2.v,
          p2.u,
          p4.v,
          p4.u,
          p1.v,
        ];

        addCanonical(qArr, validQuads);
        k--;
      }
    }
  }

  let count = 0;
  for (const key of validQuads) {
    const A = key.split(",").map(Number);
    A.sort((a, b) => a - b);

    let ok = true;
    for (let i = 0; i < 8; i++) {
      if (A[i] > B[i]) {
        ok = false;
        break;
      }
    }
    if (ok) count++;
  }

  console.log(count);
};

function addCanonical(q, set) {
  let variants = [];

  for (let s = 0; s < 8; s += 2) {
    const rot = [];
    for (let k = 0; k < 8; k++) {
      rot.push(q[(s + k) % 8]);
    }
    variants.push(rot);
  }

  const qRev = [q[1], q[0], q[7], q[6], q[5], q[4], q[3], q[2]];

  for (let s = 0; s < 8; s += 2) {
    const rot = [];
    for (let k = 0; k < 8; k++) {
      rot.push(qRev[(s + k) % 8]);
    }
    variants.push(rot);
  }

  let minArr = variants[0];
  for (let i = 1; i < variants.length; i++) {
    if (compareArrays(variants[i], minArr) < 0) {
      minArr = variants[i];
    }
  }

  set.add(minArr.join(","));
};

function compareArrays(a, b) {
  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) return a[i] - b[i];
  }
  return 0;
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