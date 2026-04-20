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

function main() {
    const t = parseInt(readLine());

    for (let i = 0; i < t; i++) {
        const n = BigInt(readLine());
        console.log(smallestMultiple(n).toString());
    }
}

/**
 * Smallest Multiple
 * Time Complexity: O(N log N)
 * Space Complexity: O(1)
 */

function gcd(a, b) {
    while (b !== 0n) {
        let temp = b;
        b = a % b;
        a = temp;
    }
    return a;
}

function lcm(a, b) {
    return (a / gcd(a, b)) * b;
}

function smallestMultiple(n) {
    let ans = 1n;

    for (let i = 2n; i <= n; i++) {
        ans = lcm(ans, i);
    }

    return ans;
};