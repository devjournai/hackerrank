process.stdin.resume();
process.stdin.setEncoding('ascii');

let input_stdin = "";
let input_stdin_array = "";
let input_currentline = 0;

process.stdin.on('data', function (data) {
    input_stdin += data;
});

process.stdin.on('end', function () {
    input_stdin_array = input_stdin.trim().split("\n");
    main();
});

function readLine() {
    return input_stdin_array[input_currentline++];
}

function main() {
    const t = parseInt(readLine());

    for (let i = 0; i < t; i++) {
        const n = parseInt(readLine());
        console.log(maxPythagoreanProduct(n));
    }
}

/**
 * Special Pythagorean Triplet
 * Time Complexity: O(sqrt(N))
 * Space Complexity: O(1)
 */

function maxPythagoreanProduct(N) {
    let maxProduct = -1;

    for (let m = 2; m * m < N; m++) {
        for (let n = 1; n < m; n++) {
            if (((m - n) % 2 === 1) && gcd(m, n) === 1) {

                const sumPrimitive = 2 * m * (m + n);

                if (N % sumPrimitive === 0) {
                    const k = N / sumPrimitive;

                    const a = k * (m * m - n * n);
                    const b = k * (2 * m * n);
                    const c = k * (m * m + n * n);

                    const product = a * b * c;

                    if (product > maxProduct) {
                        maxProduct = product;
                    }
                }
            }
        }
    }

    return maxProduct;
};

function gcd(a, b) {
    while (b !== 0) {
        const t = b;
        b = a % b;
        a = t;
    }
    return a;
};