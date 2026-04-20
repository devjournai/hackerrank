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
 * Complete the 'isAnagram' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts following parameters:
 *  1. STRING s
 *  2. STRING t
 */

function isAnagram(s, t) {
    if (s.length !== t.length) return 0;

    const freq = new Array(26).fill(0);

    for (let char of s) {
        freq[char.charCodeAt(0) - 97]++;
    }

    for (let char of t) {
        const index = char.charCodeAt(0) - 97;
        freq[index]--;
        if (freq[index] < 0) return 0;
    }

    return 1;
}

function main() {
    const s = readLine();

    const t = readLine();

    const result = isAnagram(s, t);

    process.stdout.write(result + '\n');
}
