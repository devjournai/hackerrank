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
        console.log(largestPrimeFactor(n).toString());
    }
}

/**
 * Largest Prime Factor
 * Time Complexity: O(sqrt(N))
 * Space Complexity: O(1)
 */

function largestPrimeFactor(n) {
    n = BigInt(n);

    let largest = 1n;
    while (n % 2n === 0n) {
        largest = 2n;
        n /= 2n;
    }

    let factor = 3n;
    while (factor * factor <= n) {
        while (n % factor === 0n) {
            largest = factor;
            n /= factor;
        }
        factor += 2n;
    }

    if (n > 1n) {
        largest = n;
    }

    return largest;
};