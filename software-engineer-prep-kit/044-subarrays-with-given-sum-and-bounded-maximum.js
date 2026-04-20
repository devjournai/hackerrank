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
 * Complete the 'countSubarraysWithSumAndMaxAtMost' function below.
 *
 * The function is expected to return a LONG_INTEGER.
 * The function accepts following parameters:
 *  1. INTEGER_ARRAY nums
 *  2. LONG_INTEGER k
 *  3. LONG_INTEGER M
 */

function countSubarraysWithSumAndMaxAtMost(nums, k, M) {
    let count = 0;
    let prefixSum = 0;
    let map = new Map();
    map.set(0, 1);

    for (const num of nums) {
        if (num > M) {
            prefixSum = 0;
            map.clear();
            map.set(0, 1);
            continue;
        }

        prefixSum += num;
        if (map.has(prefixSum - k)) {
            count += map.get(prefixSum - k);
        }
        map.set(prefixSum, (map.get(prefixSum) || 0) + 1);
    }

    return count;
}

function main() {
    const numsCount = parseInt(readLine().trim(), 10);

    let nums = [];

    for (let i = 0; i < numsCount; i++) {
        const numsItem = parseInt(readLine().trim(), 10);
        nums.push(numsItem);
    }

    const k = parseInt(readLine().trim(), 10);

    const M = parseInt(readLine().trim(), 10);

    const result = countSubarraysWithSumAndMaxAtMost(nums, k, M);

    process.stdout.write(result + '\n');
}
