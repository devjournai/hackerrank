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
 * Complete the 'findSmallestSubstringWindow' function below.
 *
 * The function is expected to return an INTEGER_ARRAY.
 * The function accepts following parameters:
 *  1. STRING_ARRAY patterns
 *  2. STRING S
 */

function findSmallestSubstringWindow(patterns, S) {
    if (!S || !patterns || patterns.length === 0) {
        return [-1, -1];
    }

    const uniquePatterns = [...new Set(patterns)];
    const requiredPatterns = uniquePatterns.length;

    const occurrences = [];

    uniquePatterns.forEach((pattern, patternId) => {
        const patternLen = pattern.length;

        for (let i = 0; i <= S.length - patternLen; i++) {
            if (S.substring(i, i + patternLen) === pattern) {
                occurrences.push({
                    start: i,
                    end: i + patternLen - 1,
                    patternId: patternId
                });
            }
        }
    });

    const patternsFound = new Set(occurrences.map(o => o.patternId));
    if (patternsFound.size < requiredPatterns) {
        return [-1, -1];
    }

    occurrences.sort((a, b) => a.start - b.start);

    let minStart = -1;
    let minEnd = -1;
    let minLength = Infinity;

    let left = 0;
    const patternCount = new Map();
    let covered = 0;

    for (let right = 0; right < occurrences.length; right++) {
        const patternId = occurrences[right].patternId;

        const currentCount = patternCount.get(patternId) || 0;
        patternCount.set(patternId, currentCount + 1);

        if (patternCount.get(patternId) === 1) {
            covered++;
        }

        while (covered === requiredPatterns && left <= right) {
            const startIdx = occurrences[left].start;
            const endIdx = occurrences[right].end;
            const windowLength = endIdx - startIdx + 1;

            if (windowLength < minLength) {
                minLength = windowLength;
                minStart = startIdx;
                minEnd = endIdx;
            }

            const leftPatternId = occurrences[left].patternId;
            patternCount.set(leftPatternId, patternCount.get(leftPatternId) - 1);

            if (patternCount.get(leftPatternId) === 0) {
                covered--;
            }

            left++;
        }
    }

    if (minStart === -1) {
        return [-1, -1];
    }

    return [minStart, minEnd];
}

function main() {
    const patternsCount = parseInt(readLine().trim(), 10);

    let patterns = [];

    for (let i = 0; i < patternsCount; i++) {
        const patternsItem = readLine();
        patterns.push(patternsItem);
    }

    const S = readLine();

    const result = findSmallestSubstringWindow(patterns, S);

    process.stdout.write(result.join('\n') + '\n');
}
