/**
 * Sudoku
 * Time Complexity: O(9^(empty))  (backtracking with pruning, worst-case)
 * Space Complexity: O(81)
 */

function processData(input) {
  const lines = input.trim().split(/\s+/);
  const grid = Array.from({ length: 9 }, (_, i) =>
    lines[i].split("").map(x => Number(x))
  );

  const rows = Array.from({ length: 9 }, () => new Set());
  const cols = Array.from({ length: 9 }, () => new Set());
  const boxes = Array.from({ length: 9 }, () => new Set());

  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      const v = grid[r][c];
      if (v !== 0) {
        rows[r].add(v);
        cols[c].add(v);
        boxes[(r / 3 | 0) * 3 + (c / 3 | 0)].add(v);
      }
    }
  }

  function solve(r, c) {
    if (r === 9) return true;
    if (c === 9) return solve(r + 1, 0);
    if (grid[r][c] !== 0) return solve(r, c + 1);

    const b = (r / 3 | 0) * 3 + (c / 3 | 0);

    for (let d = 1; d <= 9; d++) {
      if (!rows[r].has(d) && !cols[c].has(d) && !boxes[b].has(d)) {
        grid[r][c] = d;
        rows[r].add(d);
        cols[c].add(d);
        boxes[b].add(d);

        if (solve(r, c + 1)) return true;

        grid[r][c] = 0;
        rows[r].delete(d);
        cols[c].delete(d);
        boxes[b].delete(d);
      }
    }
    return false;
  }

  solve(0, 0);

  let out = "";
  for (let i = 0; i < 9; i++) {
    out += grid[i].join("") + "\n";
  }
  console.log(out.trim());
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