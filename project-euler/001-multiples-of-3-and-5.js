process.stdin.resume();
process.stdin.setEncoding('ascii');

var input_stdin = "";
var input_stdin_array = "";
var input_currentline = 0;

process.stdin.on('data', function (data) {
    input_stdin += data;
});

process.stdin.on('end', function () {
    input_stdin_array = input_stdin.split("\n");
    main();
});

function readLine() {
    return input_stdin_array[input_currentline++];
}

function main() {
    var t_str = readLine();
    if (!t_str) return;
    var t = parseInt(t_str);

    for (var a0 = 0; a0 < t; a0++) {
        var n_str = readLine();
        if (!n_str) continue;
        var n = BigInt(n_str);
        console.log(calculateSum(n).toString());
    }
}

/**
 * Multiples of 3 or 5
 * Time Complexity: O(1)
 * Space Complexity: O(1)
 */

function calculateSum(n) {
    const target = n - 1n;

    const sumMultiples = (k, maxVal) => {
        const p = maxVal / k;
        return k * (p * (p + 1n) / 2n);
    };

    const sum3 = sumMultiples(3n, target);
    const sum5 = sumMultiples(5n, target);
    const sum15 = sumMultiples(15n, target);

    return sum3 + sum5 - sum15;
};