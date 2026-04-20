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
 * Complete the 'computeGroupPeakConcurrency' function below.
 *
 * The function is expected to return a 2D_INTEGER_ARRAY.
 * The function accepts 2D_STRING_ARRAY events as parameter.
 */

function computeGroupPeakConcurrency(events) {
    if (!events || events.length === 0) return [];

    // Sort by timestamp, and if same timestamp, login before logout
    events.sort((a, b) => {
        const t1 = Number(a[0]);
        const t2 = Number(b[0]);
        if (t1 !== t2) return t1 - t2;

        if (a[3] === "login" && b[3] === "logout") return -1;
        if (a[3] === "logout" && b[3] === "login") return 1;
        return 0;
    });

    const current = {};
    const peak = {};

    for (const [timestamp, user, group, type] of events) {
        if (!(group in current)) current[group] = 0;
        if (!(group in peak)) peak[group] = 0;

        if (type === "login") {
            current[group]++;
            peak[group] = Math.max(peak[group], current[group]);
        } else {
            current[group]--;
        }
    }

    const result = [];
    for (const g in peak) {
        result.push([Number(g), peak[g]]);
    }
    return result;
}

function main() {
    const eventsRows = parseInt(readLine().trim(), 10);

    const eventsColumns = parseInt(readLine().trim(), 10);

    let events = Array(eventsRows);

    for (let i = 0; i < eventsRows; i++) {
        events[i] = readLine().replace(/\s+$/g, '').split(' ');
    }

    const result = computeGroupPeakConcurrency(events);

    process.stdout.write(result.map(x => x.join(' ')).join('\n') + '\n');
}
