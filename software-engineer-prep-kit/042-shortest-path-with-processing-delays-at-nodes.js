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
 * Complete the 'computeShortestDeliveryTimes' function below.
 *
 * The function is expected to return an INTEGER_ARRAY.
 * The function accepts following parameters:
 *  1. INTEGER n
 *  2. INTEGER_ARRAY handlingTimes
 *  3. INTEGER m
 *  4. 2D_INTEGER_ARRAY routes
 *  5. INTEGER source
 */

function computeShortestDeliveryTimes(n, handlingTimes, m, routes, source) {
    const adj = Array.from({ length: n }, () => []);
    for (let [u, v, w] of routes) {
        adj[u].push([v, w]);
    }

    const dist = Array(n).fill(Infinity);
    dist[source] = 0;

    const pq = [[0, source]];

    while (pq.length > 0) {
        pq.sort((a, b) => a[0] - b[0]);
        const [currDist, u] = pq.shift();

        if (currDist > dist[u]) continue;

        for (const [v, w] of adj[u]) {
            const extra = (u !== source ? handlingTimes[u] : 0);
            const newDist = currDist + w + extra;

            if (newDist < dist[v]) {
                dist[v] = newDist;
                pq.push([newDist, v]);
            }
        }
    }

    return dist.map(x => (x === Infinity ? -1 : x));
}

function main() {
    const n = parseInt(readLine().trim(), 10);

    const handlingTimesCount = parseInt(readLine().trim(), 10);

    let handlingTimes = [];

    for (let i = 0; i < handlingTimesCount; i++) {
        const handlingTimesItem = parseInt(readLine().trim(), 10);
        handlingTimes.push(handlingTimesItem);
    }

    const m = parseInt(readLine().trim(), 10);

    const routesRows = parseInt(readLine().trim(), 10);

    const routesColumns = parseInt(readLine().trim(), 10);

    let routes = Array(routesRows);

    for (let i = 0; i < routesRows; i++) {
        routes[i] = readLine().replace(/\s+$/g, '').split(' ').map(routesTemp => parseInt(routesTemp, 10));
    }

    const source = parseInt(readLine().trim(), 10);

    const result = computeShortestDeliveryTimes(n, handlingTimes, m, routes, source);

    process.stdout.write(result.join('\n') + '\n');
}
