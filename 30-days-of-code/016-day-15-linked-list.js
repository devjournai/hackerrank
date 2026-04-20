function Solution(){
	 this.insert = function(head, data) {
        let newNode = new Node(data);

        if (head === null) {
            return newNode;
        }

        let current = head;
        while (current.next !== null) {
            current = current.next;
        }

        current.next = newNode;

        return head;
    };

	this.display=function(head){
        var start=head;
            while(start){
                process.stdout.write(start.data+" ");
                start=start.next;
            }
    };
}