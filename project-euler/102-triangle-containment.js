/**
 * Triangle Containment
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */

function processData(input) {
  const lines = input.trim().split('\n');

  const N = parseInt(lines[0]);

  let count = 0;

  function getDoubleArea(x1, y1, x2, y2, x3, y3) {
    return Math.abs(x1 * (y2 - y3) + x2 * (y3 - y1) + x3 * (y1 - y2));
  }

  for (let i = 1; i <= N; i++) {
    const line = lines[i];
    if (!line) continue;

    const coords = line.trim().split(/\s+/).map(Number);

    if (coords.length < 6) continue;

    const [x1, y1, x2, y2, x3, y3] = coords;

    const areaABC = getDoubleArea(x1, y1, x2, y2, x3, y3);

    const areaOriginAB = getDoubleArea(0, 0, x1, y1, x2, y2);

    const areaOriginBC = getDoubleArea(0, 0, x2, y2, x3, y3);

    const areaOriginCA = getDoubleArea(0, 0, x3, y3, x1, y1);

    if (areaABC === (areaOriginAB + areaOriginBC + areaOriginCA)) {
      count++;
    }
  }
  console.log(count);
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