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
        const parts = readLine().trim().split(" ");
        const n = parseInt(parts[0]);
        const k = parseInt(parts[1]);
        const num = readLine().trim();

        console.log(largestProduct(num, k));
    }
}

/**
 * Largest product in a series
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */

function largestProduct(numStr, k) {
    let maxProd = 0;
    let currentProd = 1;
    let zeroCount = 0;
    const digits = numStr.split('').map(ch => Number(ch));

    let left = 0;

    for (let right = 0; right < digits.length; right++) {
        const d = digits[right];

        if (d === 0) {
            zeroCount++;
        } else {
            currentProd *= d;
        }

        if (right - left + 1 > k) {
            const leftDigit = digits[left];

            if (leftDigit === 0) {
                zeroCount--;
            } else {
                currentProd /= leftDigit;
            }

            left++;
        }

        if (right - left + 1 === k) {
            if (zeroCount === 0) {
                maxProd = Math.max(maxProd, currentProd);
            }
        }
    }

    return maxProd;
};