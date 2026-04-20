/**
 * Power Digit Sum
 * Time Complexity: O(D)
 * Space Complexity: O(D)
 */

function processData(input) {
    const lines = input.trim().split(/\s+/).map(Number);
    const t = lines[0];
    let idx = 1;

    for (let i = 0; i < t; i++) {
        const N = BigInt(lines[idx++]);
        const value = 2n ** N;
        const s = value.toString();
        let sum = 0;
        for (let ch of s) {
            sum += ch.charCodeAt(0) - 48;
        }

        console.log(sum);
    }
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