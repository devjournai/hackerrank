/**
 * Diophantine Equation
 * Time Complexity: O(N * P)
 * Space Complexity: O(1)
 */

function processData(input) {
    const N = parseInt(input.trim(), 10);

    function isSquare(n) {
        const r = Math.floor(Math.sqrt(n));
        return r * r === n;
    }

    let bestD = 0;
    let bestX = 0n;

    for (let D = 2; D <= N; D++) {

        if (isSquare(D)) continue;

        let a0 = Math.floor(Math.sqrt(D));
        let m = 0;
        let d = 1;
        let a = a0;

        let num1 = 1n, num2 = BigInt(a);
        let den1 = 0n, den2 = 1n;

        if (a * a === D) continue;

        while (true) {
            m = d * a - m;
            d = Math.floor((D - m * m) / d);
            a = Math.floor((a0 + m) / d);

            const num = BigInt(a) * num2 + num1;
            const den = BigInt(a) * den2 + den1;

            if (num * num - BigInt(D) * den * den === 1n) {
                if (num > bestX) {
                    bestX = num;
                    bestD = D;
                }
                break;
            }

            num1 = num2; num2 = num;
            den1 = den2; den2 = den;
        }
    }

    console.log(bestD);
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