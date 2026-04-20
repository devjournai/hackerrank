/**
 * Coin Partitions
 * Time Complexity: O(N * sqrt(N))
 * Space Complexity: O(N)
 */

function processData(input) {
    const MOD = 1000000007;

    const data = input.trim().split(/\s+/).map(Number);
    const T = data[0];
    const queries = data.slice(1);
    const maxN = Math.max(...queries);

    const p = new Array(maxN + 1).fill(0);
    p[0] = 1;

    for (let n = 1; n <= maxN; n++) {
        let total = 0;
        for (let k = 1; ; k++) {
            const g1 = k * (3 * k - 1) / 2;
            if (g1 > n) break;

            const sign = (k % 2 === 1) ? 1 : -1;

            total += sign * p[n - g1];
            total %= MOD;

            const g2 = k * (3 * k + 1) / 2;
            if (g2 > n) continue;

            total += sign * p[n - g2];
            total %= MOD;
        }

        if (total < 0) total += MOD;
        p[n] = total;
    }

    let out = [];
    for (let n of queries) {
        out.push(p[n].toString());
    }

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