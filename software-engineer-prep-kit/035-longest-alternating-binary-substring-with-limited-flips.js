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
 * Complete the 'longestAlternatingSubstring' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts following parameters:
 *  1. STRING s
 *  2. INTEGER k
 */

function longestAlternatingSubstring(s, k) {
    const n = s.length;
    if (n === 0) return 0;

    function maxForPattern(startChar) {
        let left = 0, mismatches = 0, maxLen = 0;

        for (let right = 0; right < n; right++) {
            const expected = ((right % 2 === 0) ? startChar : (startChar === '0' ? '1' : '0'));

            if (s[right] !== expected) mismatches++;

            while (mismatches > k) {
                const expectedLeft = ((left % 2 === 0) ? startChar : (startChar === '0' ? '1' : '0'));
                if (s[left] !== expectedLeft) mismatches--;
                left++;
            }

            maxLen = Math.max(maxLen, right - left + 1);
        }

        return maxLen;
    }

    return Math.max(maxForPattern('0'), maxForPattern('1'));
}

function main() {
    const s = readLine();

    const k = parseInt(readLine().trim(), 10);

    const result = longestAlternatingSubstring(s, k);

    process.stdout.write(result + '\n');
}
