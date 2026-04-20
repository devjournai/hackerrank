/**
 * Pandigital Products
 * Time Complexity: O(N! * N)
 * Space Complexity: O(N!)
 */

function processData(input) {
    const N = parseInt(input.trim(), 10);

    const digits = [];
    for (let i = 1; i <= N; i++) digits.push(i);

    function* permute(arr, l = 0) {
        if (l === arr.length - 1) {
            yield arr.slice();
            return;
        }
        for (let i = l; i < arr.length; i++) {
            [arr[l], arr[i]] = [arr[i], arr[l]];
            yield* permute(arr, l + 1);
            [arr[l], arr[i]] = [arr[i], arr[l]];
        }
    }

    const products = new Set();

    function toNum(arr, l, r) {
        let v = 0;
        for (let i = l; i < r; i++) v = v * 10 + arr[i];
        return v;
    }

    for (const p of permute(digits)) {
        for (let i = 1; i < N; i++) {
            for (let j = i + 1; j < N; j++) {
                const a = toNum(p, 0, i);
                const b = toNum(p, i, j);
                const c = toNum(p, j, N);

                if (a * b === c) {
                    products.add(c);
                }
            }
        }
    }

    let sum = 0;
    for (const v of products) sum += v;

    console.log(sum);
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