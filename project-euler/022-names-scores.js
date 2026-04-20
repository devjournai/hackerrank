/**
 * Name Scores
 * Time Complexity: O(N log N)
 * Space Complexity: O(N)
 */

function processData(input) {
    const parts = input.trim().split(/\s+/);
    let idx = 0;

    const N = parseInt(parts[idx++]);
    const names = [];

    for (let i = 0; i < N; i++) {
        names.push(parts[idx++]);
    }

    names.sort();

    const scoreMap = new Map();

    function nameValue(str) {
        let sum = 0;
        for (const ch of str) {
            const code = ch.toUpperCase().charCodeAt(0) - 64;
            sum += code;
        }
        return sum;
    }

    for (let i = 0; i < N; i++) {
        const value = nameValue(names[i]);
        const position = i + 1;
        scoreMap.set(names[i], value * position);
    }

    const Q = parseInt(parts[idx++]);
    const outputs = [];

    for (let i = 0; i < Q; i++) {
        const qname = parts[idx++];
        outputs.push(scoreMap.get(qname));
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