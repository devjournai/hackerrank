/**
 * Self Powers
 * Time Complexity: O(N log N)
 * Space Complexity: O(1)
 */

function modPow(base, exp, mod) {
    let result = 1n;
    let b = BigInt(base) % mod;
    let e = BigInt(exp);

    while (e > 0n) {
        if (e & 1n) result = (result * b) % mod;
        b = (b * b) % mod;
        e >>= 1n;
    }
    return result;
};

function processData(input) {
    const N = Number(input.trim());
    const MOD = 10n ** 10n;

    let sum = 0n;

    for (let i = 1; i <= N; i++) {
        sum = (sum + modPow(i, i, MOD)) % MOD;
    }

    console.log(sum.toString());
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