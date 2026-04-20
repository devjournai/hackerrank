/**
 * Rational Zeros of a Function of Three Variables
 * Time Complexity: O(K^4)
 * Space Complexity: O(K^4)
 */

function processData(input) {
  const k = parseInt(input.trim(), 10);

  const gcd = (a, b) => {
    while (b > 0n) {
      let t = b;
      b = a % b;
      a = t;
    }
    return a;
  };

  const createFrac = (n, d) => {
    if (d === 0n) return { n: 0n, d: 1n };
    const common = gcd(n, d);
    return { n: n / common, d: d / common };
  };

  const addFrac = (f1, f2) => {
    const num = f1.n * f2.d + f2.n * f1.d;
    const den = f1.d * f2.d;
    return createFrac(num, den);
  };

  const fracs = [];
  for (let b = 2; b <= k; b++) {
    for (let a = 1; a < b; a++) {
      if (gcd(BigInt(a), BigInt(b)) === 1n) {
        fracs.push({ n: BigInt(a), d: BigInt(b) });
      }
    }
  }

  const uniqueSums = new Set();
  const kBig = BigInt(k);

  const checkAndAdd = (x, y, z) => {
    if (z.d <= kBig && z.n < z.d) {
      const xyNum = x.n * y.d + y.n * x.d;
      const xyDen = x.d * y.d;
      const sNum = xyNum * z.d + z.n * xyDen;
      const sDen = xyDen * z.d;

      const s = createFrac(sNum, sDen);
      uniqueSums.add(`${s.n}/${s.d}`);
    }
  };

  for (let i = 0; i < fracs.length; i++) {
    for (let j = i; j < fracs.length; j++) {
      const x = fracs[i];
      const y = fracs[j];

      const z1 = addFrac(x, y);
      checkAndAdd(x, y, z1);

      const numSq = x.n * x.n * (y.d * y.d) + y.n * y.n * (x.d * x.d);
      const val = Number(numSq);
      const root = BigInt(Math.round(Math.sqrt(val)));
      const isSquare = root * root === numSq;

      if (isSquare) {
        const z2 = createFrac(root, x.d * y.d);
        checkAndAdd(x, y, z2);
      }

      const z_neg1_n = x.n * y.n;
      const z_neg1_d = x.n * y.d + y.n * x.d;
      const z_neg1 = createFrac(z_neg1_n, z_neg1_d);
      checkAndAdd(x, y, z_neg1);

      if (isSquare) {
        const z_neg2 = createFrac(x.n * y.n, root);
        checkAndAdd(x, y, z_neg2);
      }
    }
  }

  let totalS = { n: 0n, d: 1n };
  uniqueSums.forEach((sStr) => {
    const parts = sStr.split("/");
    const f = { n: BigInt(parts[0]), d: BigInt(parts[1]) };
    totalS = addFrac(totalS, f);
  });

  console.log((totalS.n + totalS.d).toString());
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