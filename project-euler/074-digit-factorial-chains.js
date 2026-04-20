/**
 * Digit–Factorial Chains
 * Time Complexity: O(M)
 * Space Complexity: O(M)
 */

function processData(input) {
    const parts = input.trim().split(/\s+/).map(Number);
    const T = parts[0];
    let queries = [];
    let idx = 1;
    let maxN = 0;

    for (let i = 0; i < T; i++) {
        let N = parts[idx++], L = parts[idx++];
        queries.push([N, L]);
        if (N > maxN) maxN = N;
    }

    const fact = [1];
    for (let i = 1; i <= 9; i++) fact[i] = fact[i - 1] * i;

    function digitFactSum(x) {
        if (x === 0) return fact[0];
        let s = 0;
        while (x > 0) {
            s += fact[x % 10];
            x = Math.floor(x / 10);
        }
        return s;
    }

    const chainLen = new Array(maxN + 1).fill(0);

    function getLength(n) {
        if (n <= maxN && chainLen[n] !== 0) return chainLen[n];

        let seen = new Set();
        let x = n;

        while (!seen.has(x)) {
            seen.add(x);
            x = digitFactSum(x);
        }

        const len = seen.size;

        if (n <= maxN) chainLen[n] = len;
        return len;
    }

    for (let i = 0; i <= maxN; i++) {
        if (chainLen[i] === 0) {
            getLength(i);
        }
    }

    let out = [];

    for (let [N, L] of queries) {
        let res = [];
        for (let i = 0; i <= N; i++) {
            if (chainLen[i] === L) res.push(i);
        }
        if (res.length === 0) out.push("-1");
        else out.push(res.join(" "));
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