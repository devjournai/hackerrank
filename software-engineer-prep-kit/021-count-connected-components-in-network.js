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
 * Complete the 'countIsolatedCommunicationGroups' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts following parameters:
 *  1. 2D_INTEGER_ARRAY links
 *  2. INTEGER n
 */

function countIsolatedCommunicationGroups(links, n) {
    const graph = Array.from({ length: n }, () => []);

    for (const [a, b] of links) {
        graph[a].push(b);
        graph[b].push(a);
    }

    const visited = new Array(n).fill(false);

    function dfs(node) {
        const stack = [node];
        visited[node] = true;
        while (stack.length > 0) {
            const curr = stack.pop();
            for (const neighbor of graph[curr]) {
                if (!visited[neighbor]) {
                    visited[neighbor] = true;
                    stack.push(neighbor);
                }
            }
        }
    }

    let components = 0;

    for (let i = 0; i < n; i++) {
        if (!visited[i]) {
            dfs(i);
            components++;
        }
    }

    return components;
}

function main() {
    const linksRows = parseInt(readLine().trim(), 10);

    const linksColumns = parseInt(readLine().trim(), 10);

    let links = Array(linksRows);

    for (let i = 0; i < linksRows; i++) {
        links[i] = readLine().replace(/\s+$/g, '').split(' ').map(linksTemp => parseInt(linksTemp, 10));
    }

    const n = parseInt(readLine().trim(), 10);

    const result = countIsolatedCommunicationGroups(links, n);

    process.stdout.write(result + '\n');
}
