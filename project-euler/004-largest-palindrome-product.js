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

    for (let k = 0; k < t; k++) {
        const n = parseInt(readLine());
        console.log(largestPalindromeLessThanN(n));
    }
}

function isPalindrome(num) {
    const s = num.toString();
    return s === s.split('').reverse().join('');
}

/**
 * Largest Palindrome Product
 * Time Complexity: O(900^2) ≈ O(1)
 * Space Complexity: O(P) where P is number of palindromes (~ few thousand)
 */

function precomputePalindromes() {
    const pals = [];

    for (let i = 100; i <= 999; i++) {
        for (let j = i; j <= 999; j++) {
            const prod = i * j;
            if (isPalindrome(prod)) {
                pals.push(prod);
            }
        }
    }

    pals.sort((a, b) => a - b);
    return pals;
}

const palindromes = precomputePalindromes();

function largestPalindromeLessThanN(N) {
    let left = 0;
    let right = palindromes.length - 1;
    let ans = -1;

    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        if (palindromes[mid] < N) {
            ans = palindromes[mid];
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }

    return ans;
};