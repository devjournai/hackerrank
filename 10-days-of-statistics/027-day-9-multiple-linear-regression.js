function processData(input) {
    let data = input.trim().split("\n");

    let [m, n] = data[0].trim().split(" ").map(Number);

    let X = [];
    let y = [];

    for (let i = 1; i <= n; i++) {
        let row = data[i].trim().split(" ").map(Number);
        y.push([row.pop()]);
        X.push([1, ...row]);
    }

    let q = Number(data[n + 1]);

    let Xtest = [];
    for (let i = n + 2; i < n + 2 + q; i++) {
        let row = data[i].trim().split(" ").map(Number);
        Xtest.push([1, ...row]);
    }

    function transpose(A) {
        return A[0].map((_, i) => A.map(row => row[i]));
    }

    function multiply(A, B) {
        let result = Array(A.length).fill(0).map(() =>
            Array(B[0].length).fill(0)
        );

        for (let i = 0; i < A.length; i++) {
            for (let j = 0; j < B[0].length; j++) {
                for (let k = 0; k < B.length; k++) {
                    result[i][j] += A[i][k] * B[k][j];
                }
            }
        }
        return result;
    }

    function inverse(matrix) {
        let n = matrix.length;

        let I = Array(n).fill(0).map((_, i) =>
            Array(n).fill(0).map((_, j) => (i === j ? 1 : 0))
        );

        for (let i = 0; i < n; i++) {
            matrix[i] = matrix[i].concat(I[i]);
        }

        for (let i = 0; i < n; i++) {
            let diag = matrix[i][i];

            for (let j = 0; j < 2 * n; j++) {
                matrix[i][j] /= diag;
            }

            for (let k = 0; k < n; k++) {
                if (k !== i) {
                    let factor = matrix[k][i];
                    for (let j = 0; j < 2 * n; j++) {
                        matrix[k][j] -= factor * matrix[i][j];
                    }
                }
            }
        }

        return matrix.map(row => row.slice(n));
    }

    let Xt = transpose(X);
    let XtX = multiply(Xt, X);
    let XtX_inv = inverse(XtX);

    let XtY = multiply(Xt, y);

    let beta = multiply(XtX_inv, XtY);

    let predictions = multiply(Xtest, beta);

    predictions.forEach(p => {
        console.log(p[0].toFixed(2));
    });
}