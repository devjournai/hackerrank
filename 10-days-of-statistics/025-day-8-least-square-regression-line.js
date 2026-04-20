function processData(input) {
    let lines = input.trim().split("\n");

    let x = [];
    let y = [];

    for (let line of lines) {
        let [xi, yi] = line.split(" ").map(Number);
        x.push(xi);
        y.push(yi);
    }

    let n = x.length;

    let meanX = x.reduce((a, b) => a + b, 0) / n;
    let meanY = y.reduce((a, b) => a + b, 0) / n;

    let num = 0;
    let den = 0;

    for (let i = 0; i < n; i++) {
        num += (x[i] - meanX) * (y[i] - meanY);
        den += (x[i] - meanX) ** 2;
    }

    let b = num / den;

    let a = meanY - b * meanX;

    let result = a + b * 80;

    console.log(result.toFixed(3));
}