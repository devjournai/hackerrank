/**
 * Ordered Fractions
 * Time Complexity: O(T log b)
 * Space Complexity: O(1)
 */

function egcd(a, b) {
    if (b === 0n) return [a, 1n, 0n];
    let [g, x1, y1] = egcd(b, a % b);
    return [g, y1, x1 - (a / b) * y1];
};

function modInv(a, m) {
    let [g, x] = egcd(a, m);
    if (g !== 1n) return null;
    x %= m;
    if (x < 0n) x += m;
    return x;
};

function processData(input) {
    let parts = input.trim().split(/\s+/);
    let T = Number(parts[0]);
    let idx = 1;
    let out = [];

    for (let t = 0; t < T; t++) {
        let a = BigInt(parts[idx++]);
        let b = BigInt(parts[idx++]);
        let N = BigInt(parts[idx++]);

        let inv = modInv(a, b);
        let d0 = inv;

        let k = (N - d0) / b;
        if (k < 0n) k = 0n;
        let d = d0 + k * b;

        let c = (a * d - 1n) / b;
        out.push(`${c} ${d}`);
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