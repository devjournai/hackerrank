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
 * Complete the 'canPlaceSecurityCameras' function below.
 *
 * The function is expected to return a BOOLEAN.
 * The function accepts following parameters:
 *  1. INTEGER N
 *  2. 2D_INTEGER_ARRAY grid
 */

function canPlaceSecurityCameras(N, grid) {
    const columns = new Set();
    const diag1 = new Set();
    const diag2 = new Set();

    function backtrack(row) {
        if (row === N) return true;

        for (let col = 0; col < N; col++) {
            if (grid[row][col] === 1) continue;
            if (columns.has(col)) continue;
            if (diag1.has(row - col)) continue;
            if (diag2.has(row + col)) continue;

            columns.add(col);
            diag1.add(row - col);
            diag2.add(row + col);

            if (backtrack(row + 1)) return true;

            columns.delete(col);
            diag1.delete(row - col);
            diag2.delete(row + col);
        }

        return false;
    }

    return backtrack(0);
}

function main() {
    const N = parseInt(readLine().trim(), 10);

    const gridRows = parseInt(readLine().trim(), 10);

    const gridColumns = parseInt(readLine().trim(), 10);

    let grid = Array(gridRows);

    for (let i = 0; i < gridRows; i++) {
        grid[i] = readLine().replace(/\s+$/g, '').split(' ').map(gridTemp => parseInt(gridTemp, 10));
    }

    const result = canPlaceSecurityCameras(N, grid);

    process.stdout.write((result ? 1 : 0) + '\n');
}
