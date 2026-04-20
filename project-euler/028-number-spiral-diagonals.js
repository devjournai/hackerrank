/**
 * Number Spiral Diagonals
 * Time Complexity: O(T)
 * Space Complexity: O(1)
 */

function processData(input) {
    const MOD = 1000000007n;

    const arr = input.trim().split(/\s+/);
    let t = Number(arr[0]);
    let idx = 1;

    while (t--) {
        let N = BigInt(arr[idx++]);
        let n2 = (N * N) % MOD;
        let n3 = (n2 * N) % MOD;

        let num =
            (4n * n3 % MOD +
                3n * n2 % MOD +
                8n * N % MOD +
                (MOD - 9n)) % MOD;

        const inv6 = 166666668n;

        let ans = (num * inv6) % MOD;

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