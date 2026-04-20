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
 * Complete the 'processCouponStackOperations' function below.
 *
 * The function is expected to return an INTEGER_ARRAY.
 * The function accepts STRING_ARRAY operations as parameter.
 */

function processCouponStackOperations(operations) {
    const stack = [];
    const minStack = [];
    const output = [];

    for (let op of operations) {
        const parts = op.split(' ');

        if (parts[0] === "push") {
            const value = parseInt(parts[1], 10);
            stack.push(value);

            if (minStack.length === 0) {
                minStack.push(value);
            } else {
                minStack.push(Math.min(value, minStack[minStack.length - 1]));
            }

        } else if (parts[0] === "pop") {
            stack.pop();
            minStack.pop();

        } else if (parts[0] === "top") {
            output.push(stack[stack.length - 1]);

        } else if (parts[0] === "getMin") {
            output.push(minStack[minStack.length - 1]);
        }
    }

    return output;
}

function main() {
    const operationsCount = parseInt(readLine().trim(), 10);

    let operations = [];

    for (let i = 0; i < operationsCount; i++) {
        const operationsItem = readLine();
        operations.push(operationsItem);
    }

    const result = processCouponStackOperations(operations);

    process.stdout.write(result.join('\n') + '\n');
}
