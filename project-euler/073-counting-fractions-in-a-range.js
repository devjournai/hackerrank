/**
 * Counting Fractions in a Range
 * Time Complexity: O(D log D)
 * Space Complexity: O(D)
 */

function processData(input) {
    let [A, D] = input.trim().split(/\s+/).map(Number);

    let mu = new Array(D + 1).fill(1);
    let prime = new Array(D + 1).fill(true);
    prime[0] = prime[1] = false;

    for (let i = 2; i <= D; i++) {
        if (!prime[i]) continue;
        mu[i] = -mu[i];
        for (let j = 2 * i; j <= D; j += i) {
            prime[j] = false;
            mu[j] = -mu[j];
        }
        let sq = i * i;
        if (sq <= D) {
            for (let j = sq; j <= D; j += sq) mu[j] = 0;
        }
    }

    let ans = 0;

    for (let k = 1; k <= D; k++) {
        if (mu[k] === 0) continue;

        for (let m = 1; m * k <= D; m++) {
            let d = m * k;

            let U = Math.floor((d - 1) / A);
            let L = Math.floor(d / (A + 1));

            let term = Math.floor(U / k) - Math.floor(L / k);

            ans += mu[k] * term;
        }
    }

    console.log(ans);
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