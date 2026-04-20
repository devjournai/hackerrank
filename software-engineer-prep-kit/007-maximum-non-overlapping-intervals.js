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
 * Complete the 'maximizeNonOverlappingMeetings' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts 2D_INTEGER_ARRAY meetings as parameter.
 */

function maximizeNonOverlappingMeetings(meetings) {
    if (meetings.length === 0) return 0;

    meetings.sort((a, b) => a[1] - b[1]);

    let count = 1;
    let lastEnd = meetings[0][1];

    for (let i = 1; i < meetings.length; i++) {
        if (meetings[i][0] >= lastEnd) {
            count++;
            lastEnd = meetings[i][1];
        }
    }

    return count;
}

function main() {
    const meetingsRows = parseInt(readLine().trim(), 10);

    const meetingsColumns = parseInt(readLine().trim(), 10);

    let meetings = Array(meetingsRows);

    for (let i = 0; i < meetingsRows; i++) {
        meetings[i] = readLine().replace(/\s+$/g, '').split(' ').map(meetingsTemp => parseInt(meetingsTemp, 10));
    }

    const result = maximizeNonOverlappingMeetings(meetings);

    process.stdout.write(result + '\n');
}
