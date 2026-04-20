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
 * Complete the 'maximizeNonOverlappingMeetings' function below.
 *
 * The function is expected to return a LONG_INTEGER.
 * The function accepts following parameters:
 *  1. INTEGER n
 *  2. INTEGER m
 *  3. INTEGER_ARRAY deadlines
 *  4. INTEGER_ARRAY profits
 */

class MinHeap {
    constructor() { this.h = []; }
    push(x) {
        this.h.push(x);
        let i = this.h.length - 1;
        while (i > 0) {
            let p = (i - 1) >> 1;
            if (this.h[p] <= this.h[i]) break;
            [this.h[p], this.h[i]] = [this.h[i], this.h[p]];
            i = p;
        }
    }
    pop() {
        const h = this.h;
        if (h.length === 1) return h.pop();
        const res = h[0];
        h[0] = h.pop();
        let i = 0;
        while (true) {
            let l = i * 2 + 1, r = l + 1, s = i;
            if (l < h.length && h[l] < h[s]) s = l;
            if (r < h.length && h[r] < h[s]) s = r;
            if (s === i) break;
            [h[s], h[i]] = [h[i], h[s]];
            i = s;
        }
        return res;
    }
    size() { return this.h.length; }
}

function maximizeParallelTaskProfit(n, m, deadlines, profits) {
    if (n === 0) return 0;

    const tasks = [];
    for (let i = 0; i < n; i++) {
        tasks.push([deadlines[i], profits[i]]);
    }

    tasks.sort((a, b) => a[0] - b[0]);

    const heap = new MinHeap();
    let total = 0;

    for (const [d, p] of tasks) {
        heap.push(p);
        const limit = d * m;

        if (heap.size() > limit) {
            heap.pop();
        }
    }

    return heap.h.reduce((a, b) => a + b, 0);
}

function main() {
    const n = parseInt(readLine().trim(), 10);

    const m = parseInt(readLine().trim(), 10);

    const deadlinesCount = parseInt(readLine().trim(), 10);

    let deadlines = [];

    for (let i = 0; i < deadlinesCount; i++) {
        const deadlinesItem = parseInt(readLine().trim(), 10);
        deadlines.push(deadlinesItem);
    }

    const profitsCount = parseInt(readLine().trim(), 10);

    let profits = [];

    for (let i = 0; i < profitsCount; i++) {
        const profitsItem = parseInt(readLine().trim(), 10);
        profits.push(profitsItem);
    }

    const result = maximizeParallelTaskProfit(n, m, deadlines, profits);

    process.stdout.write(result + '\n');
}
