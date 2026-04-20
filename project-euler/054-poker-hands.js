/**
 * Poker Hands Comparison
 * Time Complexity: O(T)
 * Space Complexity: O(1)
 */

function processData(input) {
    const parts = input.trim().split(/\s+/);
    let idx = 0;

    const T = parseInt(parts[idx++], 10);

    function value(c) {
        if (c === 'T') return 10;
        if (c === 'J') return 11;
        if (c === 'Q') return 12;
        if (c === 'K') return 13;
        if (c === 'A') return 14;
        return parseInt(c, 10);
    }

    function evaluateHand(cards) {
        let ranks = [];
        let suits = [];

        for (let c of cards) {
            ranks.push(value(c[0]));
            suits.push(c[1]);
        }

        ranks.sort((a, b) => a - b);

        const count = new Map();
        for (let r of ranks) count.set(r, (count.get(r) || 0) + 1);

        const isFlush = suits.every(s => s === suits[0]);

        let isStraight = false;
        if (ranks[4] - ranks[0] === 4 &&
            new Set(ranks).size === 5) {
            isStraight = true;
        }
        if (JSON.stringify(ranks) === JSON.stringify([2, 3, 4, 5, 14])) {
            isStraight = true;
            ranks = [1, 2, 3, 4, 5];
        }
        let groups = Array.from(count.entries())
            .map(([r, f]) => ({ r, f }))
            .sort((a, b) => {
                if (b.f !== a.f) return b.f - a.f;
                return b.r - a.r;
            });

        let orderedRanks = [];
        for (let g of groups) {
            for (let i = 0; i < g.f; i++) orderedRanks.push(g.r);
        }

        if (isStraight && isFlush) {
            if (Math.max(...ranks) === 14 && Math.min(...ranks) === 10) {
                return [10, orderedRanks];
            }
            return [9, orderedRanks];
        }

        if (groups[0].f === 4) return [8, orderedRanks];

        if (groups[0].f === 3 && groups[1].f === 2) return [7, orderedRanks];

        if (isFlush) return [6, ranks.slice().reverse()];

        if (isStraight) return [5, ranks.slice().reverse()];

        if (groups[0].f === 3) return [4, orderedRanks];

        if (groups[0].f === 2 && groups[1].f === 2) return [3, orderedRanks];

        if (groups[0].f === 2) return [2, orderedRanks];

        return [1, ranks.slice().reverse()];
    }

    let out = [];

    for (let t = 0; t < T; t++) {
        let hand1 = [];
        let hand2 = [];

        for (let i = 0; i < 5; i++) hand1.push(parts[idx++]);
        for (let i = 0; i < 5; i++) hand2.push(parts[idx++]);

        const eval1 = evaluateHand(hand1);
        const eval2 = evaluateHand(hand2);

        let winner = "Player 1";
        for (let i = 0; i < Math.max(eval1.length, eval2.length); i++) {
            const a = Array.isArray(eval1[i]) ? eval1[i] : [eval1[i]];
            const b = Array.isArray(eval2[i]) ? eval2[i] : [eval2[i]];

            for (let j = 0; j < Math.max(a.length, b.length); j++) {
                const va = a[j] ?? 0;
                const vb = b[j] ?? 0;
                if (va > vb) {
                    winner = "Player 1";
                    j = 9999;
                    i = 9999;
                    break;
                } else if (va < vb) {
                    winner = "Player 2";
                    j = 9999;
                    i = 9999;
                    break;
                }
            }
        }

        out.push(winner);
    }

    console.log(out.join("\n"));
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