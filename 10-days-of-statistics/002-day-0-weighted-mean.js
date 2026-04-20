function weightedMean(X, W) {
    let weightedSum = 0;
    let weightSum = 0;
    
    for (let i = 0; i < X.length; i++) {
        weightedSum += X[i] * W[i];
        weightSum += W[i];
    }
    
    const result = weightedSum / weightSum;
    console.log(result.toFixed(1));
}