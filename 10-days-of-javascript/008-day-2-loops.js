function vowelsAndConsonants(s) {
    const vowels = 'aeiou';
    
    for (let char of s) {
        if (vowels.includes(char)) {
            console.log(char);
        }
    }
    
    for (let char of s) {
        if (!vowels.includes(char)) {
            console.log(char);
        }
    }
}