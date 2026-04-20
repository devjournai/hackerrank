function processData(input) {
  const values = input.trim().split(" ").map(Number);

  const lambdaA = values[0];
  const lambdaB = values[1];

  const costA = 160 + 40 * (lambdaA + Math.pow(lambdaA, 2));
  const costB = 128 + 40 * (lambdaB + Math.pow(lambdaB, 2));

  console.log(costA.toFixed(3));
  console.log(costB.toFixed(3));
}
