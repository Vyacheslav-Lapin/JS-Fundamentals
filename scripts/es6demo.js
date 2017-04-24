"use strict";

// const MyClass = function (HIDDEN) {
//
//     return class {
//         constructor(x, y, z) {
//             this.x = x;
//             this.y = y;
//             this.z = z;
//
//             this[HIDDEN] = x + y + z;
//         }
//
//         m1() {
//             console.log(this[HIDDEN]);
//         }
//
//         static m2() {
//             console.log(this.name);
//         }
//     };
// }(Symbol('hidden'));

// function MyClass(x, y, z) {
//     this.x = x;
//     this.y = y;
//     this.z = z;
// }
//
// MyClass.prototype.m1 = function m1() {
//     console.log(this.x + this.y + this.z);
// };
//
// MyClass.m2 = function m2() {
//     console.log(this.name);
// };

// {
//     const x = new MyClass(1, 2, 3);
//     x.m1();
//     console.log(x['hidden']);
// }

const bar = 0;
const baz = 0;
const quux = "jhdfg";

function get(arr, num, quux) {
    console.log(arr);
    console.log(num);
    console.log(quux);
}

get`http://example.com/foo?bar=${bar + baz}&quux=${quux}`;
