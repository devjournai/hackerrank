function processData(input) {
    const lambda = parseFloat(input.trim());
    const k = 5;

    function factorial(n) {
        let res = 1;
        for (let i = 1; i <= n; i++) {
            res *= i;
        }
        return res;
    }

    const probability = (Math.pow(lambda, k) * Math.exp(-lambda)) / factorial(k);

    console.log(probability.toFixed(3));
}