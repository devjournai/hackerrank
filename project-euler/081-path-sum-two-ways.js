/**
 * Path Sum Two Ways
 * Time Complexity: O(N²)
 * Space Complexity: O(N)
 */

function processData(input) {
    const lines = input.trim().split('\n');
    let idx = 0;

    const N = parseInt(lines[idx++], 10);
    const dp = new Array(N).fill(0n);

    for (let i = 0; i < N; i++) {
        const row = lines[idx++].trim().split(' ').map(BigInt);

        for (let j = 0; j < N; j++) {
            if (i === 0 && j === 0) {
                dp[j] = row[j];
            } else if (i === 0) {
                dp[j] = dp[j - 1] + row[j];
            } else if (j === 0) {
                dp[j] = dp[j] + row[j];
            } else {
                dp[j] = (dp[j] < dp[j - 1] ? dp[j] : dp[j - 1]) + row[j];
            }
        }
    }

    console.log(dp[N - 1].toString());
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