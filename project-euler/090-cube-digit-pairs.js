/**
 * Cube Digit Pairs
 * Time Complexity:
 *   M = 1 → O(C(10,6) × S)
 *   M = 2 → O(C(10,6)² × S)
 *   M = 3 → O(C(10,6)³ × S)
 * Space Complexity: O(C(10,6)²)
 */

function processData(input) {
    const data = input.trim().split(/\s+/).map(Number);
    let idx = 0;
    const N = data[idx++];
    const M = data[idx++];

    const sq = [];
    for (let i = 1; i <= N; i++) {
        const s = String(i * i).padStart(M, "0").split("").map(Number);
        sq.push(s);
    }

    function can(d, x) {
        return d.has(x) || ((x === 6 || x === 9) && (d.has(6) || d.has(9)));
    }

    const dice = [];
    function gen(start, comb) {
        if (comb.length === 6) {
            dice.push(new Set(comb));
            return;
        }
        for (let i = start; i <= 9; i++) {
            comb.push(i);
            gen(i + 1, comb);
            comb.pop();
        }
    }
    gen(0, []);

    const cache = new Map();

    function checkPair(i, j) {
        const key = i + "," + j;
        if (cache.has(key)) return cache.get(key);

        const d1 = dice[i];
        const d2 = dice[j];

        let ok = true;
        for (const s of sq) {
            if (!(
                (can(d1, s[0]) && can(d2, s[1])) ||
                (can(d1, s[1]) && can(d2, s[0]))
            )) {
                ok = false;
                break;
            }
        }
        cache.set(key, ok);
        return ok;
    }

    let ans = 0;

    if (M === 1) {
        const req = new Set(sq.map(s => s[0]));
        for (const d of dice) {
            let ok = true;
            for (const x of req) {
                if (!can(d, x)) {
                    ok = false;
                    break;
                }
            }
            if (ok) ans++;
        }
    }

    else if (M === 2) {
        const L = dice.length;
        for (let i = 0; i < L; i++) {
            for (let j = i; j < L; j++) {
                if (checkPair(i, j)) ans++;
            }
        }
    }

    else if (M === 3) {
        const L = dice.length;
        const perms = [
            [0, 1, 2], [0, 2, 1], [1, 0, 2], [1, 2, 0], [2, 0, 1], [2, 1, 0]
        ];

        for (let i = 0; i < L; i++) {
            for (let j = i; j < L; j++) {
                for (let k = j; k < L; k++) {
                    let ok = true;
                    for (const s of sq) {
                        let good = false;
                        for (const p of perms) {
                            const ds = [dice[i], dice[j], dice[k]];
                            if (can(ds[p[0]], s[0]) &&
                                can(ds[p[1]], s[1]) &&
                                can(ds[p[2]], s[2])) {
                                good = true;
                                break;
                            }
                        }
                        if (!good) {
                            ok = false;
                            break;
                        }
                    }
                    if (ok) ans++;
                }
            }
        }
    }

    console.log(ans.toString());
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