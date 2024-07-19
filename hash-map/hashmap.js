const Node = (index, value) => {
    let key = index;
    let data = value;
    let next = null;

    return { key, data, next };
}

const LinkedList = () => {
    let head = null, size = 0;

    const getHead = () => head;

    const getSize = () => size;

    const appendOrUpdate = (key, data) => {
        if (!size) {
            head = Node(key, data);
            size++;
            return 1;
        }
        else {
            let currNode = head;
            while (currNode.next) {
                if (currNode.key === key) {
                    currNode.data = data;
                    return 0;
                }
                currNode = currNode.next;
            }
            currNode.next = Node(key, data);
            size++;
            return 1;
        }
    }

    const remove = (key) => {
        let currNode = head;
        if (!currNode) {
            return false;
        }
        else {
            if (currNode.key === key) {
                head = null;
                size--;
                return true;
            }
            while (currNode.next) {
                if (currNode.next.key === key) {
                    currNode.next = currNode.next.next;
                    size--;
                    return true;
                }
            }
        }
        return false;
    }

    const find  = (key) => {
        let currNode = head;
        let index = 0;
        while (currNode) {
            if (currNode.key === key) {
                return currNode.data;
            }
            else {
                currNode = currNode.next;
                index++;
            }
        }
        return null;
    }

    const toString = () => {
        let currNode = head;
        if (!currNode) {
            return 'null';
        }
        let output = ''
        while (currNode) {
            output += `( ${currNode.key}: ${currNode.data} ) -> `
            currNode = currNode.next;
        }
        output += 'null'
        return output;
    }

    return { getHead, getSize, appendOrUpdate, remove, find, toString }
}

const HashMap = () => {
    let bucketSize = 16;
    let loadFactor = 0.75;
    let size = 0;
    let array = [];

    const hash = (key)  => {
        let hashCode = 0;
      
        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
            hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % bucketSize;
        }

        return hashCode;
    }

    const length = () => size;

    const set = (key, value) => {
        const hashIndex = hash(key);
        const node = Node(key, value);

        if(!array[hashIndex]) {
            array[hashIndex] = LinkedList();
        };
        size += array[hashIndex].appendOrUpdate(key, value);

        grow();
    }

    const clear = () => {
        array = [];
        size = 0;
        bucketSize = 16;
        loadFactor = 0.75;
    }

    const get = (key) => {
        const hashIndex = hash(key);
        return array[hashIndex].find(key);
    }

    const has = (key) => {
        const hashIndex = hash(key);
        return array[hashIndex].find(key) != null;
    }

    const remove = (key) => {
        const hashIndex = hash(key);
        return array[hashIndex].find(key) != null;
    }

    const entries = () => {
        const result = []
        for (const elem of array) {
            while (elem) {
                result.push([elem.key, elem.data]);
            }
        }
        return result;
    }

    const keys = () => {
        const result = entries();
        return result.map(elem => elem[0]);
    }

    const values = () => {
        const result = entries();
        return result.map(elem => elem[1]);
    }

    const grow = () => {
        if (length() > bucketSize * loadFactor) {
            const newBucketSize = bucketSize * 2;
            const hashData = entries();
            clear();
            bucketSize = newBucketSize;
            for (const el of hashData) {
                set(elem.key, elem.value);
            }
        }
    }

    const toString = () => {
        for (let i=0; i<array.length; i++) {
            if (array[i]) {
                console.log(i, array[i].toString());
            }
            else {
                console.log(i, null);
            }
        }
    }

    return { length, set, get, has, remove, keys, values, toString }
}

const test = HashMap();

test.set('apple', 'red')
test.set('banana', 'yellow')
test.set('carrot', 'orange')
test.set('dog', 'brown')
test.set('elephant', 'gray')
test.set('frog', 'green')
test.set('grape', 'purple')
test.set('hat', 'black')
test.set('ice cream', 'white')
test.set('jacket', 'blue')
test.set('kite', 'pink')
test.set('lion', 'golden')

test.toString();