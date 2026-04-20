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
 * Complete the 'countInstallationSequences' function below.
 *
 * The function is expected to return a STRING.
 * The function accepts INTEGER n as parameter.
 */

function countInstallationSequences(n) {
    if (n === 0) return "1";
    if (n === 1) return "1";

    let prev2 = 1n;
    let prev1 = 1n;
    let curr = 0n;

    for (let i = 2; i <= n; i++) {
        curr = prev1 + prev2;
        prev2 = prev1;
        prev1 = curr;
    }

    return curr.toString();
}

function main() {
    const n = parseInt(readLine().trim(), 10);

    const result = countInstallationSequences(n);

    process.stdout.write(result + '\n');
}
