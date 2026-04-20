function stdDev(arr) {
    const n = arr.length;

    const mean = arr.reduce((sum, val) => sum + val, 0) / n;

    const variance = arr.reduce((sum, val) => {
        return sum + Math.pow(val - mean, 2);
    }, 0) / n;

    const std = Math.sqrt(variance);

    console.log(std.toFixed(1));
}