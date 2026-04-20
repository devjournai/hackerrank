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
 * Complete the 'hasCircularDependency' function below.
 *
 * The function is expected to return a BOOLEAN.
 * The function accepts following parameters:
 *  1. INTEGER n
 *  2. 2D_INTEGER_ARRAY dependencies
 */

function hasCircularDependency(n, dependencies) {
    const graph = Array.from({ length: n }, () => []);

    for (const [u, v] of dependencies) {
        if (u === v) return 1;
        graph[u].push(v);
    }

    const visited = new Array(n).fill(false);
    const inStack = new Array(n).fill(false);

    function dfs(node) {
        visited[node] = true;
        inStack[node] = true;

        for (const nei of graph[node]) {
            if (!visited[nei]) {
                if (dfs(nei)) return true;
            } else if (inStack[nei]) {
                return true;
            }
        }

        inStack[node] = false;
        return false;
    }

    for (let i = 0; i < n; i++) {
        if (!visited[i]) {
            if (dfs(i)) return 1;
        }
    }

    return 0;
}

function main() {
    const n = parseInt(readLine().trim(), 10);

    const dependenciesRows = parseInt(readLine().trim(), 10);

    const dependenciesColumns = parseInt(readLine().trim(), 10);

    let dependencies = Array(dependenciesRows);

    for (let i = 0; i < dependenciesRows; i++) {
        dependencies[i] = readLine().replace(/\s+$/g, '').split(' ').map(dependenciesTemp => parseInt(dependenciesTemp, 10));
    }

    const result = hasCircularDependency(n, dependencies);

    process.stdout.write((result ? 1 : 0) + '\n');
}
