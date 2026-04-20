/**
 * Champernownes Constant
 * Time Complexity: O(T log N)
 * Space Complexity: O(1)
 */

function processData(input) {
    const data = input.trim().split(/\s+/);
    let idx = 0;

    const T = Number(data[idx++]);
    let outputs = [];

    for (let t = 0; t < T; t++) {
        let product = 1;

        for (let k = 0; k < 7; k++) {
            let n = BigInt(data[idx++]);
            const digit = getNthDigit(n);
            product *= digit;
        }

        outputs.push(product);
    }

    console.log(outputs.join("\n"));
};

function getNthDigit(n) {
    let d = 1n;
    let count, digitsInBlock;

    while (true) {
        const start = 10n ** (d - 1n);
        count = 9n * start;
        digitsInBlock = count * d;

        if (n > digitsInBlock) {
            n -= digitsInBlock;
            d++;
        } else {
            break;
        }
    }

    const start = 10n ** (d - 1n);

    n--;
    const numberIndex = n / d;
    const digitIndex = n % d;

    const actualNumber = start + numberIndex;
    const s = actualNumber.toString();
    return Number(s[Number(digitIndex)]);
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