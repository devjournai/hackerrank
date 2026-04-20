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
 * Complete the 'getBinarySearchTreeHeight' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts following parameters:
 *  1. INTEGER_ARRAY values
 *  2. INTEGER_ARRAY leftChild
 *  3. INTEGER_ARRAY rightChild
 */

function getBinarySearchTreeHeight(values, leftChild, rightChild) {
    const n = values.length;
    if (n === 0) return 0;

    function dfs(node) {
        if (node === -1) return 0;

        const leftHeight = dfs(leftChild[node]);
        const rightHeight = dfs(rightChild[node]);

        return 1 + Math.max(leftHeight, rightHeight);
    }

    return dfs(0);
}

function main() {
    const valuesCount = parseInt(readLine().trim(), 10);

    let values = [];

    for (let i = 0; i < valuesCount; i++) {
        const valuesItem = parseInt(readLine().trim(), 10);
        values.push(valuesItem);
    }

    const leftChildCount = parseInt(readLine().trim(), 10);

    let leftChild = [];

    for (let i = 0; i < leftChildCount; i++) {
        const leftChildItem = parseInt(readLine().trim(), 10);
        leftChild.push(leftChildItem);
    }

    const rightChildCount = parseInt(readLine().trim(), 10);

    let rightChild = [];

    for (let i = 0; i < rightChildCount; i++) {
        const rightChildItem = parseInt(readLine().trim(), 10);
        rightChild.push(rightChildItem);
    }

    const result = getBinarySearchTreeHeight(values, leftChild, rightChild);

    process.stdout.write(result + '\n');
}
