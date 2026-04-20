/**
 * Permuted Multiples
 * Time Complexity: O(N * K * D)
 * Space Complexity: O(1)
 */

function processData(input) {
    input = input.trim().split(/\s+/).map(Number);
    const N = input[0];
    const K = input[1];

    function sig(n) {
        const cnt = new Array(10).fill(0);
        while (n > 0) {
            cnt[n % 10]++;
            n = Math.floor(n / 10);
        }
        return cnt.join('#');
    }

    let out = [];

    for (let x = 1; x <= N; x++) {
        const len = ('' + x).length;
        const s = sig(x);
        let ok = true;

        const line = [x];

        for (let m = 2; m <= K; m++) {
            const v = m * x;
            if (('' + v).length !== len) {
                ok = false;
                break;
            }

            if (sig(v) !== s) {
                ok = false;
                break;
            }

            line.push(v);
        }

        if (ok) {
            out.push(line.join(" "));
        }
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