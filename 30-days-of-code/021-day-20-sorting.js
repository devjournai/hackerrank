function main() {
  const n = parseInt(readLine().trim(), 10);
  const a = readLine().trim().split(" ").map(Number);

  let totalSwaps = 0;

  for (let i = 0; i < n; i++) {
    let swapsThisRound = 0;

    for (let j = 0; j < n - 1; j++) {
      if (a[j] > a[j + 1]) {
        [a[j], a[j + 1]] = [a[j + 1], a[j]];
        totalSwaps++;
        swapsThisRound++;
      }
    }

    if (swapsThisRound === 0) {
      break;
    }
  }

  console.log(`Array is sorted in ${totalSwaps} swaps.`);
  console.log(`First Element: ${a[0]}`);
  console.log(`Last Element: ${a[a.length - 1]}`);
}
