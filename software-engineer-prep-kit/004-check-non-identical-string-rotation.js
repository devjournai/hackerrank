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
 * Complete the 'isNonTrivialRotation' function below.
 *
 * The function is expected to return a BOOLEAN.
 * The function accepts following parameters:
 *  1. STRING s1
 *  2. STRING s2
 */

function isNonTrivialRotation(s1, s2) {
    if (s1.length !== s2.length) return 0;
    if (s1 === s2) return 0;

    let doubled = s1 + s1;
    return doubled.includes(s2) ? 1 : 0;
}

function main() {
    const s1 = readLine();

    const s2 = readLine();

    const result = isNonTrivialRotation(s1, s2);

    process.stdout.write((result ? 1 : 0) + '\n');
}
