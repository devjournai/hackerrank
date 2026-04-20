/**
 * N Digit Fibonacci Number
 * Time Complexity: O(K)
 * Space Complexity: O(K)
 */

function processData(input) {
    const data = input.trim().split(/\s+/).map(Number);
    let idx = 0;

    const T = data[idx++];
    const queries = data.slice(idx);

    const MAXD = 5000;

    const firstIndex = new Array(MAXD + 1).fill(0);

    let f1 = 1n;
    let f2 = 1n;
    let index = 2;

    firstIndex[1] = 1;

    while (firstIndex[MAXD] === 0) {
        index++;
        const f3 = f1 + f2;
        f1 = f2;
        f2 = f3;

        const digits = f2.toString().length;

        if (digits <= MAXD && firstIndex[digits] === 0) {
            firstIndex[digits] = index;
        }
    }

    const out = [];
    for (const n of queries) {
        out.push(firstIndex[n]);
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