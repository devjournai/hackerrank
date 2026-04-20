/*
 * Iterative Circle Packing
 * Time Complexity: O(3^m)
 * Space Complexity: O(m)
 */

function processData(input) {
  const lines = input.trim().split("\n");
  const [n, m] = lines[0].trim().split(/\s+/).map(Number);

  if (m === 0) {
    const sin_pi_n = Math.sin(Math.PI / n);
    const r0 = sin_pi_n / (1 + sin_pi_n);
    const area_covered = n * r0 * r0;
    console.log((1 - area_covered).toFixed(12));
    return;
  }

  const PI = Math.PI;
  const sin_pi_n = Math.sin(PI / n);

  const r0 = sin_pi_n / (1 + sin_pi_n);
  const k0 = 1 / r0;

  let total_r2 = n * r0 * r0;

  const AREA_THRESHOLD = 1e-18;
  const EPS = 1e-9;

  function solve(k1, k2, k3, depth) {
    let inner = k1 * k2 + k2 * k3 + k3 * k1;
    if (inner < 0) inner = 0;

    const root = Math.sqrt(inner);
    const k_new = k1 + k2 + k3 + 2 * root;

    const r_new = 1 / k_new;
    const area = r_new * r_new;

    if (area < AREA_THRESHOLD) return 0;

    let sum = area;

    if (depth > 1) {
      const k1_eq_k2 = Math.abs(k1 - k2) < EPS;
      const k2_eq_k3 = Math.abs(k2 - k3) < EPS;
      const k3_eq_k1 = Math.abs(k3 - k1) < EPS;

      if (k1_eq_k2 && k2_eq_k3) {
        sum += 3 * solve(k1, k2, k_new, depth - 1);
      } else if (k1_eq_k2) {
        sum += solve(k1, k2, k_new, depth - 1);
        sum += 2 * solve(k2, k3, k_new, depth - 1);
      } else if (k2_eq_k3) {
        sum += 2 * solve(k1, k2, k_new, depth - 1);
        sum += solve(k2, k3, k_new, depth - 1);
      } else if (k3_eq_k1) {
        sum += 2 * solve(k1, k2, k_new, depth - 1);
        sum += solve(k3, k1, k_new, depth - 1);
      } else {
        sum += solve(k1, k2, k_new, depth - 1);
        sum += solve(k2, k3, k_new, depth - 1);
        sum += solve(k3, k1, k_new, depth - 1);
      }
    }

    return sum;
  }

  const side_tree_sum = solve(-1, k0, k0, m);
  total_r2 += n * side_tree_sum;

  const r_center = 1 - 2 * r0;

  if (r_center > EPS) {
    const k_center = 1 / r_center;

    total_r2 += r_center * r_center;

    if (m > 1) {
      const central_tree_sum = solve(k_center, k0, k0, m - 1);
      total_r2 += n * central_tree_sum;
    }
  }

  console.log((1 - total_r2).toFixed(12));
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