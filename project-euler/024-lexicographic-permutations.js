/**
 * Lexicographic Permutations
 * Time Complexity: O(L^2)
 * Space Complexity: O(L)
 */

function processData(input) {
    const data = input.trim().split(/\s+/).map(BigInt);
    let idx = 0;

    const T = Number(data[idx++]);
    const outputs = [];

    const letters = "abcdefghijklm".split("");
    const L = letters.length;

    const fact = new Array(L + 1);
    fact[0] = 1n;
    for (let i = 1; i <= L; i++) fact[i] = fact[i - 1] * BigInt(i);

    for (let t = 0; t < T; t++) {
        let N = data[idx++];
        N--;

        let pool = letters.slice();
        let result = [];

        for (let pos = L - 1; pos >= 0; pos--) {
            const f = fact[pos];
            const index = N / f;
            N = N % f;

            result.push(pool[Number(index)]);
            pool.splice(Number(index), 1);
        }

        outputs.push(result.join(""));
    }

    console.log(outputs.join("\n"));
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