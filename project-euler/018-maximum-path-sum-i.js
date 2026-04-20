/**
 * Maximum Path Sum 1
 * Time Complexity: O(N^2)
 * Space Complexity: O(N^2)
 */

function processData(input) {
    const lines = input.trim().split(/\s+/).map(Number);
    let idx = 0;

    const T = lines[idx++];
    const outputs = [];

    for (let t = 0; t < T; t++) {

        const N = lines[idx++];

        const tri = [];
        for (let i = 0; i < N; i++) {
            tri[i] = [];
            for (let j = 0; j < i + 1; j++) {
                tri[i][j] = lines[idx++];
            }
        }

        for (let i = N - 2; i >= 0; i--) {
            for (let j = 0; j <= i; j++) {
                tri[i][j] += Math.max(tri[i + 1][j], tri[i + 1][j + 1]);
            }
        }

        outputs.push(tri[0][0]);
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