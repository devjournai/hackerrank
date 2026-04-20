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
 * Complete the 'processRequestQueueOperations' function below.
 *
 * The function is expected to return an INTEGER_ARRAY.
 * The function accepts following parameters:
 *  1. STRING_ARRAY operations
 *  2. INTEGER_ARRAY values
 */

function processRequestQueueOperations(operations, values) {
    const inStack = [];
    const outStack = [];
    const result = [];

    function shiftStacks() {
        if (outStack.length === 0) {
            while (inStack.length > 0) {
                outStack.push(inStack.pop());
            }
        }
    }

    for (let i = 0; i < values.length; i++) {
        const op = operations[i];

        if (op === "enqueue") {
            inStack.push(values[i]);
        }
        else if (op === "dequeue") {
            shiftStacks();
            result.push(outStack.pop());
        }
        else if (op === "peek") {
            shiftStacks();
            result.push(outStack[outStack.length - 1]);
        }
        else if (op === "size") {
            result.push(inStack.length + outStack.length);
        }
    }

    return result;
}

function main() {
    const operationsCount = parseInt(readLine().trim(), 10);

    let operations = [];

    for (let i = 0; i < operationsCount; i++) {
        const operationsItem = readLine();
        operations.push(operationsItem);
    }

    const valuesCount = parseInt(readLine().trim(), 10);

    let values = [];

    for (let i = 0; i < valuesCount; i++) {
        const valuesItem = parseInt(readLine().trim(), 10);
        values.push(valuesItem);
    }

    const result = processRequestQueueOperations(operations, values);

    process.stdout.write(result.join('\n') + '\n');
}
