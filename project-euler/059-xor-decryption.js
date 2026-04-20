/**
 * XOR Decryption
 * Time Complexity: O(26^3 * N)
 * Space Complexity: O(N)
 */

function processData(input) {
    const parts = input.trim().split(/\s+/).map(Number);
    const N = parts[0];
    const arr = parts.slice(1);

    function isValidChar(code) {
        if (code === 32) return true;

        if (code >= 48 && code <= 57) return true;

        if (code >= 65 && code <= 90) return true;

        if (code >= 97 && code <= 122) return true;

        const allowed = new Set([
            33, 34, 39, 40, 41, 44, 45, 46, 58, 59, 63
        ]);

        return allowed.has(code);
    }

    for (let a = 97; a <= 122; a++) {
        for (let b = 97; b <= 122; b++) {
            for (let c = 97; c <= 122; c++) {

                const key = [a, b, c];
                let ok = true;

                for (let i = 0; i < N; i++) {
                    const keyByte = key[i % 3];
                    const decoded = arr[i] ^ keyByte;

                    if (!isValidChar(decoded)) {
                        ok = false;
                        break;
                    }
                }

                if (ok) {
                    console.log(
                        String.fromCharCode(a) +
                        String.fromCharCode(b) +
                        String.fromCharCode(c)
                    );
                    return;
                }
            }
        }
    }
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