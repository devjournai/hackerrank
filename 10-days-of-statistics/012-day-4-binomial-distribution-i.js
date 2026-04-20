function processData(input) {
    const values = input.trim().split(' ').map(Number);
    const boysRatio = values[0];
    const girlsRatio = values[1];

    const n = 6;

    const p = boysRatio / (boysRatio + girlsRatio);
    const q = 1 - p;

    function combination(n, r) {
        let result = 1;
        for (let i = 1; i <= r; i++) {
            result = result * (n - r + i) / i;
        }
        return result;
    }

    let probability = 0;
    for (let k = 3; k <= n; k++) {
        probability += combination(n, k) * Math.pow(p, k) * Math.pow(q, n - k);
    }

    console.log(probability.toFixed(3));
}