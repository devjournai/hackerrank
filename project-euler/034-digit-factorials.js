/**
 * Digit Factorial
 * Time Complexity: O(N · D)
 * Space Complexity: O(1)
 */

function processData(input) {
    const N = parseInt(input.trim(), 10);

    const fact = new Array(10);
    fact[0] = 1;
    for (let d = 1; d <= 9; d++) {
        fact[d] = fact[d - 1] * d;
    }

    let answer = 0;

    for (let n = 10; n < N; n++) {
        let x = n;
        let sumFact = 0;

        while (x > 0) {
            sumFact += fact[x % 10];
            x = Math.floor(x / 10);
        }

        if (sumFact % n === 0) {
            answer += n;
        }
    }

    console.log(answer);
};

process.stdin.resume();
process.stdin.setEncoding("ascii");
let _input = "";
process.stdin.on("data", function (input) {
    _input += input;
});
process.stdin.on("end", function () {
    processData(_input);
});