/**
 * Coin Sums (Euler 31)
 * Time Complexity: O(K * N)
 * Space Complexity: O(N)
 */

function processData(input) {
    const MOD = 1000000007n;

    const coins = [1, 2, 5, 10, 20, 50, 100, 200];

    const arr = input.trim().split(/\s+/).map(Number);
    const T = arr[0];
    const queries = arr.slice(1);

    const maxN = Math.max(...queries);

    const dp = new Array(maxN + 1).fill(0n);
    dp[0] = 1n;

    for (const coin of coins) {
        for (let v = coin; v <= maxN; v++) {
            dp[v] = (dp[v] + dp[v - coin]) % MOD;
        }
    }

    let out = [];
    for (let n of queries) {
        out.push(dp[n].toString());
    }

    console.log(out.join("\n"));
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