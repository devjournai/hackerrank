interface AdvancedArithmetic {
    divisorSum(n: number): number;
}

class Calculator implements AdvancedArithmetic {
    divisorSum(n: number): number {
        let sum = 0;
        for (let i = 1; i <= n; i++) {
            if (n % i === 0) {
                sum += i;
            }
        }
        return sum;
    }
}

function main() {
    const n = parseInt(readLine());
    const myCalculator = new Calculator();
    
    const sum = myCalculator.divisorSum(n);
    
    console.log("I implemented: AdvancedArithmetic");
    console.log(sum);
}