/**
 * Odd Period Square Roots
 * Time Complexity: O(N * sqrt(N))
 * Space Complexity: O(1)
 */

function processData(input) {
    const N = parseInt(input.trim(), 10);

    function isSquare(x) {
        const r = Math.floor(Math.sqrt(x));
        return r * r === x;
    }

    let oddCount = 0;

    for (let n = 2; n <= N; n++) {

        if (isSquare(n)) continue;
        let a0 = Math.floor(Math.sqrt(n));
        let m = 0;
        let d = 1;
        let a = a0;

        let period = 0;

        do {
            m = d * a - m;
            d = Math.floor((n - m * m) / d);
            a = Math.floor((a0 + m) / d);
            period++;
        } while (a !== 2 * a0);

        if (period % 2 === 1) oddCount++;
    }

    console.log(oddCount);
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