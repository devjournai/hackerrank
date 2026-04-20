class Student extends Person {
    constructor(firstName, lastName, idNumber, scores) {
        super(firstName, lastName, idNumber);
        this.scores = scores;
    }
    
    calculate() {
        let sum = 0;

        for (let score of this.scores) {
            sum += score;
        }

        let avg = sum / this.scores.length;

        if (avg >= 90) return "O";
        if (avg >= 80) return "E";
        if (avg >= 70) return "A";
        if (avg >= 55) return "P";
        if (avg >= 40) return "D";
        return "T";
    }
}