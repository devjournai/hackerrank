/**
 * Truncatable Primes
 * Time Complexity: O(N log log N)
 * Space Complexity: O(N)
 */

function processData(input) {
    const N = Number(input.trim());

    const isPrime = new Array(N + 1).fill(true);
    isPrime[0] = isPrime[1] = false;

    for (let i = 2; i * i <= N; i++) {
        if (isPrime[i]) {
            for (let j = i * i; j <= N; j += i) {
                isPrime[j] = false;
            }
        }
    }

    let sum = 0;

    for (let p = 11; p < N; p++) {
        if (!isPrime[p]) continue;

        if (isTruncatable(p, isPrime)) {
            sum += p;
        }
    }

    console.log(sum);
};

function isTruncatable(num, isPrime) {
    let s = num.toString();

    for (let i = 1; i < s.length; i++) {
        const right = Number(s.slice(i));
        if (!isPrime[right]) return false;
    }

    for (let i = s.length - 1; i > 0; i--) {
        const left = Number(s.slice(0, i));
        if (!isPrime[left]) return false;
    }

    return true;
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