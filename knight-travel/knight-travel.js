/* Knight Recursion Trial  

const knightTravel = (start, end, MEM=getNdimArray(8), pathName='') => {
    let i = start[0], j = start[1];
    MEM[i][j] = 1;
    // console.log(pathName, MEM);

    if (start[0] === end[0] && start[1] === end[1]) {
        return [end];
    }
    
    let paths = []
    if ((i-2>=0 && i-2<8) && (j-1>=0 && j-1<8) && MEM[i-2][j-1] === 0) {paths[0] = knightTravel([i-2, j-1],end, MEM.map(r => r.slice()).slice(),pathName="0");}
    if ((i-1>=0 && i-1<8) && (j-2>=0 && j-2<8) && MEM[i-1][j-2] === 0) {paths[1] = knightTravel([i-1, j-2],end, MEM.map(r => r.slice()).slice(),pathName="1");}
    if ((i+1>=0 && i+1<8) && (j-2>=0 && j-2<8) && MEM[i+1][j-2] === 0) {paths[2] = knightTravel([i+1, j-2],end, MEM.map(r => r.slice()).slice(),pathName="2");}
    if ((i+2>=0 && i+2<8) && (j-1>=0 && j-1<8) && MEM[i+2][j-1] === 0) {paths[3] = knightTravel([i+2, j-1],end, MEM.map(r => r.slice()).slice(),pathName="3");}
    if ((i+2>=0 && i+2<8) && (j+1>=0 && j+1<8) && MEM[i+2][j+1] === 0) {paths[4] = knightTravel([i+2, j+1],end, MEM.map(r => r.slice()).slice(),pathName="4");}
    if ((i+1>=0 && i+1<8) && (j+2>=0 && j+2<8) && MEM[i+1][j+2] === 0) {paths[5] = knightTravel([i+1, j+2],end, MEM.map(r => r.slice()).slice(),pathName="5");}
    if ((i-1>=0 && i-1<8) && (j+2>=0 && j+2<8) && MEM[i-1][j+2] === 0) {paths[6] = knightTravel([i-1, j+2],end, MEM.map(r => r.slice()).slice(),pathName="6");}
    if ((i-2>=0 && i-2<8) && (j+1>=0 && j+1<8) && MEM[i-2][j+1] === 0) {paths[7] = knightTravel([i-2, j+1],end, MEM.map(r => r.slice()).slice(),pathName="7");}

    let minLength = 1000;
    let minPath = null;
    for (let i=0; i<8; i++) {
        if (paths[i] && paths[i].length < minLength) {
            // console.log(paths[i].length, pathName);
            minLength = paths[i].length;
            minPath = paths[i];
        }
    }
    
    
    if (!minPath) {
        return false;
    }
    else {
        return [start, ...minPath];
    }

}
*/

const getNdimArray = (dim, value=0) => {
    let array = [];

    for (let i=0; i<dim; i++) {
        const arr = [];
        for (let j=0; j<dim; j++){
            arr.push(value);
        }
        array.push(arr);
    }

    return array
}

const Node = ([i, j]) => {
    let pos = [i, j];
    let children = [0, 0, 0, 0, 0, 0, 0, 0];
    let parent = null;
    return {pos, children, parent}
}

const knightMove = (start, end) => {
    const queue = [Node(start)];

    let result = null;
    const MEM = getNdimArray(8);
    while (queue.length) {
        const node = queue[0];
        const [i, j] = node.pos;
        if (i === end[0] && j === end[1]) {
            result = node;
            break;
        }
        MEM[i][j] = 1;
        if ((i-2>=0 && i-2<8) && (j-1>=0 && j-1<8) && MEM[i-2][j-1] === 0) {node.children[0] = Node([i-2, j-1]); node.children[0].parent = node; queue.push(node.children[0]); }
        if ((i-1>=0 && i-1<8) && (j-2>=0 && j-2<8) && MEM[i-1][j-2] === 0) {node.children[1] = Node([i-1, j-2]); node.children[1].parent = node; queue.push(node.children[1]); }
        if ((i+1>=0 && i+1<8) && (j-2>=0 && j-2<8) && MEM[i+1][j-2] === 0) {node.children[2] = Node([i+1, j-2]); node.children[2].parent = node; queue.push(node.children[2]); }
        if ((i+2>=0 && i+2<8) && (j-1>=0 && j-1<8) && MEM[i+2][j-1] === 0) {node.children[3] = Node([i+2, j-1]); node.children[3].parent = node; queue.push(node.children[3]); }
        if ((i+2>=0 && i+2<8) && (j+1>=0 && j+1<8) && MEM[i+2][j+1] === 0) {node.children[4] = Node([i+2, j+1]); node.children[4].parent = node; queue.push(node.children[4]); }
        if ((i+1>=0 && i+1<8) && (j+2>=0 && j+2<8) && MEM[i+1][j+2] === 0) {node.children[5] = Node([i+1, j+2]); node.children[5].parent = node; queue.push(node.children[5]); }
        if ((i-1>=0 && i-1<8) && (j+2>=0 && j+2<8) && MEM[i-1][j+2] === 0) {node.children[6] = Node([i-1, j+2]); node.children[6].parent = node; queue.push(node.children[6]); }
        if ((i-2>=0 && i-2<8) && (j+1>=0 && j+1<8) && MEM[i-2][j+1] === 0) {node.children[7] = Node([i-2, j+1]); node.children[7].parent = node; queue.push(node.children[7]); }

        queue.splice(0, 1);
    }

    let currNode = result;
    let arr = []
    while(currNode) {
        arr.push(currNode.pos);
        currNode = currNode.parent;
    }
    arr.reverse();
    return arr
}

const start = [3, 3];
const end = [0, 0];

const ans = knightMove(start, end);

console.log(ans.length, ans);