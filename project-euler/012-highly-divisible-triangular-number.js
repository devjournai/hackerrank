/**
 * Highly Divisible Triangular Number
 * Time Complexity: O(K √K)
 * Space Complexity: O(1)
 */

function processData(input) {
    input = input.trim().split(/\s+/).map(Number);
    let t = input[0];
    let idx = 1;

    function countDivisors(n) {
        let cnt = 0;
        let root = Math.floor(Math.sqrt(n));
        for (let i = 1; i <= root; i++) {
            if (n % i === 0) {
                cnt += 2;
            }
        }
        if (root * root === n) cnt--;
        return cnt;
    }

    while (t--) {
        let N = input[idx++];

        let k = 1;

        while (true) {
            let a, b;

            if (k % 2 === 0) {
                a = k / 2;
                b = k + 1;
            } else {
                a = (k + 1) / 2;
                b = k;
            }

            let divisors = countDivisors(a) * countDivisors(b);

            if (divisors > N) {
                console.log((k * (k + 1)) / 2);
                break;
            }

            k++;
        }
    }
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