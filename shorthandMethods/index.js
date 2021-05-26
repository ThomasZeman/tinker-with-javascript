'use strict';

function GetAndSet() {
    var a = {
        set name(value) {
            if (!value) {
                throw new Error('Name must have a value');
            }
            this._name = value;
        },
        get name() {
            return this._name;
        }
    }

    const b = Object.create(a);
    console.log(b.name);

    a.name = 'TomZ';
    console.log(a.name);

    try {
        b.name = undefined;
    }
    catch (e) {
        console.log(e.message);
    }

    const c = Object.create(a);
    console.log(c.name); // copied state _name

    for (const p in a) {
        console.log(p);
    }
}

function Shorthand() {
    const a = {
        foo() {
            return 'foo has been called';
        }
    }
    console.log(a.foo());
}

const functions = [GetAndSet, Shorthand];
functions.forEach(f => {
    console.log('--- ' + f.name);
    f();
})
