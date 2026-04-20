function processData(input) {
    const lines = input.trim().split('\n').map(Number);

    const n = lines[0];
    const mean = lines[1];
    const std = lines[2];
    const z = lines[4];

    const standardError = std / Math.sqrt(n);

    const A = mean - z * standardError;
    const B = mean + z * standardError;

    console.log(A.toFixed(2));
    console.log(B.toFixed(2));
}