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
 * Complete the 'isAlphabeticPalindrome' function below.
 *
 * The function is expected to return a BOOLEAN.
 * The function accepts STRING code as parameter.
 */

function isAlphabeticPalindrome(code) {
    let filtered = [];
    for (let ch of code) {
        if (/[a-zA-Z]/.test(ch)) {
            filtered.push(ch.toLowerCase());
        }
    }

    let left = 0, right = filtered.length - 1;
    while (left < right) {
        if (filtered[left] !== filtered[right]) {
            return 0
        }
        left++;
        right--;
    }

    return 1;
}

function main() {
    const code = readLine();

    const result = isAlphabeticPalindrome(code);

    process.stdout.write((result ? 1 : 0) + '\n');
}
