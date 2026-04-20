/**
 * Pentagonal Numbers
 * Time Complexity: O(N)
 * Space Complexity: O(N) to store pentagonal numbers
 */

function isSquareBig(n) {
    if (n < 0n) return false;
    let x = n;
    let y = (x + 1n) >> 1n;
    while (y < x) {
        x = y;
        y = (x + n / x) >> 1n;
    }
    return x * x === n;
}

function isPentagonal(x) {
    const D = 24n * x + 1n;
    if (!isSquareBig(D)) return false;
    const s = bigintSqrt(D);
    return ((1n + s) % 6n === 0n);
}

function bigintSqrt(n) {
    if (n === 0n || n === 1n) return n;
    let x = n;
    let y = (x + 1n) >> 1n;
    while (y < x) {
        x = y;
        y = (x + n / x) >> 1n;
    }
    return x;
}

function processData(input) {
    const [Nstr, Kstr] = input.trim().split(/\s+/);
    const N = Number(Nstr);
    const K = Number(Kstr);

    const P = new Array(N + 1);
    for (let n = 1; n <= N; n++) {
        P[n] = BigInt(n) * (3n * BigInt(n) - 1n) / 2n;
    }

    const answers = [];

    for (let n = K + 1; n < N; n++) {
        const Pn = P[n];
        const Pnk = P[n - K];

        const diff = Pn - Pnk;
        const sum = Pn + Pnk;

        if (isPentagonal(diff) || isPentagonal(sum)) {
            answers.push(Pn.toString());
        }
    }

    console.log(answers.join("\n"));
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