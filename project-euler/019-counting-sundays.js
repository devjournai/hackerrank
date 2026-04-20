/**
 * Counting Sundays
 * Time Complexity: O(M)
 * Space Complexity: O(1)
 */

function processData(input) {
    const arr = input.trim().split(/\s+/);
    let idx = 0;

    const T = Number(arr[idx++]);
    const out = [];

    function isSundayOnFirst(y, m) {
        let Y = y;
        let M = BigInt(m);

        if (M === 1n) { M = 13n; Y -= 1n; }
        else if (M === 2n) { M = 14n; Y -= 1n; }

        const q = 1n;
        const K = Y % 100n;
        const J = Y / 100n;

        let h =
            q +
            (13n * (M + 1n)) / 5n +
            K +
            K / 4n +
            J / 4n +
            5n * J;

        h = h % 7n;

        return h === 1n;
    }

    for (let t = 0; t < T; t++) {

        let y1 = BigInt(arr[idx++]);
        let m1 = Number(arr[idx++]);
        let d1 = Number(arr[idx++]);

        let y2 = BigInt(arr[idx++]);
        let m2 = Number(arr[idx++]);
        let d2 = Number(arr[idx++]);

        if (d1 > 1) {
            m1++;
            if (m1 === 13) {
                m1 = 1;
                y1++;
            }
        }

        if (d2 === 0) {
            m2--;
            if (m2 === 0) {
                m2 = 12;
                y2--;
            }
        }

        let count = 0;

        let cy = y1;
        let cm = m1;

        while (cy < y2 || (cy === y2 && cm <= m2)) {

            if (isSundayOnFirst(cy, cm)) {
                count++;
            }

            cm++;
            if (cm === 13) {
                cm = 1;
                cy++;
            }
        }

        out.push(count);
    }

    console.log(out.join("\n"));
}

process.stdin.resume();
process.stdin.setEncoding("ascii");
let _input = "";
process.stdin.on("data", function (input) {
    _input += input;
});
process.stdin.on("end", function () {
    processData(_input);
});