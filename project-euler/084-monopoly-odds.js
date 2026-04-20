/**
 * Monopoly Odds
 * Time Complexity: O(I × 40²)
 * Space Complexity: O(40²)
 */

function processData(input) {
    const [N, K] = input.trim().split(/\s+/).map(Number);

    const board = [
        "GO", "A1", "CC1", "A2", "T1", "R1", "B1", "CH1", "B2", "B3",
        "JAIL", "C1", "U1", "C2", "C3", "R2", "D1", "CC2", "D2", "D3",
        "FP", "E1", "CH2", "E2", "E3", "R3", "F1", "F2", "U2", "F3",
        "G2J", "G1", "G2", "CC3", "G3", "R4", "CH3", "H1", "T2", "H2"
    ];

    const index = Object.fromEntries(board.map((v, i) => [v, i]));

    const CC = new Set([index.CC1, index.CC2, index.CC3]);
    const CH = new Set([index.CH1, index.CH2, index.CH3]);

    const nextRail = (p) => [5, 15, 25, 35].find(r => r > p) ?? 5;
    const nextUtil = (p) => [12, 28].find(u => u > p) ?? 12;

    const diceProb = new Map();
    for (let i = 1; i <= N; i++) {
        for (let j = 1; j <= N; j++) {
            diceProb.set(i + j, (diceProb.get(i + j) || 0) + 1);
        }
    }
    const totalDice = N * N;

    const T = Array.from({ length: 40 }, () => Array(40).fill(0));

    function resolve(pos, prob, acc) {
        if (pos === index.G2J) {
            acc[index.JAIL] += prob;
            return;
        }

        if (CC.has(pos)) {
            acc[index.GO] += prob * (1 / 16);
            acc[index.JAIL] += prob * (1 / 16);
            acc[pos] += prob * (14 / 16);
            return;
        }

        if (CH.has(pos)) {
            const p = prob / 16;
            acc[index.GO] += p;
            acc[index.JAIL] += p;
            acc[index.C1] += p;
            acc[index.E3] += p;
            acc[index.H2] += p;
            acc[index.R1] += p;
            acc[nextRail(pos)] += 2 * p;
            acc[nextUtil(pos)] += p;

            resolve((pos + 37) % 40, p, acc);

            acc[pos] += 6 * p;
            return;
        }

        acc[pos] += prob;
    }

    for (let i = 0; i < 40; i++) {
        for (const [roll, count] of diceProb.entries()) {
            const p = (i + roll) % 40;
            const baseProb = count / totalDice;
            const acc = Array(40).fill(0);
            resolve(p, baseProb, acc);

            for (let j = 0; j < 40; j++) {
                T[i][j] += acc[j];
            }
        }
    }

    let prob = Array(40).fill(1 / 40);
    for (let iter = 0; iter < 1000; iter++) {
        const next = Array(40).fill(0);
        for (let i = 0; i < 40; i++) {
            for (let j = 0; j < 40; j++) {
                next[j] += prob[i] * T[i][j];
            }
        }
        prob = next;
    }

    const result = board
        .map((name, i) => [name, prob[i]])
        .sort((a, b) => b[1] - a[1])
        .slice(0, K)
        .map(x => x[0])
        .join(" ");

    console.log(result);
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