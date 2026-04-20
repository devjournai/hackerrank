/*
 * Prize Strings
 * Time Complexity: O(L * N)
 * Space Complexity: O(L * N)
 */

function processData(input) {
  const parts = input.trim().split(/\s+/);
  if (parts.length < 4) return;

  const L = parseInt(parts[0]);
  const N = parseInt(parts[1]);
  const m = parseInt(parts[2]);
  const cBig = BigInt(parts[3]);

  const MOD = 1000000007n;
  const cMod = Number((cBig - 2n) % MOD);
  const cModBig = BigInt(cMod);

  const non1 = new Int32Array((L + 1) * (N + 1));

  let dp = new BigInt64Array(N + 1);
  dp[0] = 1n;

  let totalAns = 0n;
  const N_Big = BigInt(N);

  const new_dp = new BigInt64Array(N + 1);

  for (let i = 1; i <= L; i++) {
    const rowOffset = i * (N + 1);
    const prevRowOffset = (i - m) * (N + 1);

    for (let k = 0; k <= N; k++) {
      let valNon1 = 0n;

      if (k > 0) {
        valNon1 += dp[k - 1];
      }

      if (cMod > 0) {
        valNon1 += dp[k] * cModBig;
      }

      valNon1 %= MOD;
      non1[rowOffset + k] = Number(valNon1);

      let valEnds1 = dp[k];

      if (i > m) {
        valEnds1 -= BigInt(non1[prevRowOffset + k]);
      } else if (i === m) {
        if (k === 0) valEnds1 -= 1n;
      }

      if (valEnds1 < 0n) valEnds1 += MOD;

      const totalVal = (valNon1 + valEnds1) % MOD;
      new_dp[k] = totalVal;

      let mult = k === 0 ? N_Big : N_Big - BigInt(k) + 1n;
      totalAns = (totalAns + totalVal * mult) % MOD;
    }

    dp.set(new_dp);
  }

  console.log(totalAns.toString());
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