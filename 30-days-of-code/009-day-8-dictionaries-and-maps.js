function processData(input) {
    let lines = input.trim().split("\n");
    
    let n = parseInt(lines[0]);
    
    let phoneBook = new Map();
    
    for (let i = 1; i <= n; i++) {
        let [name, number] = lines[i].split(" ");
        phoneBook.set(name, number);
    }
    
    for (let i = n + 1; i < lines.length; i++) {
        let query = lines[i].trim();
        
        if (phoneBook.has(query)) {
            console.log(query + "=" + phoneBook.get(query));
        } else {
            console.log("Not found");
        }
    }
}