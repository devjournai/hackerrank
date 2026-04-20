/**
 * Powerful Digit Sum
 * Time Complexity: O(N^2 * D)
 * Space Complexity: O(1)
 */

function processData(input) {
    const N = parseInt(input.trim(), 10);

    let maxSum = 0;

    function digitSum(x) {
        const s = x.toString();
        let sum = 0;
        for (let ch of s) sum += (ch.charCodeAt(0) - 48);
        return sum;
    }

    for (let a = 1; a < N; a++) {
        for (let b = 1; b < N; b++) {
            const value = BigInt(a) ** BigInt(b);
            const s = digitSum(value);
            if (s > maxSum) maxSum = s;
        }
    }
    console.log(maxSum);
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