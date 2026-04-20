/**
 * Double-base Palindromes
 * Time Complexity: O(N log_K N)
 * Space Complexity: O(log_K N)
 */

function processData(input) {
    const parts = input.trim().split(/\s+/).map(Number);
    const N = parts[0];
    const K = parts[1];

    let sum = 0;

    for (let x = 1; x < N; x++) {
        if (isPalindromeDecimal(x) && isPalindromeBaseK(x, K)) {
            sum += x;
        }
    }

    console.log(sum);
};

function isPalindromeDecimal(n) {
    const s = n.toString();
    return s === s.split('').reverse().join('');
};

function isPalindromeBaseK(n, K) {
    const baseStr = toBase(n, K);
    return baseStr === baseStr.split('').reverse().join('');
};

function toBase(n, K) {
    let s = "";
    while (n > 0) {
        s = (n % K).toString() + s;
        n = Math.floor(n / K);
    }
    return s;
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