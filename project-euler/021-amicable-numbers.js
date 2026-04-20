/**
 * Amicable Numbers
 * Time Complexity: O(N log N)
 * Space Complexity: O(N)
 */

function processData(input) {
    const data = input.trim().split(/\s+/).map(Number);
    let idx = 0;

    const T = data[idx++];
    const queries = [];

    let maxN = 0;

    for (let i = 0; i < T; i++) {
        const n = data[idx++];
        queries.push(n);
        if (n > maxN) maxN = n;
    }

    const divSum = new Array(maxN + 1).fill(1);
    if (maxN >= 0) divSum[0] = 0;
    if (maxN >= 1) divSum[1] = 0;

    for (let i = 2; i * 2 <= maxN; i++) {
        for (let j = 2 * i; j <= maxN; j += i) {
            divSum[j] += i;
        }
    }

    const isAmicable = new Array(maxN + 1).fill(false);

    for (let a = 2; a <= maxN; a++) {
        const b = divSum[a];
        if (b !== a && b <= maxN && b >= 2) {
            if (divSum[b] === a) {
                isAmicable[a] = true;
                isAmicable[b] = true;
            }
        }
    }

    const pref = new Array(maxN + 1).fill(0);

    for (let i = 1; i <= maxN; i++) {
        pref[i] = pref[i - 1] + (isAmicable[i] ? i : 0);
    }

    let output = [];
    for (const n of queries) {
        output.push(pref[n - 1]);
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