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
 * Complete the 'debounceTimestamps' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts following parameters:
 *  1. INTEGER_ARRAY timestamps
 *  2. INTEGER K
 */

function debounceTimestamps(timestamps, K) {
    const n = timestamps.length;
    if (n === 0) return 0;

    let write = 1;

    for (let read = 1; read < n; read++) {
        if (timestamps[read] - timestamps[write - 1] >= K) {
            timestamps[write] = timestamps[read];
            write++;
        }
    }

    return write;
}

function main() {
    const timestampsCount = parseInt(readLine().trim(), 10);

    let timestamps = [];

    for (let i = 0; i < timestampsCount; i++) {
        const timestampsItem = parseInt(readLine().trim(), 10);
        timestamps.push(timestampsItem);
    }

    const K = parseInt(readLine().trim(), 10);

    const result = debounceTimestamps(timestamps, K);

    process.stdout.write(result + '\n');
}
