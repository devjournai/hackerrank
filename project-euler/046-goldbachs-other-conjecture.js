/**
 * Goldbach's other conjecture
 * Time Complexity: O(N log log N)
 * Space Complexity: O(N)
 */

function processData(input) {
    const data = input.trim().split(/\s+/).map(Number);
    let idx = 0;

    const T = data[idx++];
    const arr = data.slice(idx);

    const maxN = Math.max(...arr);

    const isPrime = new Array(maxN + 1).fill(true);
    isPrime[0] = isPrime[1] = false;

    for (let i = 2; i * i <= maxN; i++) {
        if (isPrime[i]) {
            for (let j = i * i; j <= maxN; j += i) {
                isPrime[j] = false;
            }
        }
    }

    const primes = [];
    for (let i = 2; i <= maxN; i++) {
        if (isPrime[i]) primes.push(i);
    }

    const results = [];

    for (let n of arr) {
        let count = 0;

        for (let p of primes) {
            if (p >= n) break;

            const rem = n - p;
            if (rem % 2 !== 0) continue;

            const k2 = rem / 2;
            const k = Math.floor(Math.sqrt(k2));

            if (k * k === k2) {
                count++;
            }
        }

        results.push(count);
    }

    console.log(results.join("\n"));
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