'use strict';

function templateString() {
    const x = 10;
    const y = 'Foo';
    const z = 3.14;
    const a = `x: ${x} y: ${y} z: ${z}`;
    console.log(a);
}

// strings:
// x: y: z: ''
// 0  1  2  3
// strings.length = 4
//
// values:
// 10 Foo 3.14
// 0  1   2
function encloseWithAsterix(strings, ...values) {
    let result = '**';
    for (let i = 0; i < strings.length - 1; i++) {
        result += strings[i];
        result += values[i];
    }
    result += '**';
    return result;
}

function taggedTemplateString() {
    const x = 10;
    const y = 'Foo';
    const z = 3.14;
    const a = encloseWithAsterix`x: ${x} y: ${y} z: ${z}`;
    console.log(a);
}

const functions = [templateString, taggedTemplateString];
functions.forEach(f => {
    console.log('--- ' + f.name);
    f();
})
