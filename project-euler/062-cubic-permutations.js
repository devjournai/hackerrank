/**
 * Cubes Permutations
 * Time Complexity: O(N * D log D)
 * Space Complexity: O(N)
 */

function processData(input) {
    let [N, K] = input.trim().split(/\s+/).map(Number);

    const map = new Map();
    for (let a = 1; a < N; a++) {
        const cube = BigInt(a) * BigInt(a) * BigInt(a);

        const sig = cube.toString().split('').sort().join('');

        if (!map.has(sig)) map.set(sig, []);
        map.get(sig).push(cube);
    }

    const answers = [];

    for (let [sig, list] of map.entries()) {
        if (list.length === K) {
            list.sort((x, y) => (x < y ? -1 : x > y ? 1 : 0));
            answers.push(list[0]);
        }
    }

    answers.sort((x, y) => (x < y ? -1 : x > y ? 1 : 0));
    console.log(answers.map(v => v.toString()).join("\n"));
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