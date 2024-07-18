const mergeSort = (array) => {
    if (array.length <= 1) {
        return array;
    }

    const left  = mergeSort(array.slice(0, array.length/2));
    const right = mergeSort(array.slice(array.length/2));

    const newArr = [];
    let i = 0, j = 0;
    while (i < left.length && j < right.length) {
        if (left[i] < right[j]) {
            newArr.push(left[i]);
            i++;
        }
        else {
            newArr.push(right[j]);
            j++;
        }
    }
    while (i < left.length) {
        newArr.push(left[i]);
        i++;
    }
    while (j < right.length) {
        newArr.push(right[j]);
        j++;
    }

    return newArr;
}

const arr = [105, 79, 100, 110]
console.log(mergeSort(arr));