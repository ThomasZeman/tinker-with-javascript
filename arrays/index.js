'use strict';

function arrayWithMissingElements() {
    const a = [];
    console.log(a);
    a[3] = 5;
    for (const el of a) {
        console.log(el);
    }
    console.log(a);
}

function initializeArray() {
    const a = Array(16);
    console.log(a);
}

function addArrayToObject() {
    const obj = [] + {};
    console.log(obj);
}

function addObjectToArray() {
    const obj = {} + [];
    console.log(obj);
}

function deleteRemainingElements() {
    const a = [5, 7, 9, 11, 13, 15, 17];
    a.splice(3);
    console.log(a);
}

function deleteUndefinedElement() {
    let a = [];
    a[3] = 100;
    a[5] = 200;
    console.log(a);
    // u u u 100 u 200
    // 0 1 2 3   4 5
    a.splice(0, 3);
    a.splice(1, 1);
    console.log(a);
}

function deleteOneElement() {
    const a = [5, 7, 9, 11, 13, 15, 17];
    a.splice(3, 1);
    console.log(a);
}

function slice() {
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

// triple dot ... on the "sending end" -> "fan out values"
function spread() {
    const a = [5, 7, 9, 11, 13, 15, 17];
    console.log(...a);
    spreadCallee(...a);
    spreadCallee2(...a);
    const b = [0, ...a, 100];
    console.log(b);
}

function spreadCallee(a, b, c, d, e, f, g, h, i, j, k, l, m, n) {
    console.log(a, b, c, d, e, f, g, h, i, j, k, l, m, n);
}

function spreadCallee2(p) {
    console.log(p);
}

function destruct() {
    const a = [5, 7, 9, 11, 13, 15, 17];
    const [x, y, , , , z] = a; // sparse destructing
    console.log(x, y, z);
}

function destructWithDefault() {
    const a = [2, 3];
    const [x, y, z = 100] = a;
    console.log(x, y, z);
}

// triple dot on the "receiving end" -> get the "rest"
function destructWithRest() {
    const a = [5, 7, 9, 11, 13, 15, 17];
    const [x, ...y] = a;
    console.log(y);
}

function destructString() {
    const a = 'Hello World';
    const b = [...a];
    console.log(b);
}

const functions = [arrayWithMissingElements, initializeArray, addArrayToObject, addObjectToArray, deleteRemainingElements, deleteUndefinedElement, deleteOneElement, slice, spread, destruct, destructWithDefault, destructWithRest, destructString];
functions.forEach(f => {
    console.log('--- ' + f.name);
    f();
})
