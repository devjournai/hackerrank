/**
 * Counting Summations
 * Time Complexity: O(N^2)
 * Space Complexity: O(N)
 */

function processData(input) {
    const MOD = 1000000007n;

    const arr = input.trim().split(/\s+/).map(Number);
    const T = arr[0];
    const queries = arr.slice(1);
    const maxN = Math.max(...queries);

    const dp = Array(maxN + 1).fill(0n);
    dp[0] = 1n;

    for (let k = 1; k <= maxN; k++) {
        for (let n = k; n <= maxN; n++) {
            dp[n] = (dp[n] + dp[n - k]) % MOD;
        }
    }

    let out = [];
    for (let n of queries) {
        let ans = (dp[n] - 1n + MOD) % MOD;
        out.push(ans.toString());
    }

    console.log(out.join("\n"));
}

process.stdin.resume();
process.stdin.setEncoding("ascii");
let _input = "";
process.stdin.on("data", function (input) {
    _input += input;
});
process.stdin.on("end", function () {
    processData(_input);
});