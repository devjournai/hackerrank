/**
 * Combinatoric Selections
 * Time Complexity: O(N^2)
 * Space Complexity: O(1)
 */

function processData(input) {
    input = input.trim().split(/\s+/).map(BigInt);

    const N = Number(input[0]);
    const K = input[1];

    let ans = 0n;

    for (let n = 1; n <= N; n++) {

        let c = 1n;
        for (let r = 0; r <= n; r++) {

            if (c > K) {
                let count = BigInt((n + 1) - 2 * r);
                ans += count;
                break;
            }
            c = c * BigInt(n - r) / BigInt(r + 1);
        }
    }

    console.log(ans.toString());
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