function printArray<T>(array: T[]): void {
    for (const element of array) {
        console.log(element);
    }
}

function main() {
    const nLine = readLine();
    if (!nLine) return;
    const n = parseInt(nLine.trim());
    
    const intArray: number[] = [];
    for (let i = 0; i < n; i++) {
        intArray.push(parseInt(readLine().trim()));
    }

    const mLine = readLine();
    if (!mLine) return;
    const m = parseInt(mLine.trim());
    
    const stringArray: string[] = [];
    for (let i = 0; i < m; i++) {
        stringArray.push(readLine().trim());
    }

    printArray(intArray);
    printArray(stringArray);
}