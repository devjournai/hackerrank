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
 * Complete the 'minTasksToCancelForNoConflict' function below.
 *
 * The function is expected to return a STRING_ARRAY.
 * The function accepts STRING digits as parameter.
 */

function minTasksToCancelForNoConflict(digits) {
    if (!digits || digits.length === 0) return [];

    const map = {
        '0': '0',
        '1': '1',
        '2': 'abc',
        '3': 'def',
        '4': 'ghi',
        '5': 'jkl',
        '6': 'mno',
        '7': 'pqrs',
        '8': 'tuv',
        '9': 'wxyz'
    };

    const result = [];

    function backtrack(index, current) {
        if (index === digits.length) {
            result.push(current);
            return;
        }

        for (let ch of map[digits[index]]) {
            backtrack(index + 1, current + ch);
        }
    }

    backtrack(0, "");
    return result;
}

function main() {
    const digits = readLine();

    const result = minTasksToCancelForNoConflict(digits);

    process.stdout.write(result.join('\n') + '\n');
}
