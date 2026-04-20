process.stdin.resume();
process.stdin.setEncoding('ascii');

let input_stdin = "";
let input_stdin_array = "";
let input_currentline = 0;

process.stdin.on('data', function (data) {
    input_stdin += data;
});

process.stdin.on('end', function () {
    input_stdin_array = input_stdin.trim().split("\n");
    main();
});

function readLine() {
    return input_stdin_array[input_currentline++];
}

/**
 * Largest Product in a Grid
 * Time Complexity: O(N^2)
 * Space Complexity: O(1)
 */

function main() {
    const grid = [];

    for (let i = 0; i < 20; i++) {
        grid[i] = readLine().trim().split(" ").map(Number);
    }

    let maxProduct = 0;

    for (let i = 0; i < 20; i++) {
        for (let j = 0; j < 20; j++) {
            if (j + 3 < 20) {
                const prod =
                    grid[i][j] *
                    grid[i][j + 1] *
                    grid[i][j + 2] *
                    grid[i][j + 3];
                maxProduct = Math.max(maxProduct, prod);
            }

            if (i + 3 < 20) {
                const prod =
                    grid[i][j] *
                    grid[i + 1][j] *
                    grid[i + 2][j] *
                    grid[i + 3][j];
                maxProduct = Math.max(maxProduct, prod);
            }

            if (i + 3 < 20 && j + 3 < 20) {
                const prod =
                    grid[i][j] *
                    grid[i + 1][j + 1] *
                    grid[i + 2][j + 2] *
                    grid[i + 3][j + 3];
                maxProduct = Math.max(maxProduct, prod);
            }

            if (i + 3 < 20 && j - 3 >= 0) {
                const prod =
                    grid[i][j] *
                    grid[i + 1][j - 1] *
                    grid[i + 2][j - 2] *
                    grid[i + 3][j - 3];
                maxProduct = Math.max(maxProduct, prod);
            }
        }
    }

    console.log(maxProduct);
};