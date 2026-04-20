function interQuartile(values, freqs) {
    let data = [];

    for (let i = 0; i < values.length; i++) {
        for (let j = 0; j < freqs[i]; j++) {
            data.push(values[i]);
        }
    }

    data.sort((a, b) => a - b);

    const median = (arr) => {
        const n = arr.length;
        const mid = Math.floor(n / 2);
        if (n % 2 === 0) {
            return (arr[mid - 1] + arr[mid]) / 2;
        }
        return arr[mid];
    };

    const n = data.length;

    let lowerHalf, upperHalf;
    if (n % 2 === 0) {
        lowerHalf = data.slice(0, n / 2);
        upperHalf = data.slice(n / 2);
    } else {
        lowerHalf = data.slice(0, Math.floor(n / 2));
        upperHalf = data.slice(Math.floor(n / 2) + 1);
    }

    const Q1 = median(lowerHalf);
    const Q3 = median(upperHalf);

    const IQR = Q3 - Q1;

    console.log(IQR.toFixed(1));
}