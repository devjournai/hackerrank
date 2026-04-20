/**
 * How Many Reversible Numbers Are There Below One Billion?
 * Time Complexity: O(T * Length * 100)
 * Space Complexity: O(Length)
 */

const fs = require("fs");

function solve() {
  const buffer = fs.readFileSync(0);
  let bufferIdx = 0;

  function readString() {
    let start = bufferIdx;
    while (bufferIdx < buffer.length && buffer[bufferIdx] <= 32) {
      bufferIdx++;
    }
    if (bufferIdx >= buffer.length) return null;
    start = bufferIdx;
    while (bufferIdx < buffer.length && buffer[bufferIdx] > 32) {
      bufferIdx++;
    }
    return buffer.toString("utf8", start, bufferIdx);
  }

  function readStringLine() {
    let start = bufferIdx;
    while (bufferIdx < buffer.length && buffer[bufferIdx] <= 32) {
      bufferIdx++;
    }
    if (bufferIdx >= buffer.length) return null;
    start = bufferIdx;
    while (bufferIdx < buffer.length && buffer[bufferIdx] > 32) {
      bufferIdx++;
    }
    return buffer.toString("utf8", start, bufferIdx);
  }

  const TStr = readString();
  if (!TStr) return;
  const T = parseInt(TStr, 10);

  function countFullLengthFormula(k) {
    if (k % 2 === 0) {
      let res = 20n;
      const p = Math.floor(k / 2) - 1;
      if (p > 0) res *= 30n ** BigInt(p);
      return res;
    } else if (k % 4 === 3) {
      let res = 100n;
      const p = Math.floor((k - 3) / 4);
      if (p > 0) res *= 500n ** BigInt(p);
      return res;
    } else {
      return 0n;
    }
  }

  function solveRecursive(limitStr, length) {
    const limit = Array.from(limitStr).map(Number);
    const memo = new Map();

    function dp(idx, tL, cmpR, c_in_l, c_to_inner) {
      const l = idx;
      const r = length - 1 - idx;

      if (l > r) {
        if (c_in_l === c_to_inner) {
          if (!tL || cmpR <= 0) return 1n;
        }
        return 0n;
      }

      const key =
        (idx << 12) |
        (tL ? 2048 : 0) |
        ((cmpR + 1) << 9) |
        (c_in_l << 1) |
        c_to_inner;
      if (memo.has(key)) return memo.get(key);

      let count = 0n;

      if (l === r) {
        const up = tL ? limit[l] : 9;

        for (let d = 0; d <= up; d++) {
          const sum = 2 * d + c_to_inner;
          if ((sum & 1) !== 0) {
            const c_out_r = sum >= 10 ? 1 : 0;

            if (c_out_r === c_in_l) {
              let newCmpR = cmpR;
              if (d > limit[r]) newCmpR = 1;
              else if (d < limit[r]) newCmpR = -1;

              const newTL = tL && d === limit[l];
              if (!newTL || newCmpR <= 0) {
                count += 1n;
              }
            }
          }
        }
        memo.set(key, count);
        return count;
      }

      const up = tL ? limit[l] : 9;

      for (let dL = 0; dL <= up; dL++) {
        if (idx === 0 && dL === 0) continue;

        const newTL = tL && dL === limit[l];

        for (let dR = 0; dR <= 9; dR++) {
          if (idx === 0 && dR === 0) continue;

          const sumR = dR + dL + c_to_inner;
          if ((sumR & 1) === 0) continue;
          const c_out_r = sumR >= 10 ? 1 : 0;

          let newCmpR = cmpR;
          if (dR > limit[r]) newCmpR = 1;
          else if (dR < limit[r]) newCmpR = -1;

          for (let c_from_inner = 0; c_from_inner <= 1; c_from_inner++) {
            const sumL = dL + dR + c_from_inner;
            if ((sumL & 1) === 0) continue;
            const c_out_l = sumL >= 10 ? 1 : 0;

            if (c_out_l !== c_in_l) continue;

            count += dp(idx + 1, newTL, newCmpR, c_from_inner, c_out_r);
          }
        }
      }

      memo.set(key, count);
      return count;
    }

    let total = 0n;
    total += dp(0, true, 0, 0, 0);
    total += dp(0, true, 0, 1, 0);

    return total;
  }

  function decrementString(nStr) {
    let arr = Array.from(nStr).map(Number);
    let idx = arr.length - 1;
    while (idx >= 0) {
      if (arr[idx] > 0) {
        arr[idx]--;
        break;
      } else {
        arr[idx] = 9;
        idx--;
      }
    }
    if (arr[0] === 0 && arr.length > 1) {
      arr.shift();
    }
    return arr.join("");
  }

  for (let i = 0; i < T; i++) {
    const NStr = readStringLine();
    const LimitStr = decrementString(NStr);
    const len = LimitStr.length;

    let ans = 0n;

    for (let l = 1; l < len; l++) {
      ans += countFullLengthFormula(l);
    }
    ans += solveRecursive(LimitStr, len);

    console.log(ans.toString());
  }
};

if (require.main === module) {
  solve();
};