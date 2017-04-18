"use strict";

class MyClass {
    constructor(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    m1() {
        console.log(this.x + this.y + this.z);
    }

    static m2() {
        console.log(this.name);
    }
}

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

var x = new MyClass(1, 2, 3);
x.m1();

x.constructor.m2();
// MyClass.m2();
