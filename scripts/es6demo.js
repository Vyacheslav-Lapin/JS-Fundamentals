"use strict";

const MyClass = ((X, Y, Z) => class {
    constructor(x, y, z) {
        Object.defineProperty(this, X, { value: x });
        this[Y] = y;
        this[Z] = z;
    }

    logX() {
        console.log(this[X]);
    }

    static logConstructorName() {
        console.log(this.name);
    }
})(Symbol('x'), Symbol('y'), Symbol('z'));

{
    MyClass.logConstructorName();

    const myObject = new MyClass(1, 2, 3);
    myObject.logX();

    console.log(myObject['x']); //undefined
    console.log(myObject[Symbol.for('x')]); //undefined
    console.log(myObject[Symbol('x')]); //undefined

    let [x, y, z] = Object.getOwnPropertySymbols(myObject);
    console.log(myObject[x]);
    // myObject[x] = 5;
    console.log(myObject[x]);

    console.log(myObject[y]);
    myObject[y] = 10;
    console.log(myObject[y]); // 10

    console.log(myObject[z]);

    console.log(Symbol.keyFor(x) === 'x'); //true

}

// const bar = 0;
// const baz = 0;
// const quux = "jhdfg";
//
// function get(arr, num, quux) {
//     console.log(arr);
//     console.log(num);
//     console.log(quux);
// }
//
// get`http://example.com/foo?bar=${bar + baz}&quux=${quux}`;

// let parser = (input, match) => {
//     for (let pos = 0, lastPos = input.length; pos < lastPos; ) {
//         for (let i = 0; i < match.length; i++) {
//             match[i].pattern.lastIndex = pos;
//             let found;
//             if ((found = match[i].pattern.exec(input)) !== null) {
//                 match[i].action(found);
//                 pos = match[i].pattern.lastIndex;
//                 break
//             }
//         }
//     }
// };
//
// let report = match => {
//     console.log(JSON.stringify(match))
// };
//
// parser("Foo 1 Bar 7 Baz 42", [
//     { pattern: /^Foo\s+(\d+)/y, action: match => report(match) },
//     { pattern: /^Bar\s+(\d+)/y, action: match => report(match) },
//     { pattern: /^Baz\s+(\d+)/y, action: match => report(match) },
//     { pattern: /^\s*/y,         action: match => {}            }
// ]);

typeof Symbol('xyz'); // 'symbol'