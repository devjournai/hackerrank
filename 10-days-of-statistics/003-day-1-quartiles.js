function quartiles(arr) {
    arr.sort((a, b) => a - b);

    const median = (array) => {
        const len = array.length;
        const mid = Math.floor(len / 2);
        if (len % 2 === 0) {
            return Math.floor((array[mid - 1] + array[mid]) / 2);
        }
        return array[mid];
    };

    const Q2 = median(arr);

    let lowerHalf, upperHalf;
    if (arr.length % 2 === 0) {
        lowerHalf = arr.slice(0, arr.length / 2);
        upperHalf = arr.slice(arr.length / 2);
    } else {
        lowerHalf = arr.slice(0, Math.floor(arr.length / 2));
        upperHalf = arr.slice(Math.floor(arr.length / 2) + 1);
    }

    const Q1 = median(lowerHalf);
    const Q3 = median(upperHalf);

    return [Q1, Q2, Q3];
}