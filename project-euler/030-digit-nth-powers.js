/**
 * Digit N-th Power Sums
 * Time Complexity: O(M log M)
 * Space Complexity: O(1)
 */

function processData(input) {
    const N = parseInt(input.trim(), 10);

    const pow = [];
    for (let d = 0; d <= 9; d++) pow[d] = Math.pow(d, N);

    let maxSum = 0;
    for (let digits = 1; ; digits++) {
        const candidate = digits * Math.pow(9, N);
        if (candidate < Math.pow(10, digits - 1)) break;
        maxSum = candidate;
    }

    let result = 0;

    for (let num = 2; num <= maxSum; num++) {
        let sum = 0;
        let x = num;

        while (x > 0) {
            sum += pow[x % 10];
            x = Math.floor(x / 10);
        }

        if (sum === num) result += num;
    }

    console.log(result);
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