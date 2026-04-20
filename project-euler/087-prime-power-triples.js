/**
 * Prime Power Triples
 * Time Complexity: O(N log log N)
 * Space Complexity: O(N)
 */

function processData(input) {
    const data = input.trim().split('\n').map(Number);
    const T = data[0];
    const queries = data.slice(1);

    const MAXN = Math.max(...queries);

    function sieve(n) {
        const isPrime = new Uint8Array(n + 1);
        isPrime.fill(1);
        isPrime[0] = isPrime[1] = 0;

        for (let i = 2; i * i <= n; i++) {
            if (isPrime[i]) {
                for (let j = i * i; j <= n; j += i) {
                    isPrime[j] = 0;
                }
            }
        }

        const primes = [];
        for (let i = 2; i <= n; i++) {
            if (isPrime[i]) primes.push(i);
        }
        return primes;
    }

    const primes2 = sieve(Math.floor(Math.sqrt(MAXN)));
    const primes3 = sieve(Math.floor(Math.cbrt(MAXN)));
    const primes4 = sieve(Math.floor(Math.pow(MAXN, 0.25)));

    const possible = new Uint8Array(MAXN + 1);

    for (const p of primes2) {
        const p2 = p * p;
        if (p2 > MAXN) break;

        for (const q of primes3) {
            const q3 = q * q * q;
            if (p2 + q3 > MAXN) break;

            for (const r of primes4) {
                const r4 = r ** 4;
                const sum = p2 + q3 + r4;
                if (sum > MAXN) break;
                possible[sum] = 1;
            }
        }
    }

    const prefix = new Int32Array(MAXN + 1);
    for (let i = 1; i <= MAXN; i++) {
        prefix[i] = prefix[i - 1] + possible[i];
    }

    let output = [];
    for (const N of queries) {
        output.push(prefix[N].toString());
    }

    console.log(output.join('\n'));
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