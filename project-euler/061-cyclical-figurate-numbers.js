/**
 * Cyclic Figurate Numbers
 * Time Complexity: Exponential in T but tiny because T ≤ 6 and candidate lists are small
 * Space Complexity: O(total figurate numbers generated)
 */

function processData(input) {
    const lines = input.trim().split('\n');
    if (lines.length < 2) return;

    const types = lines[1].trim().split(/\s+/).map(Number);
    const targetCount = types.length;

    const figurates = {};
    for (let N of [3, 4, 5, 6, 7, 8]) {
        figurates[N] = [];
        let n = 1;
        while (true) {
            let val = ((N - 2) * n * n + (4 - N) * n) / 2;
            if (val >= 10000) break;
            if (val >= 1000) {
                if (val % 100 >= 10) {
                    figurates[N].push(val);
                }
            }
            n++;
        }
    }

    const results = new Set();

    function findCycle(current, first, bitmask, currentSum, usedNums) {
        if (usedNums.length === targetCount) {
            if (current % 100 === Math.floor(first / 100)) {
                results.add(currentSum);
            }
            return;
        }

        const suffix = current % 100;

        for (let i = 0; i < targetCount; i++) {
            if (!(bitmask & (1 << i))) {
                const type = types[i];
                const candidates = figurates[type];

                for (let nextNum of candidates) {
                    if (Math.floor(nextNum / 100) === suffix && !usedNums.includes(nextNum)) {
                        findCycle(
                            nextNum,
                            first,
                            bitmask | (1 << i),
                            currentSum + nextNum,
                            [...usedNums, nextNum]
                        );
                    }
                }
            }
        }
    }

    const startType = types[0];
    if (figurates[startType]) {
        for (let startNum of figurates[startType]) {
            findCycle(startNum, startNum, 1 << 0, startNum, [startNum]);
        }
    }

    const sortedResults = Array.from(results).sort((a, b) => a - b);
    for (let res of sortedResults) {
        console.log(res);
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