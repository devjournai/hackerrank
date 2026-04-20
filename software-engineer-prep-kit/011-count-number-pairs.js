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
 * Complete the 'countAffordablePairs' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts following parameters:
 *  1. INTEGER_ARRAY prices
 *  2. INTEGER budget
 */

function countAffordablePairs(prices, budget) {
    let n = prices.length;
    if (n < 2) return 0;

    let left = 0;
    let right = n - 1;
    let count = 0;

    while (left < right) {
        if (prices[left] + prices[right] <= budget) {
            count += (right - left);
            left++;
        } else {
            right--;
        }
    }

    return count;
}

function main() {
    const pricesCount = parseInt(readLine().trim(), 10);

    let prices = [];

    for (let i = 0; i < pricesCount; i++) {
        const pricesItem = parseInt(readLine().trim(), 10);
        prices.push(pricesItem);
    }

    const budget = parseInt(readLine().trim(), 10);

    const result = countAffordablePairs(prices, budget);

    process.stdout.write(result + '\n');
}
