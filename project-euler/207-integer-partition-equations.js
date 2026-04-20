/*
 * Integer Partition Equations
 * Time Complexity: O(Q * log(b))
 * Space Complexity: O(1)
 */

function processData(input) {
  const tokens = input.trim().split(/\s+/);
  let ptr = 0;

  if (ptr >= tokens.length) return;
  const Q = parseInt(tokens[ptr++]);

  for (let i = 0; i < Q; i++) {
    const a = BigInt(tokens[ptr++]);
    const b = BigInt(tokens[ptr++]);

    let w = 1n;

    while (true) {
      const p2_w = 1n << w;
      const L = p2_w - 1n;
      const R = (p2_w << 1n) - 2n;

      if (w * b < a * R) {
        let min_x = (w * b) / a + 1n;

        if (min_x < L) {
          min_x = L;
        }

        const m = min_x * (min_x + 1n);
        process.stdout.write(m.toString() + "\n");
        break;
      }

      w++;
    }
  }
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