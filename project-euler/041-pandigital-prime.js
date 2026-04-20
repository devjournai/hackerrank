/**
 * Pandigital Prime
 * Time Complexity: O(T log P)
 * Space Complexity: O(P)
 */

function processData(input) {
    const arr = input.trim().split(/\s+/).map(BigInt);
    let idx = 0;
    const T = Number(arr[idx++]);

    const pandigitalPrimes = precomputePandigitalPrimes();

    let outputs = [];

    for (let t = 0; t < T; t++) {
        const N = arr[idx++];
        const ans = largestLE(pandigitalPrimes, N);
        outputs.push(ans.toString());
    }

    console.log(outputs.join("\n"));
};

function precomputePandigitalPrimes() {
    const result = [];

    generatePandigital(4, result);
    generatePandigital(7, result);

    result.sort((a, b) => (a < b ? -1 : 1));
    return result;
};

function generatePandigital(n, out) {
    const digits = [];
    for (let i = 1; i <= n; i++) digits.push(String(i));
    permute(digits, 0, out);
};

function permute(arr, l, out) {
    if (l === arr.length) {
        const num = BigInt(arr.join(""));
        if (isPrime(num)) out.push(num);
        return;
    }
    for (let i = l; i < arr.length; i++) {
        [arr[l], arr[i]] = [arr[i], arr[l]];
        permute(arr, l + 1, out);
        [arr[l], arr[i]] = [arr[i], arr[l]];
    }
};

function isPrime(n) {
    if (n < 2n) return false;
    if (n === 2n || n === 3n) return true;
    if (n % 2n === 0n) return false;

    let r = 3n;
    while (r * r <= n) {
        if (n % r === 0n) return false;
        r += 2n;
    }
    return true;
};

function largestLE(arr, N) {
    let lo = 0, hi = arr.length - 1;
    let best = -1n;

    while (lo <= hi) {
        const mid = (lo + hi) >> 1;
        if (arr[mid] <= N) {
            best = arr[mid];
            lo = mid + 1;
        } else hi = mid - 1;
    }

    return best === -1n ? -1n : best;
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