/**
 * Substring Divisibility
 * Time Complexity: O(10^5)
 * Space Complexity: O(10)
 */

function str2num(str) {
    let n = 0n;
    for (const c of str) {
        n = n * 10n + BigInt(c.charCodeAt(0) - "0".charCodeAt(0));
    }
    return n;
};

function nextPermutation(arr) {
    let i = arr.length - 2;
    while (i >= 0 && arr[i] >= arr[i + 1]) i--;
    if (i < 0) return false;

    let j = arr.length - 1;
    while (arr[j] <= arr[i]) j--;

    [arr[i], arr[j]] = [arr[j], arr[i]];

    let l = i + 1,
        r = arr.length - 1;
    while (l < r) {
        [arr[l], arr[r]] = [arr[r], arr[l]];
        l++;
        r--;
    }
    return true;
};

function processData(input) {
    const maxDigit = Number(input.trim());

    let pan = "0123456789".slice(0, maxDigit + 1).split("");

    const primes = [2, 3, 5, 7, 11, 13, 17];

    let sum = 0n;

    do {
        let ok = true;

        for (let i = 0; i + 2 < maxDigit; i++) {
            const substr = pan.slice(i + 1, i + 4).join("");
            const value = Number(substr);

            if (value % primes[i] !== 0) {
                ok = false;
                break;
            }
        }

        if (ok) sum += str2num(pan.join(""));
    } while (nextPermutation(pan));

    console.log(sum.toString());
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