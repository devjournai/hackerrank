'use strict';

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', function(inputStdin) {
    inputString += inputStdin;
});

process.stdin.on('end', function() {
    inputString = inputString.split('\n');

    main();
});

function readLine() {
    return inputString[currentLine++];
}



/*
 * Complete the 'computeMaxRectangleAreaWithOneRemoval' function below.
 *
 * The function is expected to return a LONG_INTEGER.
 * The function accepts INTEGER_ARRAY heights as parameter.
 */

function computeMaxRectangleAreaWithOneRemoval(heights) {
    const n = heights.length;
    if (n === 0) return 0;
    if (n === 1) return heights[0];

    const L = new Array(n).fill(-1);
    const R = new Array(n).fill(n);
    const LL = new Array(n).fill(-1);
    const RR = new Array(n).fill(n);

    let st = [];
    for (let i = 0; i < n; i++) {
        while (st.length && heights[st[st.length - 1]] >= heights[i]) {
            st.pop();
        }
        L[i] = st.length ? st[st.length - 1] : -1;
        st.push(i);
    }

    st = [];
    for (let i = n - 1; i >= 0; i--) {
        while (st.length && heights[st[st.length - 1]] >= heights[i]) {
            st.pop();
        }
        R[i] = st.length ? st[st.length - 1] : n;
        st.push(i);
    }

    for (let i = 0; i < n; i++) {
        if (L[i] !== -1) LL[i] = L[L[i]];
        if (R[i] !== n) RR[i] = R[R[i]];
    }

    let best = 0n;

    for (let i = 0; i < n; i++) {
        const h = BigInt(heights[i]);

        let w = BigInt(R[i] - L[i] - 1);
        best = best > h * w ? best : h * w;

        if (L[i] !== -1) {
            let left = LL[i];
            let right = R[i];
            let width = right - left - 2;
            if (width > 0) {
                best = best > h * BigInt(width) ? best : h * BigInt(width);
            }
        }

        if (R[i] !== n) {
            let left = L[i];
            let right = RR[i];
            let width = right - left - 2;
            if (width > 0) {
                best = best > h * BigInt(width) ? best : h * BigInt(width);
            }
        }
    }

    return best.toString();
}

function main() {
    const heightsCount = parseInt(readLine().trim(), 10);

    let heights = [];

    for (let i = 0; i < heightsCount; i++) {
        const heightsItem = parseInt(readLine().trim(), 10);
        heights.push(heightsItem);
    }

    const result = computeMaxRectangleAreaWithOneRemoval(heights);

    process.stdout.write(result + '\n');
}
