const Node = (value) => {
    let data = value;
    let next = null;

    return { data, next };
}

const LinkedList = () => {
    let head = null, size = 0;

    const getHead = () => head;

    const getSize = () => size;

    const getTail = () => {
        let currNode = head;
        while (currNode.next) {
            currNode = currNode.next;
        }
        return currNode;
    }

    const append = (data) => {
        if (!size) {
            head = Node(data);
            tail = head;
        }
        else {
            let currNode = head;
            while (currNode.next) {
                currNode = currNode.next;
            }
            currNode.next = Node(data);
        }
        size++;
    }

    const prepend = (data) => {
        if (!size) {
            head = Node(data);
            tail = head;
        }
        else {
            const newNode = Node(data);
            newNode.next = head;
            head = newNode;
        }
        size++;
    }

    const at = (index) => {
        if (index < 0 || parseInt(index) != parseFloat(index)){
            return null;
        }
        let currNode = head;
        for (let i=0; i<=index && currNode; i++) {
            currNode = currNode.next;
        }
        return currNode;
    }

    const pop = () => {
        let currNode = head;
        if (currNode === null) {
            return;
        }
        if (currNode.next === null) {
            head = null;
            size --;
        }
        while (currNode.next.next) {
            currNode = currNode.next;
        }
        currNode.next = null;
        size --;
    }

    const find  = (data) => {
        let currNode = head;
        let index = 0;
        while (currNode) {
            if (currNode.data === data) {
                return index;
            }
            else {
                currNode = currNode.next;
                index++;
            }
        }
        return null;
    }

    const contains = (data) => {
        return find(data) != null;
    }

    const toString = () => {
        let currNode = head;
        if (!currNode) {
            console.log('null');
            return ;
        }
        let output = ''
        while (currNode) {
            output += `( ${currNode.data} ) ->`
            currNode = currNode.next;
        }
        output += ' null'
        console.log(output);
        return ;
    }

    return { getHead, getTail, getSize, append, prepend, at, pop, find, contains, toString }
}

const list = LinkedList();

list.append("dog");
list.append("cat");
list.append("parrot");
list.append("hamster");
list.append("snake");
list.append("turtle");

list.toString();
list.pop();

list.toString();