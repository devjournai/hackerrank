function processData(input) {
    const lines = input.trim().split('\n');

    const [mean, std] = lines[0].split(' ').map(Number);

    const x = parseFloat(lines[1]);

    const [lower, upper] = lines[2].split(' ').map(Number);

    function erf(z) {
        const a1 = 0.254829592;
        const a2 = -0.284496736;
        const a3 = 1.421413741;
        const a4 = -1.453152027;
        const a5 = 1.061405429;
        const p = 0.3275911;

        const sign = z < 0 ? -1 : 1;
        z = Math.abs(z);

        const t = 1 / (1 + p * z);
        const y =
            1 -
            (((((a5 * t + a4) * t + a3) * t + a2) * t + a1) *
                t *
                Math.exp(-z * z));

        return sign * y;
    }

    function cdf(value) {
        return 0.5 * (1 + erf((value - mean) / (std * Math.sqrt(2))));
    }

    const p1 = cdf(x);
    const p2 = cdf(upper) - cdf(lower);

    console.log(p1.toFixed(3));
    console.log(p2.toFixed(3));
}