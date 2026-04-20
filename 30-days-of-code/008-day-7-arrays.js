function main() {
    const n = parseInt(readLine().trim(), 10);

    const arr = readLine()
        .trim()
        .split(' ')
        .map(Number);

    console.log(arr.reverse().join(' '));
}