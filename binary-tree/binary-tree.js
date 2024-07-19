const Node = (data) => {
    let left = null;
    let right = null;

    return { data, left, right }
}

const Tree = (array) => {
    let root = null;

    const getRoot = () => root;
    const setRoot = (node) => {root = node}

    const insert = (value) => {
        if(!root) {
            return Node(value);
        }

        let currNode = root;
        while (currNode) {
            if (currNode.data > value) {
                if (currNode.left) {
                    currNode = currNode.left;
                }
                else {
                    currNode.left = Node(value);
                    return root;
                }
            }
            else if (currNode.data < value) {
                if (currNode.right) {
                    currNode = currNode.right;
                }
                else {
                    currNode.right = Node(value);
                    return root;
                }
            }
            else {
                return root;
            }
        }
    }

    /* DELETE ITEM RECURSIVE
    const deleteItem = (root = getRoot(), value) => {
        if(!root) {
            return null;
        }

        let left = root.left;
        let right = root.right;

        if (root.data > value) {
            root.left = deleteItem(left, value);
        }
        else if (root.data < value) {
            root.right = deleteItem(right, value);
        }
        else {
            if (left === null && right === null) {
                root = null;
                return root;
            }
            else if (left === null) {
                root = right;
                return root;
            }
            else if (right === null) {
                root = left;
                return root;
            }
            else {
                const temp = root.data;
                root.data = right.data;
                right.data = temp;
                root.right = deleteItem(right, value);
            }
        }
        
        return root;
    }
    */

    const deleteItem = (value) => {
        if(!root) {
            return false;
        }

        let currentNode = root;
        while (currentNode) {
            if (currentNode.data > value) {
                currentNode = currentNode.left;
            }
            else if (currentNode.data < value) {
                currentNode = currentNode.right;
            }
            else {
                if (currentNode.left === null && currentNode.right === null) {
                    const removedNode = currentNode;
                    currentNode = null;
                    return removedNode;
                }
                else if (currentNode.left === null) {
                    const removedNode = currentNode.right;
                    currentNode = currentNode.right;
                    return removedNode;
                }
                else if (currentNode.right === null) {
                    const removedNode = currentNode.left;
                    currentNode = currentNode.left;
                    return removedNode;
                }
                else {
                    const temp = currentNode.data;
                    currentNode.data = currentNode.right.data;
                    currentNode.right.data = temp;
                    currentNode = currentNode.right;
                }
            }
        }
        return false;
    }

    const find = (value) => {
        let currentNode = root;
        while (currentNode) {
            if (currentNode.data > value) {
                currentNode = currentNode.left;
            }
            else if (currentNode.data < value) {
                currentNode = currentNode.right;
            }
            else {
                return currentNode;
            }
        }
        return false;
    }

    const height = (node) => {
        if (!node) {
            return 0;
        }

        return Math.max(height(node.left), height(node.right), 0) + 1;
    }

    const depth = (node) => {
        let currentNode = root;

        let depth = 0;
        while (currentNode) {
            if (currentNode.data > node.data) {
                currentNode = currentNode.left;
            }
            else if (currentNode.data < node.data) {
                currentNode = currentNode.right;
            }
            else {
                return depth;
            }
            depth++;
        }
        return null;
    }

    const isBalanced = () => {
        if (!root) {
            return true;
        }

        const lHeight = height(root.left);
        const rHeight = height(root.right);

        if (Math.abs(lHeight - rHeight) <= 1) {
            return isBalanced(root.left) && isBalanced(root.right);
        }
        else {
            return false;
        }
    }

    const levelOrder = (cb) => {
        if(!root) {
            return null;
        }
        const currentNode = root;

        const arr = [currentNode]
        for (let i=0; i<arr.length; i++) {
            if (arr[i].left) {
                arr.push(arr[i].left);
                if (cb) {
                    cb(arr[i].left);
                }
            }
            if (arr[i].right) {
                arr.push(arr[i].right);
                if (cb) {
                    cb(arr[i].right);
                }
            }
        }
        if (!cb) {
            return arr.map(el => el.data);
        }
    }

    const inOrder = (root= getRoot(), cb = []) => {
        if (!root) {
            return null;
        }
        inOrder(root.left, cb);
        if (Array.isArray(cb)) {
            cb.push(root.data);
        }
        else {
            cb(root);
        }
        inOrder(root.right, cb);

        if (Array.isArray(cb)){
            return cb;
        }
    }

    const preOrder = (root= getRoot(), cb = []) => {
        if (!root) {
            return null;
        }
        if (Array.isArray(cb)) {
            cb.push(root.data);
        }
        else {
            cb(root);
        }
        preOrder(root.left, cb);
        preOrder(root.right, cb);

        if (Array.isArray(cb)){
            return cb;
        }
    }

    const postOrder = (root= getRoot(), cb = []) => {
        if (!root) {
            return null;
        }
        postOrder(root.left, cb);
        postOrder(root.right, cb);
        if (Array.isArray(cb)) {
            cb.push(root.data);
        }
        else {
            cb(root);
        }

        if (Array.isArray(cb)){
            return cb;
        }
    }

    const rebalance = () => {
        // somehow rebalance
        const array = inOrder();
        root = buildTree(array);
    }

    const buildTree = (array) => {
        if (array.length <= 0 || !array) {
            return null;
        }
        else if (array.length === 1) {
            return Node(array[0]);
        }

        // Prepare array
        array = [...new Set(array)];
        array.sort();

        const mid = Math.floor(array.length/2);
        let root = Node(array[mid]);
        root.left = buildTree(array.slice(0, mid));
        root.right = buildTree(array.slice(mid+1, array.length));
        return root;
    }

    root = buildTree(array);

    return { getRoot, prettyPrint, insert, deleteItem, find, height, depth, isBalanced, levelOrder, preOrder, postOrder, inOrder, rebalance }
}

const prettyPrint = (node, prefix = "", isLeft = true) => {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
};

const getRandomArray = (n) => {
    const array = [];
    for (let index = 0; index < n; index++) {
        array.push(Math.floor(Math.random()*n));
    }
    return array;
}


const arr = getRandomArray(10)
console.log(arr);
let tree = Tree(arr);
prettyPrint(tree.getRoot());

for (const val of getRandomArray(20)) {
    tree.insert(val);
}
prettyPrint(tree.getRoot());

console.log(tree.isBalanced());

tree.rebalance();

prettyPrint(tree.getRoot());