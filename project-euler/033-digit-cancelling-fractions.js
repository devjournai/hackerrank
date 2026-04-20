/**
 * Digit Cancelling Fractions
 * Time Complexity: O(N · N!)
 * Space Complexity: O(N)
 */

function insertChars(array, count, target) {
    const out = new Array(array.length + count);
    for (let k = 0; k < count; k++) out[k] = target;
    for (let k = count; k < out.length; k++) out[k] = array[k - count];
    return out;
};

function nextPermutation(arr) {
    let i = arr.length - 1;
    while (i > 0 && arr[i - 1] >= arr[i]) i--;
    if (i <= 0) return false;

    let j = arr.length - 1;
    while (arr[j] <= arr[i - 1]) j--;

    [arr[i - 1], arr[j]] = [arr[j], arr[i - 1]];

    let left = i, right = arr.length - 1;
    while (left < right) {
        [arr[left], arr[right]] = [arr[right], arr[left]];
        left++;
        right--;
    }
    return true;
};

function numToCharArray(x, digits) {
    let s = String(x);
    while (s.length < digits) s = "0" + s;
    return s.split("");
};

function merge(strFill, mask) {
    let index = 0;
    let result = 0;

    for (const m of mask) {
        result *= 10;
        if (m === ".") {
            result += strFill[index].charCodeAt(0) - "0".charCodeAt(0);
            index++;
        } else {
            result += Number(m);
        }
    }
    return result;
};

function processData(input) {
    const parts = input.trim().split(/\s+/).map(Number);
    const N = parts[0];
    const K = parts[1];

    const keep = N - K;

    const Tens = [1, 10, 100, 1000, 10000];

    let sumN = 0;
    let sumD = 0;

    const used = new Set();

    for (let d = 1; d < Tens[keep]; d++) {
        for (let n = 1; n < d; n++) {
            const charN = numToCharArray(n, keep);
            const charD = numToCharArray(d, keep);

            for (let i = Tens[K - 1]; i < Tens[K]; i++) {
                let inserted = numToCharArray(i, K);

                let isAscending = true;
                for (let j = 1; j < inserted.length; j++) {
                    if (inserted[j - 1] > inserted[j]) {
                        isAscending = false;
                        break;
                    }
                }
                if (!isAscending) continue;

                inserted = insertChars(inserted, keep, ".");

                let charInsertN = inserted.slice();
                do {
                    const newN = merge(charN, charInsertN);

                    if (newN >= Tens[N - 1]) {
                        let charInsertD = inserted.slice();

                        do {
                            const newD = merge(charD, charInsertD);

                            if (newN * d === newD * n) {
                                const id = newN * 10000 + newD;
                                if (!used.has(id)) {
                                    sumN += newN;
                                    sumD += newD;
                                    used.add(id);
                                }
                            }
                        } while (nextPermutation(charInsertD));
                    }
                } while (nextPermutation(charInsertN));
            }
        }
    }

    console.log(sumN + " " + sumD);
};

process.stdin.resume();
process.stdin.setEncoding("ascii");
_input = "";
process.stdin.on("data", function (input) {
    _input += input;
});

process.stdin.on("end", function () {
    processData(_input);
});