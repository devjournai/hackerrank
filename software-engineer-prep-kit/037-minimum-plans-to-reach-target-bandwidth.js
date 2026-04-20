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
 * Complete the 'findMinimumPlansForBandwidth' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts following parameters:
 *  1. INTEGER_ARRAY planSizes
 *  2. INTEGER targetBandwidth
 */

function findMinimumPlansForBandwidth(planSizes, targetBandwidth) {
    if (targetBandwidth === 0) return 0;

    const INF = Number.MAX_SAFE_INTEGER;
    const dp = new Array(targetBandwidth + 1).fill(INF);
    dp[0] = 0;

    for (let size of planSizes) {
        for (let bw = size; bw <= targetBandwidth; bw++) {
            dp[bw] = Math.min(dp[bw], dp[bw - size] + 1);
        }
    }

    return dp[targetBandwidth] === INF ? -1 : dp[targetBandwidth];
}

function main() {
    const planSizesCount = parseInt(readLine().trim(), 10);

    let planSizes = [];

    for (let i = 0; i < planSizesCount; i++) {
        const planSizesItem = parseInt(readLine().trim(), 10);
        planSizes.push(planSizesItem);
    }

    const targetBandwidth = parseInt(readLine().trim(), 10);

    const result = findMinimumPlansForBandwidth(planSizes, targetBandwidth);

    process.stdout.write(result + '\n');
}
