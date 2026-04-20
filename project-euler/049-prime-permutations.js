/**
 * Prime Permutations
 * Time Complexity: O(N log log N)
 * Space Complexity: O(N)
 */

function processData(input) {
    const [N, K] = input.trim().split(/\s+/).map(Number);

    const LIMIT = 1000000;

    const isPrime = new Array(LIMIT + 1).fill(true);
    isPrime[0] = isPrime[1] = false;

    for (let p = 2; p * p <= LIMIT; p++) {
        if (isPrime[p]) {
            for (let m = p * p; m <= LIMIT; m += p) {
                isPrime[m] = false;
            }
        }
    }

    const primes = [];
    for (let i = 1000; i <= LIMIT; i++) {
        if (isPrime[i]) primes.push(i);
    }

    const groups = new Map();

    for (let p of primes) {
        const sig = p.toString().split("").sort().join("");
        if (!groups.has(sig)) groups.set(sig, []);
        groups.get(sig).push(p);
    }

    const answers = [];

    for (let arr of groups.values()) {
        if (arr.length < K) continue;

        arr.sort((a, b) => a - b);

        const set = new Set(arr);

        for (let i = 0; i < arr.length; i++) {
            for (let j = i + 1; j < arr.length; j++) {
                const a = arr[i];
                const b = arr[j];
                const d = b - a;

                const seq = [a, b];
                let next = b + d;

                while (set.has(next)) {
                    seq.push(next);
                    next += d;
                    if (seq.length === K) break;
                }

                if (seq.length === K) {
                    if (seq[0] < N) {
                        answers.push(seq.join(""));
                    }
                }
            }
        }
    }

    answers.sort((a, b) => BigInt(a) < BigInt(b) ? -1 : 1);

    console.log(answers.join("\n"));
}

process.stdin.resume();
process.stdin.setEncoding("ascii");
let _input = "";
process.stdin.on("data", function (input) {
    _input += input;
});
process.stdin.on("end", function () {
    processData(_input);
});