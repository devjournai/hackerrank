function processData(input) {
    const lines = input.trim().split('\n');
    const n = parseInt(lines[0]);
    const arr = lines[1].trim().split(' ').map(Number);

    const mean = arr.reduce((sum, val) => sum + val, 0) / n;

    arr.sort((a, b) => a - b);
    let median;
    if (n % 2 === 0) {
        median = (arr[n / 2 - 1] + arr[n / 2]) / 2;
    } else {
        median = arr[Math.floor(n / 2)];
    }

    const freq = {};
    let mode = arr[0];
    let maxCount = 0;

    for (let num of arr) {
        freq[num] = (freq[num] || 0) + 1;
        if (
            freq[num] > maxCount ||
            (freq[num] === maxCount && num < mode)
        ) {
            maxCount = freq[num];
            mode = num;
        }
    }

    console.log(mean.toFixed(1));
    console.log(median.toFixed(1));
    console.log(mode);
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