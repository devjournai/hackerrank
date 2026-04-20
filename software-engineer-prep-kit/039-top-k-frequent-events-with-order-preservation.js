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
 * Complete the 'getTopKFrequentEvents' function below.
 *
 * The function is expected to return an INTEGER_ARRAY.
 * The function accepts following parameters:
 *  1. INTEGER_ARRAY events
 *  2. INTEGER k
 */

function getTopKFrequentEvents(events, k) {
    if (events.length === 0 || k === 0) return [];

    const freq = new Map();
    const firstIndex = new Map();

    for (let i = 0; i < events.length; i++) {
        const val = events[i];
        freq.set(val, (freq.get(val) || 0) + 1);
        if (!firstIndex.has(val)) {
            firstIndex.set(val, i);
        }
    }

    const unique = [...freq.keys()];
    unique.sort((a, b) => {
        const freqDiff = freq.get(b) - freq.get(a);
        if (freqDiff !== 0) return freqDiff;
        return firstIndex.get(a) - firstIndex.get(b);
    });
    return unique.slice(0, k);
}

function main() {
    const eventsCount = parseInt(readLine().trim(), 10);

    let events = [];

    for (let i = 0; i < eventsCount; i++) {
        const eventsItem = parseInt(readLine().trim(), 10);
        events.push(eventsItem);
    }

    const k = parseInt(readLine().trim(), 10);

    const result = getTopKFrequentEvents(events, k);

    process.stdout.write(result.join('\n') + '\n');
}
