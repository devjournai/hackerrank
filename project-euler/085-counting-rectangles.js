/**
 * Counting Rectangles
 * Time Complexity: O(T × √target)
 * Space Complexity: O(1)
 */

function processData(input) {
    const lines = input.trim().split('\n').map(Number);
    let idx = 0;

    const T = lines[idx++];
    let output = [];

    for (let t = 0; t < T; t++) {
        const target = lines[idx++];

        let bestDiff = Infinity;
        let bestArea = 0;

        for (let m = 1; ; m++) {
            const rectM = (m * (m + 1)) / 2;

            if (rectM > target * 2) break;

            for (let n = 1; ; n++) {
                const rectN = (n * (n + 1)) / 2;
                const rectangles = rectM * rectN;

                const diff = Math.abs(rectangles - target);

                if (diff < bestDiff || (diff === bestDiff && m * n > bestArea)) {
                    bestDiff = diff;
                    bestArea = m * n;
                }

                if (rectangles > target) break;
            }
        }

        output.push(bestArea.toString());
    }

    console.log(output.join('\n'));
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