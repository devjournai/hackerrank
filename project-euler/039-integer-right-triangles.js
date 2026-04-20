/**
 * Integer Right Triangles
 * Time Complexity: O(N log N + T)
 * Space Complexity: O(N)
 */

function processData(input) {
    const lines = input.trim().split(/\s+/);
    let idx = 0;

    const T = Number(lines[idx++]);
    const queries = [];
    let maxN = 0;

    for (let i = 0; i < T; i++) {
        const n = Number(lines[idx++]);
        queries.push(n);
        if (n > maxN) maxN = n;
    }

    const counts = new Array(maxN + 1).fill(0);
    const limit = Math.floor(Math.sqrt(maxN * 0.5)) + 1;

    for (let m = 2; m <= limit; m++) {
        for (let n = (m % 2 === 0 ? 1 : 2); n < m; n += 2) {
            if (gcd(m, n) !== 1) continue;

            const primitivePerimeter = 2 * m * (m + n);
            if (primitivePerimeter > maxN) break;

            for (let p = primitivePerimeter; p <= maxN; p += primitivePerimeter) {
                counts[p]++;
            }
        }
    }

    const best = new Array(maxN + 1).fill(0);
    let bestP = 0;
    let bestCount = 0;

    for (let p = 0; p <= maxN; p++) {
        if (counts[p] > bestCount) {
            bestCount = counts[p];
            bestP = p;
        }
        best[p] = bestP;
    }

    let output = [];
    for (const n of queries) {
        output.push(String(best[n]));
    }

    console.log(output.join("\n"));
};

function gcd(a, b) {
    while (b !== 0) {
        const t = b;
        b = a % b;
        a = t;
    }
    return a;
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