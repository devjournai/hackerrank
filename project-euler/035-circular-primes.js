/**
 * Circular Primes
 * Time Complexity: O(N log log N)
 * Space Complexity: O(N)
 */

function processData(input) {
    const N = parseInt(input.trim());
    const LIMIT = 1000000;

    const isPrime = new Array(LIMIT + 1).fill(true);
    isPrime[0] = isPrime[1] = false;
    for (let p = 2; p * p <= LIMIT; p++) {
        if (isPrime[p]) {
            for (let i = p * p; i <= LIMIT; i += p)
                isPrime[i] = false;
        }
    }

    function getRotations(num) {
        const s = num.toString();
        const rotations = [];
        for (let i = 1; i < s.length; i++) {
            const rotated = s.slice(i) + s.slice(0, i);
            rotations.push(parseInt(rotated));
        }
        return rotations;
    }

    let sum = 0;

    for (let i = 2; i < N; i++) {
        if (isPrime[i]) {
            const rotations = getRotations(i);
            let allPrime = true;

            for (let rotatedNum of rotations) {
                if (!isPrime[rotatedNum]) {
                    allPrime = false;
                    break;
                }
            }

            if (allPrime) {
                sum += i;
            }
        }
    }

    console.log(sum);
};

function getRotations(n) {
    const s = n.toString();
    const rotations = [];

    for (let i = 0; i < s.length; i++) {
        rotations.push(Number(s.slice(i) + s.slice(0, i)));
    }

    return rotations;
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