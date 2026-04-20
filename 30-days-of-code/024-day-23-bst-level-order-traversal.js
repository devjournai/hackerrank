this.removeDuplicates = function(head) {
    if (head === null) return head;

    let current = head;

    while (current.next !== null) {
        if (current.data === current.next.data) {
            current.next = current.next.next; // skip duplicate
        } else {
            current = current.next;
        }
    }

    return head;
};
