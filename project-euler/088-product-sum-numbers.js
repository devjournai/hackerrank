/**
 * Product-Sum Numbers
 * Time Complexity: ~O(N log N)
 * Space Complexity: O(N)
 */

function processData(input) {
    const K = Number(input.trim());
    const LIMIT = 2 * K;

    const best = new Array(K + 1).fill(Infinity);

    function dfs(start, product, sum, length) {
        const k = product - sum + length;
        if (k > K) return;

        if (product < best[k]) {
            best[k] = product;
        }

        for (let i = start; i <= LIMIT / product; i++) {
            dfs(i, product * i, sum + i, length + 1);
        }
    }

    dfs(2, 1, 0, 0);

    const seen = new Set();
    let ans = 0;

    for (let k = 2; k <= K; k++) {
        if (!seen.has(best[k])) {
            seen.add(best[k]);
            ans += best[k];
        }
    }

    console.log(ans.toString());
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