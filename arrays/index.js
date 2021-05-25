function ArrayWithMissingElements() {
    const a = [];
    console.log(a);
    a[3] = 5;
    for (const el of a) {
        console.log(el);
    }
    console.log(a);
}

function InitializeArray() {
    const a = Array(16);
    console.log(a);
}

function AddArrayToObject() {
    const obj = [] + {};
    console.log(obj);
}

function AddObjectToArray() {
    const obj = {} + [];
    console.log(obj);
}

function DeleteRemainingElements() {
    const a = [5, 7, 9, 11, 13, 15, 17];
    a.splice(3);
    console.log(a);
}

function DeleteUndefinedElement() {
    a = [];
    a[3] = 100;
    a[5] = 200;
    console.log(a);
    // u u u 100 u 200
    // 0 1 2 3   4 5
    a.splice(0, 3);
    a.splice(1, 1);
    console.log(a);
}

function DeleteOneElement() {
    const a = [5, 7, 9, 11, 13, 15, 17];
    a.splice(3, 1);
    console.log(a);
}

function Slice() {
    const a = [5, 7, 9, 11, 13, 15, 17];
    console.log(a);
    const b = a.slice(undefined, 3);
    console.log(b);
    const c = a.slice(2, 10);
    console.log(c);
    a[0] = 100;
    console.log(a); // Slice copies
    console.log(b);
}

const functions = [ArrayWithMissingElements, InitializeArray, AddArrayToObject, AddObjectToArray, DeleteRemainingElements, DeleteUndefinedElement, DeleteOneElement, Slice];
functions.forEach(f => {
    console.log('--- ' + f.name);
    f();
})
