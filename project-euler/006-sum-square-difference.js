process.stdin.resume();
process.stdin.setEncoding('ascii');

let input_stdin = "";
let input_stdin_array = "";
let input_currentline = 0;

process.stdin.on('data', function (data) {
    input_stdin += data;
});

process.stdin.on('end', function () {
    input_stdin_array = input_stdin.trim().split("\n");
    main();
});

function readLine() {
    return input_stdin_array[input_currentline++];
}

function main() {
    const t = parseInt(readLine());

    for (let i = 0; i < t; i++) {
        const n = readLine();
        console.log(sumSquareDifference(n).toString());
    }
}

/**
 * Sum Square Difference
 * Time Complexity: O(1)
 * Space Complexity: O(1)
 */

function sumSquareDifference(n) {
    n = BigInt(n);
    const sum = n * (n + 1n) / 2n;
    const squareOfSum = sum * sum;
    const sumOfSquares = n * (n + 1n) * (2n * n + 1n) / 6n;
    return squareOfSum - sumOfSquares;
};