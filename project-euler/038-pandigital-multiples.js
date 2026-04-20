/**
 * Pandigital Multipliers
 * Time Complexity: O(N * K)
 * Space Complexity: O(1)
 */

function processData(input) {
    const parts = input.trim().split(/\s+/).map(Number);
    const N = parts[0];
    const K = parts[1];

    let output = [];

    for (let M = 2; M < N; M++) {
        let s = "";
        let mul = 1;

        while (s.length < K) {
            s += (M * mul).toString();
            mul++;
        }

        if (s.length === K && isPandigital(s, K)) {
            output.push(M);
        }
    }

    if (output.length === 0) {
        console.log(-1);
    } else {
        console.log(output.join("\n"));
    }
};

function isPandigital(str, K) {
    if (str.includes('0')) return false;
    if (str.length !== K) return false;

    const seen = new Array(K + 1).fill(false);

    for (let c of str) {
        const d = c.charCodeAt(0) - 48;
        if (d < 1 || d > K || seen[d]) return false;
        seen[d] = true;
    }
    return true;
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