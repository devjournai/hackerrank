function processData(input) {
    const lines = input.trim().split('\n');
    const t = parseInt(lines[0], 10);

    for (let i = 1; i <= t; i++) {
        let evenChars = '';
        let oddChars = '';

        for (let j = 0; j < lines[i].length; j++) {
            if (j % 2 === 0) {
                evenChars += lines[i][j];
            } else {
                oddChars += lines[i][j];
            }
        }

        console.log(evenChars + ' ' + oddChars);
    }
}