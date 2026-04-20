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
 * Complete the 'findPeakIndex' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts INTEGER_ARRAY counts as parameter.
 */

function findPeakIndex(counts) {
    let low = 0;
    let high = counts.length - 1;

    while (low < high) {
        let mid = Math.floor((low + high) / 2);

        if (counts[mid] < counts[mid + 1]) {
            low = mid + 1;
        } else {
            high = mid;
        }
    }

    return low;
}

function main() {
    const countsCount = parseInt(readLine().trim(), 10);

    let counts = [];

    for (let i = 0; i < countsCount; i++) {
        const countsItem = parseInt(readLine().trim(), 10);
        counts.push(countsItem);
    }

    const result = findPeakIndex(counts);

    process.stdout.write(result + '\n');
}
