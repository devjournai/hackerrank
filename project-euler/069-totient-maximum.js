/**
 * Totient Maximum
 * Time Complexity: O(T * P)
 * Space Complexity: O(1)
 */

function processData(input) {
    const lines = input.trim().split(/\s+/).map(BigInt);
    const T = Number(lines[0]);
    const Ns = lines.slice(1);

    const primes = [
        2n, 3n, 5n, 7n, 11n,
        13n, 17n, 19n, 23n, 29n,
        31n, 37n, 41n, 43n, 47n, 53n
    ];

    let out = [];

    for (let t = 0; t < T; t++) {
        const N = Ns[t];

        let prod = 1n;

        for (let p of primes) {
            if (prod * p >= N) break;
            prod *= p;
        }

        out.push(prod.toString());
    }

    console.log(out.join("\n"));
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