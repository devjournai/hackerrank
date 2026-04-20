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
 * Complete the 'completeDiagonalSudokuGrid' function below.
 *
 * The function is expected to return a 2D_INTEGER_ARRAY.
 * The function accepts 2D_INTEGER_ARRAY grid as parameter.
 */

function completeDiagonalSudokuGrid(grid) {
    function isValid(r, c, num) {
        for (let i = 0; i < 9; i++) {
            if (grid[r][i] === num) return false;
            if (grid[i][c] === num) return false;
        }

        const br = Math.floor(r / 3) * 3;
        const bc = Math.floor(c / 3) * 3;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (grid[br + i][bc + j] === num) return false;
            }
        }

        if (r === c) {
            for (let i = 0; i < 9; i++) {
                if (grid[i][i] === num) return false;
            }
        }

        if (r + c === 8) {
            for (let i = 0; i < 9; i++) {
                if (grid[i][8 - i] === num) return false;
            }
        }

        return true;
    }

    function backtrack() {
        for (let r = 0; r < 9; r++) {
            for (let c = 0; c < 9; c++) {
                if (grid[r][c] === 0) {
                    for (let num = 1; num <= 9; num++) {
                        if (isValid(r, c, num)) {
                            grid[r][c] = num;
                            if (backtrack()) return true;
                            grid[r][c] = 0;
                        }
                    }
                    return false;
                }
            }
        }
        return true;
    }

    backtrack();
    return grid;
}

function main() {
    const gridRows = parseInt(readLine().trim(), 10);

    const gridColumns = parseInt(readLine().trim(), 10);

    let grid = Array(gridRows);

    for (let i = 0; i < gridRows; i++) {
        grid[i] = readLine().replace(/\s+$/g, '').split(' ').map(gridTemp => parseInt(gridTemp, 10));
    }

    const result = completeDiagonalSudokuGrid(grid);

    process.stdout.write(result.map(x => x.join(' ')).join('\n') + '\n');
}
