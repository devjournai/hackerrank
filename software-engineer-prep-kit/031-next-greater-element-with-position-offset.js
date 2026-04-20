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
 * Complete the 'findNextGreaterElementsWithDistance' function below.
 *
 * The function is expected to return a 2D_INTEGER_ARRAY.
 * The function accepts INTEGER_ARRAY readings as parameter.
 */

function findNextGreaterElementsWithDistance(readings) {
    const n = readings.length;
    const result = Array.from({ length: n }, () => [-1, -1]);
    const stack = [];

    for (let i = n - 1; i >= 0; i--) {
        while (
            stack.length > 0 &&
            readings[stack[stack.length - 1]] <= readings[i]
        ) {
            stack.pop();
        }

        if (stack.length > 0) {
            const j = stack[stack.length - 1];
            result[i][0] = readings[j];
            result[i][1] = j - i;
        } else {
            result[i][0] = -1;
            result[i][1] = -1;
        }
        stack.push(i);
    }
    return result;
}

function main() {
    const readingsCount = parseInt(readLine().trim(), 10);

    let readings = [];

    for (let i = 0; i < readingsCount; i++) {
        const readingsItem = parseInt(readLine().trim(), 10);
        readings.push(readingsItem);
    }

    const result = findNextGreaterElementsWithDistance(readings);

    process.stdout.write(result.map(x => x.join(' ')).join('\n') + '\n');
}
