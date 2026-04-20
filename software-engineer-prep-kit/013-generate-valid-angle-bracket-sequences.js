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
 * The function is expected to return a STRING_ARRAY.
 * The function accepts INTEGER n as parameter.
 */

function generateAngleBracketSequences(n) {
    let result = [];

    function backtrack(curr, open, close) {
        if (curr.length === 2 * n) {
            result.push(curr);
            return;
        }

        if (open < n) {
            backtrack(curr + "<", open + 1, close);
        }

        if (close < open) {
            backtrack(curr + ">", open, close + 1);
        }
    }

    backtrack("", 0, 0);
    return result;
}

function main() {
    const n = parseInt(readLine().trim(), 10);

    const result = generateAngleBracketSequences(n);

    process.stdout.write(result.join('\n') + '\n');
}
