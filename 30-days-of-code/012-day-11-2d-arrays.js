function main() {
    let arr = Array(6);

    for (let i = 0; i < 6; i++) {
        arr[i] = readLine()
            .trim()
            .split(" ")
            .map(Number);
    }

    let maxSum = -Infinity;

    for (let i = 0; i <= 3; i++) {
        for (let j = 0; j <= 3; j++) {

            let hourglassSum =
                arr[i][j] + arr[i][j + 1] + arr[i][j + 2] +
                arr[i + 1][j + 1] +
                arr[i + 2][j] + arr[i + 2][j + 1] + arr[i + 2][j + 2];

            maxSum = Math.max(maxSum, hourglassSum);
        }
    }

    console.log(maxSum);
}