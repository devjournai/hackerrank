function main() {
    const i = 4;
    const d = 4.0;
    const s = "HackerRank ";

    const i2 = parseInt(readLine());
    const d2 = parseFloat(readLine());
    const s2 = readLine();

    console.log(i + i2);
    console.log((d + d2).toFixed(1));
    console.log(s + s2);
}