/*
 * Generalised Hamming Numbers
 * Time Complexity: O(count * log(primes))
 * Space Complexity: O(count)
 */

process.stdin.resume();
process.stdin.setEncoding("ascii");

var input_stdin = "";
var input_stdin_array = "";
var input_currentline = 0;

process.stdin.on("data", function (data) {
  input_stdin += data;
});

process.stdin.on("end", function () {
  input_stdin_array = input_stdin.split("\n");
  main();
});

function readLine() {
  return input_stdin_array[input_currentline++];
}

function generalisedHammingNumbers(n, k) {
  if (k < 2) return 1;

  var primes = [];
  var is_prime = new Uint8Array(k + 1);
  for (var i = 0; i <= k; i++) is_prime[i] = 1;
  is_prime[0] = is_prime[1] = 0;

  for (var p = 2; p * p <= k; p++) {
    if (is_prime[p]) {
      for (var i = p * p; i <= k; i += p) is_prime[i] = 0;
    }
  }

  for (var p = 2; p <= k; p++) {
    if (is_prime[p]) primes.push(p);
  }

  var count = 0;

  function recurse(product, pIdx) {
    count++;

    for (var i = pIdx; i < primes.length; i++) {
      var nextProduct = product * primes[i];
      if (nextProduct > n) break;
      recurse(nextProduct, i);
    }
  }

  recurse(1, 0);

  return count;
}

function main() {
  var line = readLine();
  if (!line) return;
  var n_temp = line.trim().split(/\s+/);
  var n = Number(n_temp[0]);
  var k = parseInt(n_temp[1]);
  var result = generalisedHammingNumbers(n, k);
  process.stdout.write("" + result + "\n");
}