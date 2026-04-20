/**
 * Triangular number inverse
 * Time Complexity: O(T log t)
 * Space Complexity: O(1)
 */

function processData(input) {
    const data = input.trim().split(/\s+/);
    let idx = 0;

    const T = Number(data[idx++]);
    let out = [];

    for (let i = 0; i < T; i++) {
        const t = BigInt(data[idx++]);

        const D = 1n + 8n * t;
        const r = isqrt(D);

        if (r * r !== D) {
            out.push("-1");
            continue;
        }

        const n = (r - 1n) / 2n;

        if (n * (n + 1n) / 2n === t) out.push(n.toString());
        else out.push("-1");
    }

    console.log(out.join("\n"));
};

function isqrt(n) {
    if (n === 0n || n === 1n) return n;

    let x = n;
    let y = (x + 1n) >> 1n;

    while (y < x) {
        x = y;
        y = (x + n / x) >> 1n;
    }
    return x;
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