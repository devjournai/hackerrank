/**
 * Square Root Convergents
 * Time Complexity: O(N * D)
 * Space Complexity: O(1)
 */

function processData(input) {
    const N = parseInt(input.trim(), 10);

    let p = 3n;
    let q = 2n;

    const result = [];

    for (let i = 1; i <= N; i++) {

        if (p.toString().length > q.toString().length) {
            result.push(i);
        }

        const new_p = p + 2n * q;
        const new_q = p + q;
        p = new_p;
        q = new_q;
    }

    console.log(result.join(" "));
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