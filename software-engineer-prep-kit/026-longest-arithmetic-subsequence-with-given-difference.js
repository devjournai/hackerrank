'use strict';

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', function(inputStdin) {
    inputString += inputStdin;
});

process.stdin.on('end', function() {
    inputString = inputString.split('\n');

    main();
});

function readLine() {
    return inputString[currentLine++];
}



/*
 * Complete the 'findLongestArithmeticProgression' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts following parameters:
 *  1. INTEGER_ARRAY arr
 *  2. INTEGER k
 */

function findLongestArithmeticProgression(arr, k) {
    if (arr.length === 0) return 0;

    const set = new Set(arr);
    let maxLen = 1;

    for (const num of set) {
        if (!set.has(num - k)) {
            let length = 1;
            let next = num + k;

            while (set.has(next)) {
                length++;
                next += k;
            }

            maxLen = Math.max(maxLen, length);
        }
    }

    return maxLen;
}

function main() {
    const arrCount = parseInt(readLine().trim(), 10);

    let arr = [];

    for (let i = 0; i < arrCount; i++) {
        const arrItem = parseInt(readLine().trim(), 10);
        arr.push(arrItem);
    }

    const k = parseInt(readLine().trim(), 10);

    const result = findLongestArithmeticProgression(arr, k);

    process.stdout.write(result + '\n');
}
