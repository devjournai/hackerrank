class Difference {
    private elements: number[];
    public maximumDifference: number;

    constructor(elements: number[]) {
        this.elements = elements;
        this.maximumDifference = 0;
    }

    computeDifference(): void {
        let minVal = Math.min(...this.elements);
        let maxVal = Math.max(...this.elements);

        this.maximumDifference = maxVal - minVal;
    }
}

function main() {
    const n: number = parseInt(readLine().trim());
    const a: number[] = readLine().trim().split(" ").map(Number);

    const d = new Difference(a);

    d.computeDifference();

    console.log(d.maximumDifference);
}