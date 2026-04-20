/** 
 * Quadratic Primes
 * Time Complexity: O(LIMIT log log LIMIT + N^3 / ln N)
 * Space Complexity: O(LIMIT)
 */

function processData(input) {
    const N = parseInt(input.trim(), 10);

    const LIMIT = 9000000;

    const isPrime = new Array(LIMIT + 1).fill(true);
    isPrime[0] = isPrime[1] = false;
    for (let i = 2; i * i <= LIMIT; i++) {
        if (isPrime[i]) {
            for (let j = i * i; j <= LIMIT; j += i) {
                isPrime[j] = false;
            }
        }
    }

    const primesUpToN = [];
    for (let i = 2; i <= N; i++) {
        if (isPrime[i]) primesUpToN.push(i);
    }

    let bestA = 0, bestB = 0, bestLen = -1;

    for (const b of primesUpToN) {
        for (let a = -N; a <= N; a++) {
            let n = 0;
            while (true) {
                const val = n * n + a * n + b;
                if (val < 0 || val > LIMIT || !isPrime[val]) break;
                n++;
            }
            if (n > bestLen) {
                bestLen = n;
                bestA = a;
                bestB = b;
            }
        }
    }

    console.log(bestA + " " + bestB);
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