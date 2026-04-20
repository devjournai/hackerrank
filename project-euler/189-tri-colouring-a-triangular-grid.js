/**
 * Tri-colouring a Triangular Grid
 * Time Complexity: O(n * c^4)
 * Space Complexity: O(c^n)
 */

function processData(input) {
  const parts = input.trim().split(/\s+/);
  if (parts.length < 2) return;

  const n = parseInt(parts[0], 10);
  const c = parseInt(parts[1], 10);
  const MOD = 1000000007n;

  const P = new BigInt64Array(n + 2);
  let pVal = 1n;
  for (let i = 0; i <= n + 1; i++) {
    P[i] = pVal;
    pVal *= BigInt(c);
  }

  const maxSize = Number(P[n]);
  let dp = new BigInt64Array(maxSize);
  let next_dp = new BigInt64Array(maxSize);

  function getValidCount(u, v1, v2) {
    let distinct = 0;
    if (u === v1 && v1 === v2)
      distinct = 1;
    else if (u === v1 || u === v2 || v1 === v2)
      distinct = 2;
    else distinct = 3;
    const k = c - distinct;
    return k < 0 ? 0n : BigInt(k);
  }

  for (let i = 0; i < c; i++) {
    dp[i] = 1n;
  }
  
  for (let row = 2; row <= n; row++) {
    const L = row - 1;
    next_dp.fill(0n);
    
    const suffixMax = Number(P[L - 1]);

    for (let suffix = 0; suffix < suffixMax; suffix++) {
      for (let u0 = 0; u0 < c; u0++) {
        const srcIdx = u0 + suffix * c;
        const count = dp[srcIdx];
        if (count === 0n) continue;

        const suffixShifted = suffix * c * c;

        for (let v0 = 0; v0 < c; v0++) {
          for (let v1 = 0; v1 < c; v1++) {
            const ways = getValidCount(u0, v0, v1);
            if (ways > 0n) {
              const dstIdx = v0 + v1 * c + suffixShifted;
              next_dp[dstIdx] = (next_dp[dstIdx] + count * ways) % MOD;
            }
          }
        }
      }
    }

    let temp = dp;
    dp = next_dp;
    next_dp = temp;

    for (let j = 1; j < L; j++) {
      next_dp.fill(0n);

      const strideV = Number(P[j]);
      const strideU = Number(P[j + 1]);
      const strideSuffix = Number(P[j + 2]);

      const suffixLimit = Number(P[L - 1 - j]);
      const prefixLimit = Number(P[j]);

      for (let suffix = 0; suffix < suffixLimit; suffix++) {
        for (let u_j = 0; u_j < c; u_j++) {
          for (let v_j = 0; v_j < c; v_j++) {
            const baseSrc =
              v_j * strideV + u_j * strideU + suffix * strideSuffix;

            for (let prefix = 0; prefix < prefixLimit; prefix++) {
              const srcIdx = baseSrc + prefix;
              const count = dp[srcIdx];
              if (count === 0n) continue;

              for (let v_next = 0; v_next < c; v_next++) {
                const ways = getValidCount(u_j, v_j, v_next);
                if (ways > 0n) {
                  const dstIdx =
                    prefix +
                    v_j * strideV +
                    v_next * strideU +
                    suffix * strideSuffix;
                  next_dp[dstIdx] = (next_dp[dstIdx] + count * ways) % MOD;
                }
              }
            }
          }
        }
      }
      temp = dp;
      dp = next_dp;
      next_dp = temp;
    }
  }

  let total = 0n;
  const limit = Number(P[n]);
  for (let i = 0; i < limit; i++) {
    total = (total + dp[i]) % MOD;
  }

  console.log(total.toString());
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