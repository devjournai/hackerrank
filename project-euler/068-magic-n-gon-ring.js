/**
 * Magic N-gon Ring
 * Time Complexity: O(branching^(N))
 * Space Complexity: O(N)
 */

function combinations(arr, k) {
    const result = [];

    function backtrack(start, path) {
        if (path.length === k) {
            result.push(path.slice());
            return;
        }
        for (let i = start; i < arr.length; i++) {
            path.push(arr[i]);
            backtrack(i + 1, path);
            path.pop();
        }
    }

    backtrack(0, []);
    return result;
};

function formatSolution(outers, inners) {
    let s = "";
    for (let i = 0; i < outers.length; i++) {
        s += String(outers[i]) + String(inners[i]) + String(inners[(i + 1) % outers.length]);
    }
    return s;
};

function checkSolution(outers, inners, S) {
    for (let i = 0; i < outers.length; i++) {
        const a = outers[i];
        const b = inners[i];
        const c = inners[(i + 1) % outers.length];
        if (a + b + c !== S) return false;
    }
    return true;
};

function generateSolutions(N, S) {
    const nums = [];
    for (let i = 1; i <= 2 * N; i++) nums.push(i);

    const outerCandidates = [];
    const targetSum = N * (4 * N + 2 - S);

    for (const combo of combinations(nums, N)) {
        const sum = combo.reduce((a, b) => a + b, 0);
        if (sum === targetSum) {
            outerCandidates.push(new Set(combo));
        }
    }

    const solutions = [];

    function complete(solOuters, solInners, outers, inners) {
        for (const newOuter of Array.from(outers)) {
            const newSolOuters = solOuters.concat([newOuter]);
            const newOuters = new Set(outers);
            newOuters.delete(newOuter);

            const lastInner = solInners[solInners.length - 1];
            const newInner = S - newOuter - lastInner;

            if (inners.has(newInner)) {
                const newSolInners = solInners.concat([newInner]);
                const newInners = new Set(inners);
                newInners.delete(newInner);

                if (newInners.size === 0) {
                    // add final outer
                    const remainingOuter = Array.from(newOuters)[0];
                    const finalOuters = newSolOuters.concat([remainingOuter]);

                    if (checkSolution(finalOuters, newSolInners, S)) {
                        solutions.push(formatSolution(finalOuters, newSolInners));
                        return;
                    }
                }

                complete(newSolOuters, newSolInners, newOuters, newInners);
            }
        }
    }

    for (const outerSet of outerCandidates) {
        const allNums = new Set(nums);
        for (const x of outerSet) allNums.delete(x);

        const inners = new Set(allNums);
        const outers = new Set(outerSet);

        let a = Math.min(...outers);
        outers.delete(a);

        for (const b of Array.from(inners)) {
            const newInners = new Set(inners);
            newInners.delete(b);

            const c = S - a - b;

            if (newInners.has(c)) {
                newInners.delete(c);
                complete([a], [b, c], outers, newInners);
            }
        }
    }

    return solutions.sort();
};

function processData(input) {
    input = input.trim().split(/\s+/).map(Number);
    const N = input[0];
    const S = input[1];

    const solutions = generateSolutions(N, S);

    for (const sol of solutions) {
        console.log(sol);
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