function processData(input) {
    const lines = input.trim().split('\n');
    const n = parseInt(lines[0]);
    
    const X = lines[1].trim().split(/\s+/).map(Number);
    const Y = lines[2].trim().split(/\s+/).map(Number);

    const getRanks = (arr) => {
        const sortedPairs = arr.map((val, index) => ({ val, index }))
                               .sort((a, b) => a.val - b.val);
        
        const ranks = new Array(arr.length);
        
        for (let i = 0; i < sortedPairs.length; i++) {
            ranks[sortedPairs[i].index] = i + 1;
        }
        
        return ranks;
    };

    const rankX = getRanks(X);
    const rankY = getRanks(Y);

    let sumDSquared = 0;
    for (let i = 0; i < n; i++) {
        const difference = rankX[i] - rankY[i];
        sumDSquared += difference * difference;
    }

    const numerator = 6 * sumDSquared;
    const denominator = n * ((n * n) - 1);
    const spearmanRankCorrelation = 1 - (numerator / denominator);

    console.log(spearmanRankCorrelation.toFixed(3));
}