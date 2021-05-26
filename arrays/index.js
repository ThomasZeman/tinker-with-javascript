'use strict';

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

// triple dot ... on the "sending end" -> "fan out values"
function Spread() {
    const a = [5, 7, 9, 11, 13, 15, 17];
    console.log(...a);
    SpreadCallee(...a);
    SpreadCallee2(...a);
    const b = [0, ...a, 100];
    console.log(b);
}

function SpreadCallee(a, b, c, d, e, f, g, h, i, j, k, l, m, n) {
    console.log(a, b, c, d, e, f, g, h, i, j, k, l, m, n);
}

function SpreadCallee2(p) {
    console.log(p);
}

function Destruct() {
    const a = [5, 7, 9, 11, 13, 15, 17];
    const [x, y, , , , z] = a; // sparse destructing
    console.log(x, y, z);
}

function DestructWithDefault() {
    const a = [2, 3];
    const [x, y, z = 100] = a;
    console.log(x, y, z);
}

// triple dot on the "receiving end" -> get the "rest"
function DestructWithRest() {
    const a = [5, 7, 9, 11, 13, 15, 17];
    const [x, ...y] = a;
    console.log(y);
}

function DestructString() {
    const a = 'Hello World';
    const b = [...a];
    console.log(b);
}

const functions = [ArrayWithMissingElements, InitializeArray, AddArrayToObject, AddObjectToArray, DeleteRemainingElements, DeleteUndefinedElement, DeleteOneElement, Slice, Spread, Destruct, DestructWithDefault, DestructWithRest, DestructString];
functions.forEach(f => {
    console.log('--- ' + f.name);
    f();
})
