/**
 * Convergents of e
 * Time Complexity: O(N * log V)
 * Space Complexity: O(1)
 */

function processData(input) {
    const N = parseInt(input.trim(), 10);

    if (N === 1) {
        console.log(2);
        return;
    }

    let p2 = 0n;
    let p1 = 1n;

    let q2 = 1n;
    let q1 = 0n;

    for (let k = 0; k < N; k++) {

        let ak;

        if (k === 0) {
            ak = 2n;
        } else if ((k % 3) === 2) {
            ak = 2n * BigInt((k + 1) / 3);
        } else {
            ak = 1n;
        }

        const p = ak * p1 + p2;
        const q = ak * q1 + q2;

        p2 = p1; p1 = p;
        q2 = q1; q1 = q;
    }

    const numStr = p1.toString();

    let sum = 0;
    for (const ch of numStr) sum += (ch.charCodeAt(0) - 48);

    console.log(sum);
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