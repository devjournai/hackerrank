/**
 * Counting Fractions
 * Time Complexity: O(N log log N + T)
 * Space Complexity: O(N)
 */

function processData(input) {
    const parts = input.trim().split(/\s+/).map(Number);
    let T = parts[0];

    let Ns = parts.slice(1);
    let maxN = Math.max(...Ns);

    let phi = new Array(maxN + 1);
    for (let i = 0; i <= maxN; i++) phi[i] = i;

    for (let i = 2; i <= maxN; i++) {
        if (phi[i] === i) {
            for (let j = i; j <= maxN; j += i) {
                phi[j] -= phi[j] / i;
            }
        }
    }

    let pref = new Array(maxN + 1);
    pref[0] = 0;
    pref[1] = 0;

    for (let i = 2; i <= maxN; i++) {
        pref[i] = pref[i - 1] + phi[i];
    }

    let out = [];
    for (let n of Ns) {
        out.push(pref[n]);
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