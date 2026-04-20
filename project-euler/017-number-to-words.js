/**
 * Number to Words
 * Time Complexity: O(d)
 * Space Complexity: O(1)
 */

function processData(input) {
    const lines = input.trim().split(/\s+/);
    let t = parseInt(lines[0]);
    let idx = 1;

    const belowTwenty = [
        "Zero", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine",
        "Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen",
        "Sixteen", "Seventeen", "Eighteen", "Nineteen"
    ];

    const tens = [
        "", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"
    ];

    const thousands = [
        "", "Thousand", "Million", "Billion", "Trillion"
    ];

    function threeDigitToWords(num) {
        let result = [];

        let hundred = Math.floor(num / 100);
        let rest = num % 100;

        if (hundred > 0) {
            result.push(belowTwenty[hundred]);
            result.push("Hundred");
        }

        if (rest > 0) {
            if (rest < 20) {
                result.push(belowTwenty[rest]);
            } else {
                let ten = Math.floor(rest / 10);
                let unit = rest % 10;

                result.push(tens[ten]);
                if (unit > 0) {
                    result.push(belowTwenty[unit]);
                }
            }
        }

        return result.join(" ");
    }

    function numberToWords(n) {
        if (n === 0) return "Zero";

        let words = [];
        let i = 0;

        while (n > 0) {
            let part = n % 1000;
            if (part !== 0) {
                let segment = threeDigitToWords(part);
                if (thousands[i] !== "") {
                    segment += " " + thousands[i];
                }
                words.unshift(segment);
            }
            n = Math.floor(n / 1000);
            i++;
        }

        return words.join(" ");
    }

    let outputs = [];

    while (t--) {
        let n = Number(lines[idx++]);
        outputs.push(numberToWords(n));
    }

    console.log(outputs.join("\n"));
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