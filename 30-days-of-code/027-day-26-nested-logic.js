function processData(input) {
  const lines = input.trim().split("\n");

  const [d1, m1, y1] = lines[0].split(" ").map(Number);
  const [d2, m2, y2] = lines[1].split(" ").map(Number);

  let fine = 0;

  if (y1 > y2) {
    fine = 10000;
  } else if (y1 === y2 && m1 > m2) {
    fine = 500 * (m1 - m2);
  } else if (y1 === y2 && m1 === m2 && d1 > d2) {
    fine = 15 * (d1 - d2);
  }

  console.log(fine);
}
