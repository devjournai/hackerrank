/**
 * Diophantine Reciprocals I
 * Time Complexity: O(T * N^(1/4))
 * Space Complexity: O(log N)
 */

function processData(input) {
    const lines = input.trim().split(/\s+/);
    let ptr = 0;
    
    if (lines.length === 0) return;
    const T = parseInt(lines[ptr++], 10);

    for (let i = 0; i < T; i++) {
        const nStr = lines[ptr++];
        if (!nStr) break;
        const n = BigInt(nStr);
        console.log(solve(n).toString());
    }
};

function solve(n) {
    const factors = new Map();
    
    function factorize(num) {
        if (num === 1n) return;
        if (is_prime_mr(num)) {
            factors.set(num, (factors.get(num) || 0n) + 1n);
            return;
        }
        const divisor = pollard_rho(num);
        factorize(divisor);
        factorize(num / divisor);
    }

    factorize(n);

    let divisors_count = 1n;
    for (const exponent of factors.values()) {
        divisors_count *= (2n * exponent + 1n);
    }

    return (divisors_count + 1n) / 2n;
};

function is_prime_mr(n) {
    if (n < 2n) return false;
    if (n === 2n || n === 3n) return true;
    if (n % 2n === 0n) return false;

    let d = n - 1n;
    let s = 0n;
    while (d % 2n === 0n) {
        d /= 2n;
        s++;
    }

    const bases = [2n, 3n, 5n, 7n, 11n, 13n, 17n, 19n, 23n, 29n, 31n, 37n];

    for (const a of bases) {
        if (n <= a) break;
        let x = powerMod(a, d, n);
        if (x === 1n || x === n - 1n) continue;
        let composite = true;
        for (let r = 1n; r < s; r++) {
            x = (x * x) % n;
            if (x === n - 1n) {
                composite = false;
                break;
            }
        }
        if (composite) return false;
    }
    return true;
};

function powerMod(base, exp, mod) {
    let res = 1n;
    base %= mod;
    while (exp > 0n) {
        if (exp % 2n === 1n) res = (res * base) % mod;
        base = (base * base) % mod;
        exp /= 2n;
    }
    return res;
};

function gcd(a, b) {
    while (b > 0n) {
        let temp = b;
        b = a % b;
        a = temp;
    }
    return a;
};

function pollard_rho(n) {
    if (n === 1n) return 1n;
    if (n % 2n === 0n) return 2n;
    
    let x = 2n;
    let y = 2n;
    let d = 1n;
    let c = 1n;
    
    const f = (val) => (val * val + c) % n;

    while (d === 1n) {
        x = f(x);
        y = f(f(y));
        let diff = x > y ? x - y : y - x;
        d = gcd(diff, n);
        
        if (d === n) {
            x = BigInt(Math.floor(Math.random() * 1000) + 2);
            y = x;
            c++;
            d = 1n;
        }
    }
    return d;
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