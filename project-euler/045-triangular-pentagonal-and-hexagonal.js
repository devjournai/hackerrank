/**
 * Triangular, Pentagonal, and Hexagonal
 * Time Complexity: O( sqrt(N) * log N )
 * Space Complexity: O(1)
 */

function processData(input) {
    const parts = input.trim().split(/\s+/);
    const N = BigInt(parts[0]);
    const a = Number(parts[1]);
    const b = Number(parts[2]);

    const out = [];

    if (a === 3 && b === 5) {
        let n = 1n;
        while (true) {
            const P = n * (3n * n - 1n) / 2n;
            if (P >= N) break;
            if (isTriangular(P)) out.push(P.toString());
            n++;
        }
    } else {
        let n = 1n;
        while (true) {
            const H = n * (2n * n - 1n);
            if (H >= N) break;
            if (isPentagonal(H)) out.push(H.toString());
            n++;
        }
    }

    if (out[0] !== "1") out.unshift("1");

    console.log(out.join("\n"));
};

function isSquareBig(n) {
    if (n < 0n) return false;
    let x = n;
    let y = (x + 1n) >> 1n;
    while (y < x) {
        x = y;
        y = (x + n / x) >> 1n;
    }
    return x * x === n;
};

function isTriangular(x) {
    const D = 8n * x + 1n;
    return isSquareBig(D);
};

function isPentagonal(x) {
    const D = 24n * x + 1n;
    if (!isSquareBig(D)) return false;
    const r = sqrtBig(D);
    return ((1n + r) % 6n === 0n);
};

function sqrtBig(n) {
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