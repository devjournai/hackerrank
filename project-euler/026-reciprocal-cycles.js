/**
 * Reciprocal Cycles
 * Time Complexity: O(N log N)
 * Space Complexity: O(N)
 */

function processData(input) {
    const arr = input.trim().split(/\s+/).map(Number);
    let idx = 0;

    const T = arr[idx++];
    const queries = arr.slice(idx);

    const MAXN = 10000;

    function cycleLength(n) {
        while (n % 2 === 0) n /= 2;
        while (n % 5 === 0) n /= 5;

        if (n === 1) return 0;

        let len = 1;
        let rem = 10 % n;

        while (rem !== 1) {
            rem = (rem * 10) % n;
            len++;
        }
        return len;
    }

    const best = new Array(MAXN + 1).fill(0);

    let maxLen = 0;
    let bestD = 0;

    for (let d = 2; d <= MAXN; d++) {
        const len = cycleLength(d);
        if (len > maxLen) {
            maxLen = len;
            bestD = d;
        }
        best[d] = bestD;
    }

    let out = [];
    for (const n of queries) {
        out.push(best[n - 1]);
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