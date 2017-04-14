"use strict";

// with ({x:5}) {
//     console.log(x);
// }

// function def(a) {
//     var b = 10;
//     console.log(window.b);
// }
// def({});

function def() {
    console.log(this === window);
    console.log(typeof this);
}

// var global = this;

// def.apply(this); // true
// def.apply(window); // true

def.apply(5); // "object"
// def(); // false


Object.defineProperty(Object.prototype, '_super', { get: () => Object.getPrototypeOf(Object.getPrototypeOf(this)), });
Object.defineProperty(Object.prototype, '__super', { value: function() {
    this._super.constructor.apply(this, arguments);
}});

function A(x) {
    this.x = x;
}

function B(x, y) {
    this.__super(x);
    this.y = y;
}

Object.setPrototypeOf(B.prototype, A.prototype);

const b = new B(1, 2);
console.log(b._super.constructor.name);