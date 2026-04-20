/**
 * Cuboid Route
 * Time Complexity: O(N log N)
 * Space Complexity: O(N)
 */

function processData(input) {
    const lines = input.trim().split(/\s+/);
    let idx = 0;

    const LIMIT = 1000000;

    const solutions = countAll(LIMIT);

    const total = new Array(LIMIT + 1);
    let sum = 0;
    for (let i = 0; i <= LIMIT; i++) {
        sum += solutions[i];
        total[i] = sum;
    }

    const T = Number(lines[idx++]);
    let out = "";

    for (let i = 0; i < T; i++) {
        const N = Number(lines[idx++]);
        out += total[N] + "\n";
    }

    console.log(out.trim());
};


function getSquareRoot(a) {
    let f = 0;
    let ret = 0;
    for (let i = 0; i < 16; i++) {
        ret <<= 1;
        const kari_f = (f + 1) << ((15 - i) * 2);
        if (a >= kari_f) {
            f = f + 2;
            a -= kari_f;
            ret += 1;
        }
        f <<= 1;
    }
    return ret;
};

function combinations(a, b_c) {
    if (2 * a < b_c) return 0;
    if (a >= b_c) return Math.floor(b_c / 2);
    return a - Math.floor((b_c - 1) / 2);
};

function gcd(a, b) {
    while (a !== 0) {
        const temp = a;
        a = b % a;
        b = temp;
    }
    return b;
};

function countAll(limit) {
    const solutions = new Array(limit + 1).fill(0);

    const maxM = getSquareRoot(2 * limit);

    for (let m = 1; m <= maxM; m++) {
        for (let n = 1; n < m; n++) {
            if (((m ^ n) & 1) && gcd(m, n) === 1) {
                const x = m * m - n * n;
                const y = 2 * m * n;

                for (let k = 1; k * x <= limit; k++) {
                    const t = k * x;
                    solutions[t] += combinations(t, k * y);
                }

                for (let k = 1; k * y <= limit; k++) {
                    const t = k * y;
                    solutions[t] += combinations(t, k * x);
                }
            }
        }
    }
    return solutions;
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