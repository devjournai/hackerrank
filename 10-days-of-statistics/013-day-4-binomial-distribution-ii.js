function processData(input) {
    const values = input.trim().split(' ').map(Number);

    const defectPercent = values[0];
    const n = values[1];

    const p = defectPercent / 100;
    const q = 1 - p;

    function combination(n, r) {
        let res = 1;
        for (let i = 1; i <= r; i++) {
            res = res * (n - r + i) / i;
        }
        return res;
    }

    function binomial(k) {
        return combination(n, k) * Math.pow(p, k) * Math.pow(q, n - k);
    }

    let noMoreThan2 = 0;
    for (let k = 0; k <= 2; k++) {
        noMoreThan2 += binomial(k);
    }

    let atLeast2 = 0;
    for (let k = 2; k <= n; k++) {
        atLeast2 += binomial(k);
    }

    console.log(noMoreThan2.toFixed(3));
    console.log(atLeast2.toFixed(3));
}