function processData(input) {
    const lines = input.trim().split('\n');

    const [mean, std] = lines[0].split(' ').map(Number);

    const higherThan = parseFloat(lines[1]);
    const passMark = parseFloat(lines[2]);

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

    function cdf(x) {
        return 0.5 * (1 + erf((x - mean) / (std * Math.sqrt(2))));
    }

    const p1 = (1 - cdf(higherThan)) * 100;

    const p2 = (1 - cdf(passMark)) * 100;

    const p3 = cdf(passMark) * 100;

    console.log(p1.toFixed(2));
    console.log(p2.toFixed(2));
    console.log(p3.toFixed(2));
}