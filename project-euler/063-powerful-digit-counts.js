/**
 * Powerful Digit Counts
 * Time Complexity: O(B * log N)
 * Space Complexity: O(1)
 */

function processData(input) {
    const N = parseInt(input.trim(), 10);

    const results = [];

    for (let a = 1; a <= 9; a++) {
        let val = BigInt(a) ** BigInt(N);
        const len = val.toString().length;

        if (len === N) {
            results.push(val.toString());
        }
    }

    console.log(results.join("\n"));
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