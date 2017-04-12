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
