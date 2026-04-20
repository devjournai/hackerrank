/**
 * Large Sum
 * Time Complexity: O(N * D)
 * Space Complexity: O(1)
 */

function processData(input) {
    const lines = input.trim().split(/\s+/);
    const n = parseInt(lines[0]);

    let sum = 0n;
    for (let i = 1; i <= n; i++) {
        sum += BigInt(lines[i]);
    }

    const resultStr = sum.toString();
    console.log(resultStr.slice(0, 10));
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