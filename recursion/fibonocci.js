const fibs = (n) => {
    const arr = [0, 1]

    let i = 1;
    while (i < n - 1) {
        arr.push(arr[i-1] + arr[i]);
        i++;
    }
    return arr.slice(0, n);
}

const fibsRec = (n) => {
    if (n <= 0) {
        return [];
    }
    else if (n === 1) {
        return [0];
    }
    else if (n === 2) {
        return [0, 1];
    }
    // const n1 = fibsRec(n-1)
    // const n2 = fibsRec(n-2)
    const arr = fibsRec(n-1);
    arr.push(arr.slice(-2).reduce((acc,total) => acc + total));
    return arr;
}

console.log(fibs(10));
console.log(fibsRec(10));