/**
 * Square Root Digital Expansion
 * Time Complexity: O(N log N)
 * Space Complexity: O(1)
 */

function processData(input) {
    const parts = input.trim().split(/\s+/);
    if (parts.length < 2) return;
    const N = parseInt(parts[0]);
    const P = parseInt(parts[1]);

    let totalSum = 0;

    for (let i = 2; i <= N; i++) {
        const root = Math.sqrt(i);
        if (Number.isInteger(root)) continue;

        totalSum += getDigitSum(i, P);
    }
    console.log(totalSum);
};

function getDigitSum(n, p) {
    let a = 5n * BigInt(n);
    let b = 5n;

    const limit = 10n ** BigInt(p + 1);

    while (b < limit) {
        if (a >= b) {
            a -= b;
            b += 10n;
        } else {
            a *= 100n;
            b = (b / 10n) * 100n + 5n;
        }
    }

    let s = (b / 10n).toString();
    let sum = 0;
    for (let i = 0; i < p; i++) {
        sum += parseInt(s[i]);
    }
    return sum;
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