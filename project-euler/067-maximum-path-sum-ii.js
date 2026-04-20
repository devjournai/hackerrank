/**
 * Maximum Path Sum II
 * Time Complexity: O(T * N^2)
 * Space Complexity: O(N^2)
 */

function processData(input) {
    const data = input.trim().split(/\s+/).map(Number);
    let idx = 0;

    const T = data[idx++];

    let outputs = [];

    for (let t = 0; t < T; t++) {
        const N = data[idx++];

        let tri = [];
        for (let i = 0; i < N; i++) {
            tri[i] = [];
            for (let j = 0; j < i + 1; j++) {
                tri[i][j] = data[idx++];
            }
        }

        for (let r = N - 2; r >= 0; r--) {
            for (let c = 0; c <= r; c++) {
                tri[r][c] += Math.max(tri[r + 1][c], tri[r + 1][c + 1]);
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