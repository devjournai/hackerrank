/**
 * Path Sum Three Ways
 * Time Complexity: O(N²)
 * Space Complexity: O(N)
 */

function processData(input) {
    const lines = input.trim().split('\n');
    let idx = 0;

    const N = parseInt(lines[idx++], 10);
    const matrix = [];

    for (let i = 0; i < N; i++) {
        matrix.push(lines[idx++].trim().split(' ').map(BigInt));
    }

    let dp = new Array(N);
    for (let r = 0; r < N; r++) {
        dp[r] = matrix[r][0];
    }

    for (let c = 1; c < N; c++) {
        for (let r = 0; r < N; r++) {
            dp[r] = dp[r] + matrix[r][c];
        }

        for (let r = 1; r < N; r++) {
            if (dp[r] > dp[r - 1] + matrix[r][c]) {
                dp[r] = dp[r - 1] + matrix[r][c];
            }
        }

        for (let r = N - 2; r >= 0; r--) {
            if (dp[r] > dp[r + 1] + matrix[r][c]) {
                dp[r] = dp[r + 1] + matrix[r][c];
            }
        }
    }

    let result = dp[0];
    for (let r = 1; r < N; r++) {
        if (dp[r] < result) result = dp[r];
    }

    console.log(result.toString());
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