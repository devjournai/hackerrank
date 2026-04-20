/**
 * Roman Numerals
 * Time Complexity: O(L)
 * Space Complexity: O(1)
 */

function processData(input) {
    const lines = input.trim().split('\n');
    const T = parseInt(lines[0], 10);

    const value = {
        I: 1, V: 5, X: 10, L: 50,
        C: 100, D: 500, M: 1000
    };

    function romanToInt(s) {
        let total = 0;
        for (let i = 0; i < s.length; i++) {
            const cur = value[s[i]];
            const next = value[s[i + 1]] || 0;
            if (cur < next) total -= cur;
            else total += cur;
        }
        return total;
    }

    function intToRoman(num) {
        const map = [
            [1000, "M"],
            [900, "CM"],
            [500, "D"],
            [400, "CD"],
            [100, "C"],
            [90, "XC"],
            [50, "L"],
            [40, "XL"],
            [10, "X"],
            [9, "IX"],
            [5, "V"],
            [4, "IV"],
            [1, "I"]
        ];

        let res = "";
        for (const [val, sym] of map) {
            while (num >= val) {
                res += sym;
                num -= val;
            }
        }
        return res;
    }

    let output = [];

    for (let i = 1; i <= T; i++) {
        const roman = lines[i].trim();
        const num = romanToInt(roman);
        output.push(intToRoman(num));
    }

    console.log(output.join("\n"));
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