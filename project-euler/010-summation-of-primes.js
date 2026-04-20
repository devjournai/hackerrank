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
        const n = parseInt(readLine());
        console.log(primeSum[n]);
    }
}

/**
 * Summation of Primes
 * Time Complexity: O(N log log N)
 * Space Complexity: O(N)
 */

const MAXN = 1000000;

const isPrime = new Array(MAXN + 1).fill(true);
isPrime[0] = isPrime[1] = false;

for (let p = 2; p * p <= MAXN; p++) {
    if (isPrime[p]) {
        for (let multiple = p * p; multiple <= MAXN; multiple += p) {
            isPrime[multiple] = false;
        }
    }
}

const primeSum = new Array(MAXN + 1).fill(0);

for (let i = 1; i <= MAXN; i++) {
    primeSum[i] = primeSum[i - 1] + (isPrime[i] ? i : 0);
};