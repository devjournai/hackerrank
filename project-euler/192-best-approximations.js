/*
 * Best Approximations
 * Time Complexity: O(m * log b)
 * Space Complexity: O(1)
 */

function processData(input) {
  const lines = input.trim().split(/\s+/);
  if (lines.length < 2) return;

  const m = parseInt(lines[0], 10);
  const b = BigInt(lines[1]);
  const MOD = 1000000016000000063n;

  let totalSum = 0n;

  for (let n = 2; n <= m; n++) {
    const root = Math.floor(Math.sqrt(n));
    if (root * root === n) continue;

    let m_k = 0n;
    let d_k = 1n;
    let a_k = BigInt(root);

    const nBig = BigInt(n);

    let p_prev = 1n;
    let q_prev = 0n;
    let p_curr = a_k;
    let q_curr = 1n;

    while (true) {
      m_k = d_k * a_k - m_k;
      d_k = (nBig - m_k * m_k) / d_k;
      a_k = (BigInt(root) + m_k) / d_k;

      const p_next = a_k * p_curr + p_prev;
      const q_next = a_k * q_curr + q_prev;

      if (q_next > b) {
        const c = (b - q_prev) / q_curr;

        let chosenDenominator = 0n;

        if (c === 0n) {
          chosenDenominator = q_curr;
        } else {
          const p_semi = c * p_curr + p_prev;
          const q_semi = c * q_curr + q_prev;

          const numX = p_semi;
          const denX = q_semi;
          const numY = p_curr;
          const denY = q_curr;

          const numM = numX * denY + numY * denX;
          const denM = 2n * denX * denY;

          const lhs = numM * numM;
          const rhs = nBig * denM * denM;

          const isXGreater = numX * denY > numY * denX;
          const isMLessThanRoot = lhs < rhs;

          let pickSemi = false;

          if (isXGreater) {
            pickSemi = isMLessThanRoot;
          } else {
            pickSemi = !isMLessThanRoot;
          }

          chosenDenominator = pickSemi ? q_semi : q_curr;
        }

        totalSum = (totalSum + chosenDenominator) % MOD;
        break;
      }

      p_prev = p_curr;
      q_prev = q_curr;
      p_curr = p_next;
      q_curr = q_next;
    }
  }

  console.log(totalSum.toString());
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