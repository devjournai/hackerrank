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
        const n = BigInt(readLine());
        console.log(evenFibonacciSum(n).toString());
    }
}

/**
 * Even Fibonacci Numbers
 * Time Complexity: O(log N)
 * Space Complexity: O(1)
 */

function evenFibonacciSum(N) {
    let sum = 0n;

    let e1 = 2n;
    let e2 = 8n;

    if (N >= e1) sum += e1;
    if (N >= e2) sum += e2;

    while (true) {
        let e3 = 4n * e2 + e1;

        if (e3 > N) break;

        sum += e3;

        e1 = e2;
        e2 = e3;
    }

    return sum;
};