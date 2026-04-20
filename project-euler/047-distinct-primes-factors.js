/**
 * Distinct Prime Factors
 * Time Complexity: O(N log log N)
 * Space Complexity: O(N)
 */

function processData(input) {
    const parts = input.trim().split(/\s+/).map(Number);
    const N = parts[0];
    const K = parts[1];

    const limit = N + K + 5;
    const cnt = new Array(limit + 1).fill(0);

    for (let p = 2; p <= limit; p++) {
        if (cnt[p] === 0) {
            for (let m = p; m <= limit; m += p) {
                cnt[m]++;
            }
        }
    }

    const ans = [];
    let consec = 0;

    for (let i = 2; i <= N + K; i++) {
        if (cnt[i] === K) {
            consec++;
            if (consec === K) {
                const start = i - K + 1;
                if (start <= N) ans.push(start);
                consec--;
            }
        } else {
            consec = 0;
        }
    }

    console.log(ans.join("\n"));
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