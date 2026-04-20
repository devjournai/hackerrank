function processData(input) {
    const lines = input.trim().split('\n');
    const n = parseInt(lines[0]);
    
    const x = lines[1].trim().split(/\s+/).map(Number);
    const y = lines[2].trim().split(/\s+/).map(Number);

    const getMean = (arr) => {
        const sum = arr.reduce((acc, val) => acc + val, 0);
        return sum / n;
    };

    const muX = getMean(x);
    const muY = getMean(y);

    const getStdDev = (arr, mu) => {
        const sumSquareDiffs = arr.reduce((acc, val) => acc + Math.pow(val - mu, 2), 0);
        return Math.sqrt(sumSquareDiffs / n);
    };

    const sigmaX = getStdDev(x, muX);
    const sigmaY = getStdDev(y, muY);

    let covarianceSum = 0;
    for (let i = 0; i < n; i++) {
        covarianceSum += (x[i] - muX) * (y[i] - muY);
    }

    const rho = covarianceSum / (n * sigmaX * sigmaY);
    console.log(rho.toFixed(3));
}