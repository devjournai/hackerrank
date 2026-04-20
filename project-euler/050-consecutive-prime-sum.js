/**
 * Consecutive Prime Sum
 * Time Complexity: 
 * Space Complexity: 
 */

function modMul(a, b, m) {
    return (a * b) % m;
};

function modPow(base, exp, mod) {
    let res = 1n;
    let b = base % mod;
    let e = exp;

    while (e > 0n) {
        if (e & 1n) res = (res * b) % mod;
        b = (b * b) % mod;
        e >>= 1n;
    }
    return res;
};

function isPrimeMR(n) {
    if (n < 2n) return false;
    const smallPrimes = [2n, 3n, 5n, 7n, 11n, 13n, 17n, 19n, 23n, 29n, 31n, 37n];
    for (let p of smallPrimes) {
        if (n === p) return true;
        if (n % p === 0n) return n === p;
    }

    let d = n - 1n, s = 0n;
    while ((d & 1n) === 0n) {
        d >>= 1n;
        s++;
    }

    const bases = [2n, 3n, 5n, 7n, 11n];
    for (let a of bases) {
        if (a >= n) continue;
        let x = modPow(a, d, n);
        if (x === 1n || x === n - 1n) continue;

        let comp = true;
        for (let r = 1n; r < s; r++) {
            x = (x * x) % n;
            if (x === n - 1n) {
                comp = false;
                break;
            }
        }
        if (comp) return false;
    }
    return true;
};

function processData(input) {
    const data = input.trim().split(/\s+/).map(BigInt);
    let t = Number(data[0]);
    const Ns = data.slice(1);

    const limit = 10000000;
    const isPrime = new Array(limit + 1).fill(true);
    isPrime[0] = isPrime[1] = false;

    for (let p = 2; p * p <= limit; p++) {
        if (isPrime[p]) {
            for (let m = p * p; m <= limit; m += p) {
                isPrime[m] = false;
            }
        }
    }

    const primes = [];
    for (let i = 2; i <= limit; i++) {
        if (isPrime[i]) primes.push(BigInt(i));
    }

    const pref = new Array(primes.length + 1);
    pref[0] = 0n;
    for (let i = 0; i < primes.length; i++) {
        pref[i + 1] = pref[i] + primes[i];
    }

    let results = [];

    for (let N of Ns) {
        let bestLen = 0;
        let bestPrime = 0n;

        const P = primes.length;

        for (let i = 0; i < P; i++) {
            for (let j = i + bestLen + 1; j <= P; j++) {
                let sum = pref[j] - pref[i];
                if (sum > N) break;

                if (isPrimeMR(sum)) {
                    let len = j - i;
                    if (len > bestLen || (len === bestLen && sum < bestPrime)) {
                        bestLen = len;
                        bestPrime = sum;
                    }
                }
            }
        }

        results.push(`${bestPrime.toString()} ${bestLen}`);
    }

    console.log(results.join("\n"));
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