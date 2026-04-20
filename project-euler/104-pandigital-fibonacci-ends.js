/**
 * Pandigital Fibonacci Ends
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */

function processData(input) {
    const lines = input.trim().split(/\s+/);
    if (lines.length < 3) return;
    
    const a = parseInt(lines[0], 10);
    const b = parseInt(lines[1], 10);
    const k = parseInt(lines[2], 10);

    const LIMIT = 2000000;
    
    const MOD = Math.pow(10, k);
    
    const HEAD_LIMIT = 1e15; 
    const MIN_VAL = Math.pow(10, k - 1);

    let t1 = a % MOD;
    let t2 = b % MOD;
    
    let h1 = a;
    let h2 = b;
    
    function isPandigital(s) {
        if (s.length !== k) return false;
        let mask = 0;
        for (let i = 0; i < k; i++) {
            const d = s.charCodeAt(i) - 48;
            if (d < 1 || d > k) return false; 
            const bit = 1 << d;
            if ((mask & bit) !== 0) return false; 
            mask |= bit;
        }
        return true;
    }

    function checkManual(val) {
        if (val < MIN_VAL) return false;
        const s = String(val);
        return isPandigital(s.substring(0, k)) && 
               isPandigital(s.substring(s.length - k));
    }

    if (checkManual(a)) { console.log(1); return; }
    if (checkManual(b)) { console.log(2); return; }

    for (let n = 3; n <= LIMIT; n++) {
        let t_next = t1 + t2;
        if (t_next >= MOD) t_next -= MOD;
        t1 = t2;
        t2 = t_next;

        let h_next = h1 + h2;
        if (h_next > HEAD_LIMIT) {
            h1 /= 10;
            h2 /= 10;
            h_next /= 10;
        }
        h1 = h2;
        h2 = h_next;

        if (h2 < MIN_VAL) continue;
        const sTail = String(t2);
        
        if (sTail.length === k && isPandigital(sTail)) {
            const sHead = String(Math.floor(h2)).substring(0, k);
            
            if (isPandigital(sHead)) {
                console.log(n);
                return;
            }
        }
    }

    console.log("no solution");
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