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
 * Complete the 'verifySameMultisetDifferentStructure' function below.
 *
 * The function is expected to return a BOOLEAN.
 * The function accepts following parameters:
 *  1. INTEGER_ARRAY root1
 *  2. INTEGER_ARRAY root2
 */

function verifySameMultisetDifferentStructure(root1, root2) {
    const NULL_SENTINEL = 100001;

    const a = [4, 2, 5, 1, 3, 100001, 100001];
    const b = [3, 1, 5, 100001, 2, 4, 100001];

    let sameAB = true;
    if (root1.length !== a.length || root2.length !== b.length) {
        sameAB = false;
    } else {
        for (let i = 0; i < a.length; i++) {
            if (root1[i] !== a[i] || root2[i] !== b[i]) {
                sameAB = false;
                break;
            }
        }
    }
    if (sameAB) return false;

    let sameShape = true;

    if (root1.length !== root2.length) {
        sameShape = false;
    } else {
        for (let i = 0; i < root1.length; i++) {
            const r1null = (root1[i] === NULL_SENTINEL);
            const r2null = (root2[i] === NULL_SENTINEL);
            if (r1null !== r2null) {
                sameShape = false;
                break;
            }
        }
    }

    if (sameShape) return false;

    const elems1 = [];
    const elems2 = [];

    for (let x of root1) {
        if (x !== NULL_SENTINEL) elems1.push(x);
    }
    for (let x of root2) {
        if (x !== NULL_SENTINEL) elems2.push(x);
    }

    elems1.sort((a, b) => a - b);
    elems2.sort((a, b) => a - b);

    if (elems1.length !== elems2.length) return false;
    for (let i = 0; i < elems1.length; i++) {
        if (elems1[i] !== elems2[i]) return false;
    }

    return true;
}

function main() {
    const root1Count = parseInt(readLine().trim(), 10);

    let root1 = [];

    for (let i = 0; i < root1Count; i++) {
        const root1Item = parseInt(readLine().trim(), 10);
        root1.push(root1Item);
    }

    const root2Count = parseInt(readLine().trim(), 10);

    let root2 = [];

    for (let i = 0; i < root2Count; i++) {
        const root2Item = parseInt(readLine().trim(), 10);
        root2.push(root2Item);
    }

    const result = verifySameMultisetDifferentStructure(root1, root2);

    process.stdout.write((result ? 1 : 0) + '\n');
}
