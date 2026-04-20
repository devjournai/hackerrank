/**
 * Password Derivation
 * Time Complexity: O((V + E) log V)
 * Space Complexity: O(V + E)
 */

function processData(input) {
    input = input.trim().split(/\s+/);
    const T = Number(input[0]);
    let idx = 1;

    const adj = new Map();
    const indeg = new Map();
    const chars = new Set();

    for (let i = 0; i < T; i++) {
        const s = input[idx++];

        const a = s[0], b = s[1], c = s[2];
        chars.add(a); chars.add(b); chars.add(c);

        if (!adj.has(a)) adj.set(a, new Set());
        if (!adj.has(b)) adj.set(b, new Set());
        if (!adj.has(c)) adj.set(c, new Set());
        const addEdge = (x, y) => {
            if (!adj.get(x).has(y)) {
                adj.get(x).add(y);
                indeg.set(y, (indeg.get(y) || 0) + 1);
            }
        };

        addEdge(a, b);
        addEdge(b, c);

        if (!indeg.has(a)) indeg.set(a, 0);
        if (!indeg.has(b)) indeg.set(b, indeg.get(b) || 0);
        if (!indeg.has(c)) indeg.set(c, indeg.get(c) || 0);
    }

    const heap = [];
    for (let ch of chars) {
        if ((indeg.get(ch) || 0) === 0) heap.push(ch);
    }
    heap.sort();

    let result = [];

    while (heap.length) {
        const u = heap.shift();
        result.push(u);

        for (let v of adj.get(u) || []) {
            indeg.set(v, indeg.get(v) - 1);
            if (indeg.get(v) === 0) {
                heap.push(v);
                heap.sort();
            }
        }
    }

    if (result.length !== chars.size) {
        console.log("SMTH WRONG");
    } else {
        console.log(result.join(""));
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