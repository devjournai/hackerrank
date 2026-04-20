function processData(input) {
  const lines = input.trim().split("\n");
  const T = parseInt(lines[0]);

  let index = 1;

  for (let i = 0; i < T; i++) {
    const n = parseInt(lines[index++]);

    if (n <= 1) {
      console.log("Not prime");
      continue;
    }

    let isPrime = true;

    for (let j = 2; j * j <= n; j++) {
      if (n % j === 0) {
        isPrime = false;
        break;
      }
    }

    console.log(isPrime ? "Prime" : "Not prime");
  }
}
