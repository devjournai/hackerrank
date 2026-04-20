/**
 * Lattice Paths
 * Time Complexity: O(K)
 * Space Complexity: O(K)
 */

function processData(input) {
    const data = input.trim().split(/\s+/).map(Number);
    let t = data[0];
    let idx = 1;
    const queries = [];

    let maxVal = 0;

    while (t--) {
        const N = data[idx++];
        const M = data[idx++];

        queries.push([N, M]);

        if (N + M > maxVal) {
            maxVal = N + M;
        }
    }

    const MOD = 1000000007n;

    const fact = new Array(maxVal + 1);
    const invFact = new Array(maxVal + 1);

    fact[0] = 1n;
    for (let i = 1; i <= maxVal; i++) {
        fact[i] = (fact[i - 1] * BigInt(i)) % MOD;
    }

    function modPow(base, exp) {
        base = BigInt(base) % MOD;
        exp = BigInt(exp);
        let res = 1n;

        while (exp > 0n) {
            if (exp & 1n) res = (res * base) % MOD;
            base = (base * base) % MOD;
            exp >>= 1n;
        }
        return res;
    }

    invFact[maxVal] = modPow(fact[maxVal], MOD - 2n);

    for (let i = maxVal - 1; i >= 0; i--) {
        invFact[i] = (invFact[i + 1] * BigInt(i + 1)) % MOD;
    }

    function nCr(n, r) {
        if (r < 0 || r > n) return 0n;
        return (((fact[n] * invFact[r]) % MOD) * invFact[n - r]) % MOD;
    }

    const output = [];

    for (const [N, M] of queries) {
        const total = N + M;
        const ans = nCr(total, N);
        output.push(ans.toString());
    }

    console.log(output.join("\n"));
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