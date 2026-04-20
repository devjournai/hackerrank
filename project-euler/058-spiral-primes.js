/**
 * Spiral Primes
 * Time Complexity: O(L * log^3 n)
 * Space Complexity: O(1)
 */

function processData(input) {
    const threshold = parseFloat(input.trim());

    function modPow(base, exp, mod) {
        let res = 1n;
        base %= mod;
        while (exp > 0n) {
            if (exp & 1n) res = (res * base) % mod;
            base = (base * base) % mod;
            exp >>= 1n;
        }
        return res;
    }

    function isPrime(n) {
        if (n < 2n) return false;
        if (n === 2n || n === 3n) return true;
        if (n % 2n === 0n) return false;

        let d = n - 1n;
        let s = 0n;
        while ((d & 1n) === 0n) {
            d >>= 1n;
            s++;
        }

        const bases = [2n, 3n, 5n, 7n, 11n, 13n];

        for (let a of bases) {
            if (a >= n) continue;
            let x = modPow(a, d, n);
            if (x === 1n || x === n - 1n) continue;

            let continueOuter = false;
            for (let r = 1n; r < s; r++) {
                x = (x * x) % n;
                if (x === n - 1n) {
                    continueOuter = true;
                    break;
                }
            }
            if (continueOuter) continue;

            return false;
        }

        return true;
    }

    let side = 1n;
    let primes = 0n;
    let total = 1n;

    while (true) {
        side += 2n;
        const s = side;
        const step = side - 1n;

        const c1 = s * s;
        const c2 = c1 - step;
        const c3 = c2 - step;
        const c4 = c3 - step;

        if (isPrime(c2)) primes++;
        if (isPrime(c3)) primes++;
        if (isPrime(c4)) primes++;

        total += 4n;

        const ratio = Number(primes * 100n) / Number(total);

        if (ratio < threshold) {
            console.log(side.toString());
            return;
        }
    }
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