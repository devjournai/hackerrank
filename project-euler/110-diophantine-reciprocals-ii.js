/**
 * Diophantine Reciprocals II
 * Time Complexity: O(Search Space)
 * Space Complexity: O(1)
 */

function processData(input) {
    const X = parseInt(input.trim(), 10);
    const LIMIT = BigInt(2 * X - 1);

    const primes = [
        2n, 3n, 5n, 7n, 11n, 13n, 17n, 19n, 23n, 29n,
        31n, 37n, 41n, 43n, 47n, 53n, 59n, 61n, 67n, 71n,
        73n, 79n, 83n, 89n, 97n, 101n, 103n, 107n, 109n, 113n,
        127n, 131n, 137n, 139n, 149n, 151n, 157n, 163n, 167n, 173n,
        179n, 181n, 191n, 193n, 197n, 199n, 211n, 223n, 227n, 229n
    ];
    
    let ans = null;

    function dfs(primeIdx, currentN, currentDivisors, maxExponent) {
        if (ans !== null && currentN > ans) return;
        if (currentDivisors >= LIMIT) {
            if (ans === null || currentN < ans) {
                ans = currentN;
            }
            return;
        }

        if (primeIdx === primes.length) return;

        const p = primes[primeIdx];
        let nextN = currentN;
        for (let e = 1; e <= maxExponent; e++) {
            nextN *= p;
            if (ans !== null && nextN > ans) break;
            const nextDivisors = currentDivisors * BigInt(2 * e + 1);
            dfs(primeIdx + 1, nextN, nextDivisors, e);
        }
    }

    dfs(0, 1n, 1n, 60);

    if (ans !== null) {
        console.log(ans.toString());
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