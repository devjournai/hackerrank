function main() {
    const S = readLine();
    
    try {
        let ans = JSON.parse(S);
        console.log(ans);
    } catch (e) {
        console.log("Bad String");
    }
}