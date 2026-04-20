/**
 * Distinct Powers
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */

function processData(input) {
    const N = parseInt(input.trim(), 10);

    const isPerfectPower = new Array(N + 1).fill(false);

    for (let base = 2; base * base <= N; base++) {
        let v = base * base;
        while (v <= N) {
            isPerfectPower[v] = true;
            v *= base;
        }
    }

    let total = 0n;

    for (let r = 2; r <= N; r++) {

        if (isPerfectPower[r]) continue;

        let kList = [];
        let val = r;
        let k = 1;

        while (val <= N) {
            kList.push(k);
            val *= r;
            k++;
        }

        if (kList.length === 1) {
            total += BigInt(N - 1);
            continue;
        }

        const maxExp = kList[kList.length - 1] * N;
        const seen = new Uint8Array(maxExp + 1);

        for (const kk of kList) {
            for (let b = 2; b <= N; b++) {
                seen[kk * b] = 1;
            }
        }

        let cnt = 0;
        for (let i = 2; i < seen.length; i++) if (seen[i]) cnt++;

        total += BigInt(cnt);
    }

    console.log(total.toString());
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