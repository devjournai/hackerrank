function main() {
  const n = parseInt(readLine().trim());

  let binary = n.toString(2);

  let maxCount = 0;
  let onesGroups = binary.split("0");

  for (let group of onesGroups) {
    maxCount = Math.max(maxCount, group.length);
  }

  console.log(maxCount);
}