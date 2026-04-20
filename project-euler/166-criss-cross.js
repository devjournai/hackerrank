/**
 * Criss Cross
 * Time Complexity: O(n * |ways|^2 * k)
 * Space Complexity: O(n * |ways|)
 */

function processData(input) {
  const n = parseInt(input.trim());

  const maxS = 4 * n;
  const partitions = Array.from({ length: maxS + 1 }, () => []);

  for (let a = 0; a <= n; a++) {
    for (let b = 0; b <= n; b++) {
      for (let c = 0; c <= n; c++) {
        for (let d = 0; d <= n; d++) {
          partitions[a + b + c + d].push([a, b, c, d]);
        }
      }
    }
  }

  let totalWays = 0;

  for (let S = 0; S <= maxS; S++) {
    const rows = partitions[S];
    if (rows.length === 0) continue;
    const groupedRows = Array.from({ length: 2 * n + 1 }, () =>
      Array.from({ length: 2 * n + 1 }, () => []),
    );

    for (const r of rows) {
      const diffA = r[2] - r[3] + n;
      const diffB = r[1] - r[0] + n;
      groupedRows[diffA][diffB].push(r);
    }

    for (const r1 of rows) {
      for (const r2 of rows) {
        const targetDiffA = r1[3] + r2[3] - (r1[0] + r2[1]) + n;
        const targetDiffB = r1[0] + r2[0] - (r1[3] + r2[2]) + n;

        if (
          targetDiffA < 0 ||
          targetDiffA > 2 * n ||
          targetDiffB < 0 ||
          targetDiffB > 2 * n
        ) {
          continue;
        }

        const candidates = groupedRows[targetDiffA][targetDiffB];

        for (const r3 of candidates) {
          const c0 = S - (r1[0] + r2[0] + r3[0]);
          if (c0 < 0 || c0 > n) continue;

          const c1 = S - (r1[1] + r2[1] + r3[1]);
          if (c1 < 0 || c1 > n) continue;

          const c2 = S - (r1[2] + r2[2] + r3[2]);
          if (c2 < 0 || c2 > n) continue;

          const c3 = S - (r1[3] + r2[3] + r3[3]);
          if (c3 < 0 || c3 > n) continue;
          totalWays++;
        }
      }
    }
  }

  console.log(totalWays);
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