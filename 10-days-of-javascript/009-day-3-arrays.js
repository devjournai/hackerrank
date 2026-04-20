function getSecondLargest(nums) {
    let uniqueNums = [...new Set(nums)];
    
    uniqueNums.sort((a, b) => b - a);
    
    return uniqueNums[1];
}