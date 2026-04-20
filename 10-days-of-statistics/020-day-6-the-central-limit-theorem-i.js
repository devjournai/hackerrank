function processData(input) {
    const lines = input.trim().split('\n').map(Number);

    const maxWeight = lines[0];
    const n = lines[1];
    const mean = lines[2];
    const std = lines[3];

    const sampleMean = n * mean;
    const sampleStd = Math.sqrt(n) * std;

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
        return 0.5 * (1 + erf((x - sampleMean) / (sampleStd * Math.sqrt(2))));
    }
    const probability = cdf(maxWeight);

    console.log(probability.toFixed(4));
}