/**
 * Prime Digit Replacements
 * Time Complexity: 
 * Space Complexity: 
 */

function sieve(limit) {
    const isPrime = new Uint8Array(limit + 1);
    isPrime.fill(1);
    isPrime[0] = isPrime[1] = 0;

    for (let p = 2; p * p <= limit; p++) {
        if (isPrime[p]) {
            for (let j = p * p; j <= limit; j += p) {
                isPrime[j] = 0;
            }
        }
    }
    return isPrime;
};

function combinations(pos, k, start = 0, curr = [], res = []) {
    if (curr.length === k) {
        res.push(curr.slice());
        return res;
    }
    for (let i = start; i < pos.length; i++) {
        curr.push(pos[i]);
        combinations(pos, k, i + 1, curr, res);
        curr.pop();
    }
    return res;
};

function lexLess(a, b) {
    const n = Math.min(a.length, b.length);
    for (let i = 0; i < n; i++) {
        if (a[i] !== b[i]) return a[i] < b[i];
    }
    return a.length < b.length;
};

function processData(input) {
    const [N, K, L] = input.trim().split(/\s+/).map(Number);

    const low = 10 ** (N - 1);
    const high = 10 ** N - 1;

    const isPrime = sieve(high);

    const pos = Array.from({ length: N }, (_, i) => i);

    const masks = combinations(pos, K);

    let best = null;

    for (const mask of masks) {
        const maskSet = new Set(mask);
        const fixedPos = pos.filter(p => !maskSet.has(p));

        const totalFixed = fixedPos.length;

        const maxVal = 10 ** totalFixed;

        for (let idx = 0; idx < maxVal; idx++) {
            const digits = new Array(N).fill(0);

            let v = idx;

            for (let fp = totalFixed - 1; fp >= 0; fp--) {
                const d = v % 10;
                v = Math.trunc(v / 10);
                digits[fixedPos[fp]] = d;
            }

            if (digits[0] === 0 && maskSet.has(0) === false) continue;

            const family = [];
            for (let rep = 0; rep <= 9; rep++) {

                if (maskSet.has(0) && rep === 0) continue;

                let num = 0;

                for (let i = 0; i < N; i++) {
                    const d = maskSet.has(i) ? rep : digits[i];
                    num = num * 10 + d;
                }

                if (num >= low && isPrime[num]) {
                    family.push(num);
                }
            }

            if (family.length >= L) {
                family.sort((a, b) => a - b);
                const cand = family.slice(0, L);

                if (!best || lexLess(cand, best)) {
                    best = cand;
                }
            }
        }
    }

    console.log(best.join(" "));
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