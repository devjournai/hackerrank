/**
 * Longest Collatz Sequence
 * Time Complexity: O(N log N)
 * Space Complexity: O(N)
 */

function processData(input) {
    const lines = input.trim().split(/\s+/).map(Number);
    const t = lines[0];

    const queries = lines.slice(1);
    const maxN = Math.max(...queries);

    const LIMIT = maxN;

    const dp = new Array(LIMIT + 1).fill(0);
    dp[1] = 1;

    function collatzLen(n) {
        if (n <= LIMIT && dp[n] !== 0) return dp[n];

        let next;
        if (n % 2 === 0) next = n / 2;
        else next = 3 * n + 1;

        const len = 1 + collatzLen(next);

        if (n <= LIMIT) dp[n] = len;

        return len;
    }

    for (let i = 2; i <= LIMIT; i++) {
        collatzLen(i);
    }

    const best = new Array(LIMIT + 1);
    best[1] = 1;

    let maxLen = dp[1];
    let maxIdx = 1;

    for (let i = 2; i <= LIMIT; i++) {
        if (dp[i] >= maxLen) {
            maxLen = dp[i];
            maxIdx = i;
        }
        best[i] = maxIdx;
    }

    let out = [];
    for (let n of queries) {
        out.push(best[n]);
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