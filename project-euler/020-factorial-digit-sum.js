/**
 * Factorial Digit Sum
 * Time Complexity: O(maxN * D)
 * Space Complexity: O(maxN)
 */

function processData(input) {
    const nums = input.trim().split(/\s+/).map(Number);
    const T = nums[0];
    const queries = nums.slice(1);

    const maxN = Math.max(...queries);

    const digitSum = new Array(maxN + 1).fill(0);

    let fact = 1n;

    digitSum[0] = 1;

    for (let i = 1; i <= maxN; i++) {
        fact *= BigInt(i);

        const s = fact.toString();
        let sum = 0;
        for (let ch of s) sum += ch.charCodeAt(0) - 48;

        digitSum[i] = sum;
    }

    let out = [];
    for (let n of queries) {
        out.push(digitSum[n]);
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