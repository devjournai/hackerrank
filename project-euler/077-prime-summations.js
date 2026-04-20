/**
 * Prime Summations
 * Time Complexity: O(N log log N)
 * Space Complexity: O(N)
 */

function processData(input) {
    const data = input.trim().split(/\s+/).map(Number);
    const T = data[0];
    const queries = data.slice(1);
    const maxN = Math.max(...queries);

    const sieve = Array(maxN + 1).fill(true);
    sieve[0] = sieve[1] = false;
    for (let i = 2; i * i <= maxN; i++) {
        if (sieve[i]) {
            for (let j = i * i; j <= maxN; j += i) sieve[j] = false;
        }
    }
    const primes = [];
    for (let i = 2; i <= maxN; i++) if (sieve[i]) primes.push(i);

    const dp = Array(maxN + 1).fill(0n);
    dp[0] = 1n;

    for (let p of primes) {
        for (let n = p; n <= maxN; n++) {
            dp[n] += dp[n - p];
        }
    }

    let out = [];
    for (let n of queries) out.push(dp[n].toString());
    console.log(out.join("\n"));
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