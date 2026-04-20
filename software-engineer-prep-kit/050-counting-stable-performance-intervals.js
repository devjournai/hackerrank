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
 * Complete the 'countValidSubarrays' function below.
 *
 * The function is expected to return a LONG_INTEGER.
 * The function accepts following parameters:
 *  1. INTEGER n
 *  2. INTEGER_ARRAY a
 *  3. INTEGER k
 */

function countValidSubarrays(n, a, k) {
    if (n === 0) return 0;

    let maxDeque = [];
    let minDeque = [];
    let l = 0;
    let ans = 0;

    for (let r = 0; r < n; r++) {
        while (maxDeque.length && a[maxDeque[maxDeque.length - 1]] < a[r]) {
            maxDeque.pop();
        }
        maxDeque.push(r);

        while (minDeque.length && a[minDeque[minDeque.length - 1]] > a[r]) {
            minDeque.pop();
        }
        minDeque.push(r);

        while (a[maxDeque[0]] - a[minDeque[0]] > k) {
            if (maxDeque[0] === l) maxDeque.shift();
            if (minDeque[0] === l) minDeque.shift();
            l++;
        }

        ans += (r - l + 1);
    }

    return ans;
}

function main() {
    const n = parseInt(readLine().trim(), 10);

    const aCount = parseInt(readLine().trim(), 10);

    let a = [];

    for (let i = 0; i < aCount; i++) {
        const aItem = parseInt(readLine().trim(), 10);
        a.push(aItem);
    }

    const k = parseInt(readLine().trim(), 10);

    const result = countValidSubarrays(n, a, k);

    process.stdout.write(result + '\n');
}
