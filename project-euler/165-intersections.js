/**
 * Intersections
 * Time Complexity: O(n²)
 * Space Complexity: O(k)
 */

function processData(input) {
  const n = Number(input.trim());

  const MOD = 50515093;
  let s = 290797;
  const t = [];

  for (let i = 0; i < 4 * n; i++) {
    s = (s * s) % MOD;
    t.push(s % 500);
  }

  const segs = [];
  for (let i = 0; i < n; i++) {
    segs.push({
      a: { x: t[4 * i], y: t[4 * i + 1] },
      b: { x: t[4 * i + 2], y: t[4 * i + 3] },
    });
  }

  function orient(a, b, c) {
    return (b.x - a.x) * (c.y - a.y) - (b.y - a.y) * (c.x - a.x);
  }

  function gcd(a, b) {
    return b === 0 ? Math.abs(a) : gcd(b, a % b);
  }

  function intersectionPoint(s1, s2) {
    const { a: A, b: B } = s1;
    const { a: C, b: D } = s2;

    const a1 = B.y - A.y;
    const b1 = A.x - B.x;
    const c1 = a1 * A.x + b1 * A.y;

    const a2 = D.y - C.y;
    const b2 = C.x - D.x;
    const c2 = a2 * C.x + b2 * C.y;

    let det = a1 * b2 - a2 * b1;

    let xNum = c1 * b2 - c2 * b1;
    let yNum = a1 * c2 - a2 * c1;

    let g = gcd(gcd(Math.abs(xNum), Math.abs(yNum)), Math.abs(det));
    xNum /= g;
    yNum /= g;
    det /= g;

    if (det < 0) {
      xNum = -xNum;
      yNum = -yNum;
      det = -det;
    }

    return `${xNum}/${det},${yNum}/${det}`;
  }

  const points = new Set();

  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      const s1 = segs[i];
      const s2 = segs[j];

      const o1 = orient(s1.a, s1.b, s2.a);
      const o2 = orient(s1.a, s1.b, s2.b);
      const o3 = orient(s2.a, s2.b, s1.a);
      const o4 = orient(s2.a, s2.b, s1.b);

      if (o1 * o2 < 0 && o3 * o4 < 0) {
        points.add(intersectionPoint(s1, s2));
      }
    }
  }

  console.log(points.size);
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