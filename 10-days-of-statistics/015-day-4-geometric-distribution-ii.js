function processData(input) {
    const lines = input.trim().split('\n');

    const [numerator, denominator] = lines[0].split(' ').map(Number);
    const p = numerator / denominator;

    const n = parseInt(lines[1], 10);

    const probability = 1 - Math.pow(1 - p, n);

    console.log(probability.toFixed(3));
}