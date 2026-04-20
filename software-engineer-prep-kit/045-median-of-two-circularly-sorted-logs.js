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
 * Complete the 'findMedianInRotatedSortedArrays' function below.
 *
 * The function is expected to return a LONG_INTEGER.
 * The function accepts following parameters:
 *  1. LONG_INTEGER_ARRAY A
 *  2. LONG_INTEGER_ARRAY B
 */

function findMedianInRotatedSortedArrays(A, B) {
    const aCount = A.length;
    const bCount = B.length;
    const totalCount = aCount + bCount;
    const halfCount = Math.floor((totalCount + 1) / 2);

    const aPivot = findPivot(A);
    const bPivot = findPivot(B);

    let low = 0;
    let high = aCount;

    while (low <= high) {
        const aCut = Math.floor((low + high) / 2);
        const bCut = halfCount - aCut;
        
        if (bCut < 0) {
            high = aCut - 1;
            continue;
        }
        if (bCut > bCount) {
            low = aCut + 1;
            continue;
        }

        const aLeft = (aCut === 0) ? -Infinity : getValueAt(A, aCut - 1, aPivot);
        const aRight = (aCut === aCount) ? Infinity : getValueAt(A, aCut, aPivot);
        
        const bLeft = (bCut === 0) ? -Infinity : getValueAt(B, bCut - 1, bPivot);
        const bRight = (bCut === bCount) ? Infinity : getValueAt(B, bCut, bPivot);

        if (aLeft <= bRight && bLeft <= aRight) {
            return Math.max(aLeft, bLeft);
        } else if (aLeft > bRight) {
            high = aCut - 1;
        } else {
            low = aCut + 1;
        }
    }

    throw new Error("Input arrays are not valid rotated sorted arrays.");
}

function findPivot(arr) {
    let left = 0;
    let right = arr.length - 1;

    while (left < right) {
        const mid = Math.floor((left + right) / 2);

        if (arr[mid] > arr[right]) {
            left = mid + 1;
        } else {
            right = mid;
        }
    }

    return left;
}

function getValueAt(arr, index, pivot) {
    const n = arr.length;
    return arr[(pivot + index) % n];
}

function main() {
    const ACount = parseInt(readLine().trim(), 10);

    let A = [];

    for (let i = 0; i < ACount; i++) {
        const AItem = parseInt(readLine().trim(), 10);
        A.push(AItem);
    }

    const BCount = parseInt(readLine().trim(), 10);

    let B = [];

    for (let i = 0; i < BCount; i++) {
        const BItem = parseInt(readLine().trim(), 10);
        B.push(BItem);
    }

    const result = findMedianInRotatedSortedArrays(A, B);

    process.stdout.write(result + '\n');
}
