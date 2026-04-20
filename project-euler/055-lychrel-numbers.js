/**
 * Lychrel Numbers
 * Time Complexity: O(N * I * D)
 * Space Complexity: O(P)
 */

function processData(input) {
    const N = parseInt(input.trim(), 10);

    function isPalindrome(x) {
        const s = x.toString();
        const rev = s.split('').reverse().join('');
        return s === rev;
    }

    function reverseBigInt(x) {
        const s = x.toString();
        const rev = s.split('').reverse().join('');
        return BigInt(rev);
    }

    const freq = new Map();

    for (let n = 1; n <= N; n++) {
        let x = BigInt(n);

        if (isPalindrome(x)) {
            const key = x.toString();
            freq.set(key, (freq.get(key) || 0) + 1);
            continue;
        }

        let ok = false;
        let pal = null;

        for (let iter = 1; iter <= 60; iter++) {
            const rev = reverseBigInt(x);
            x = x + rev;

            if (isPalindrome(x)) {
                ok = true;
                pal = x.toString();
                break;
            }
        }

        if (ok) {
            freq.set(pal, (freq.get(pal) || 0) + 1);
        }
    }

    let bestPal = null;
    let bestCount = -1;

    for (const [pal, count] of freq.entries()) {
        if (count > bestCount) {
            bestCount = count;
            bestPal = pal;
        } else if (count === bestCount) {
            if (BigInt(pal) < BigInt(bestPal)) {
                bestPal = pal;
            }
        }
    }

    console.log(bestPal + " " + bestCount);
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