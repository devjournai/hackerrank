/**
 * Non Abundant Sums
 * Time Complexity: O(N log N)
 * Space Complexity: O(N)
 */

function processData(input) {
    const arr = input.trim().split(/\s+/).map(Number);
    let idx = 0;

    const T = arr[idx++];
    const queries = [];
    let maxN = 0;

    for (let i = 0; i < T; i++) {
        const n = arr[idx++];
        queries.push(n);
        if (n > maxN) maxN = n;
    }

    const divSum = new Array(maxN + 1).fill(1);
    if (maxN >= 0) divSum[0] = 0;
    if (maxN >= 1) divSum[1] = 0;

    for (let i = 2; i * 2 <= maxN; i++) {
        for (let j = i * 2; j <= maxN; j += i) {
            divSum[j] += i;
        }
    }

    const abundant = [];
    for (let n = 2; n <= maxN; n++) {
        if (divSum[n] > n) abundant.push(n);
    }

    const canBeSum = new Array(maxN + 1).fill(false);

    for (let i = 0; i < abundant.length; i++) {
        for (let j = i; j < abundant.length; j++) {
            const s = abundant[i] + abundant[j];
            if (s > maxN) break;
            canBeSum[s] = true;
        }
    }

    const output = [];
    for (const n of queries) {
        output.push(canBeSum[n] ? "YES" : "NO");
    }

    console.log(output.join("\n"));
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