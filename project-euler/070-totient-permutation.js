/**
 * Totient Permutation
 * Time Complexity: O(N log log N)
 * Space Complexity: O(N)
 */

function processData(input) {
    const N = parseInt(input.trim(), 10);

    const phi = new Array(N + 1);
    for (let i = 0; i <= N; i++) phi[i] = i;

    for (let p = 2; p <= N; p++) {
        if (phi[p] === p) {
            for (let k = p; k <= N; k += p) {
                phi[k] -= phi[k] / p;
            }
        }
    }

    function isPermutation(a, b) {
        const ca = new Array(10).fill(0);
        const cb = new Array(10).fill(0);

        while (a > 0) {
            ca[a % 10]++;
            a = Math.floor(a / 10);
        }

        while (b > 0) {
            cb[b % 10]++;
            b = Math.floor(b / 10);
        }

        for (let i = 0; i < 10; i++) {
            if (ca[i] !== cb[i]) return false;
        }
        return true;
    }

    let bestN = 0;
    let bestRatio = Number.POSITIVE_INFINITY;

    for (let n = 2; n < N; n++) {
        const ph = phi[n];

        if (!isPermutation(n, ph)) continue;

        const ratio = n / ph;

        if (ratio < bestRatio - 1e-15) {
            bestRatio = ratio;
            bestN = n;
        } else if (Math.abs(ratio - bestRatio) < 1e-15 && n < bestN) {
            bestN = n;
        }
    }

    console.log(bestN);
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