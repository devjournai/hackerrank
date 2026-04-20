/**
 * Special Subset Sum Optimum
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */

function processData(input) {
  const N = parseInt(input.trim(), 10);
  if (isNaN(N)) return;

  const MOD = 715827881;
  const heads = new Int32Array(N);
  const prefix_sum = new Int32Array(N + 1);

  heads[0] = 1;
  prefix_sum[0] = 0;
  prefix_sum[1] = 1;

  for (let k = 1; k < N; k++) {
    const prev_set_size = k;
    const mid_index = Math.floor(prev_set_size / 2);

    const count_to_sum = mid_index + 1;
    const end_index = k;
    const start_index = k - count_to_sum;

    let next_b = prefix_sum[end_index] - prefix_sum[start_index];

    if (next_b < 0) next_b += MOD;
    else if (next_b >= MOD) next_b %= MOD;

    heads[k] = next_b;

    let next_prefix = prefix_sum[k] + next_b;
    if (next_prefix >= MOD) next_prefix %= MOD;
    prefix_sum[k + 1] = next_prefix;
  }

  const output = [];

  for (let i = 0; i < N; i++) {
    const count = i + 1;
    const start_idx = N - count;
    const end_idx = N;

    let val = prefix_sum[end_idx] - prefix_sum[start_idx];

    if (val < 0) val += MOD;
    else if (val >= MOD) val %= MOD;

    output.push(val);
  }

  console.log(output.join(' '));
};

process.stdin.resume();
process.stdin.setEncoding("ascii");
let _input = "";
process.stdin.on("data", function (input) {
  _input += input;
});
process.stdin.on("end", function () {
  processData(_input);
});