/**
 * Singular Integer Right Triangles
 * Time Complexity: O(N log N)
 * Space Complexity: O(N)
 */

function processData(input) {
    const arr = input.trim().split(/\s+/).map(Number);
    const T = arr[0];
    const queries = arr.slice(1);

    const maxN = Math.max(...queries);
    const limit = maxN;

    const counts = new Array(limit + 1).fill(0);

    const sqrtLimit = Math.floor(Math.sqrt(limit / 2)) + 1;

    for (let m = 2; m <= sqrtLimit; m++) {
        for (let n = 1; n < m; n++) {
            if (((m - n) & 1) === 1 && gcd(m, n) === 1) {
                const p0 = 2 * m * (m + n);
                if (p0 > limit) continue;

                for (let p = p0; p <= limit; p += p0) {
                    counts[p]++;
                }
            }
        }
    }

    const prefix = new Array(limit + 1);
    let running = 0;

    for (let i = 0; i <= limit; i++) {
        if (counts[i] === 1) running++;
        prefix[i] = running;
    }

    let out = [];
    for (let N of queries) {
        out.push(prefix[N]);
    }

    console.log(out.join("\n"));
};

function gcd(a, b) {
    while (b !== 0) {
        let t = a % b;
        a = b;
        b = t;
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