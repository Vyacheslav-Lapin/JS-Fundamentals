"use strict";

//
// with ({x:5}) {
//     console.log(x);
// }

// function def(a) {
//     var b = 10;
//     console.log(window.b);
// }
// def({});

// function def() {
//     console.log(this === window);
//     console.log(typeof this);
// }
//
// // var global = this;
//
// // def.apply(this); // true
// // def.apply(window); // true
//
// def.apply(5); // "object"
// // def(); // false
//
//
// Object.defineProperty(Object.prototype, '_super', { get: () => Object.getPrototypeOf(Object.getPrototypeOf(this)), });
// Object.defineProperty(Object.prototype, '__super', { value: function() {
//     this._super.constructor.apply(this, arguments);
// }});
//
// function A(x) {
//     this.x = x;
// }
//
// function B(x, y) {
//     this.__super(x);
//     this.y = y;
// }
//
// Object.setPrototypeOf(B.prototype, A.prototype);
//
// const b = new B(1, 2);
// console.log(b._super.constructor.name);

// var x = {};
//
// (function () {
//
//     var _y = 55;
//
//     Object.defineProperty(x, 'y', {
//         // value: 55,
//         // writable: true,
//         // enumerable: true
//         // configurable: true
//         // get: function () {
//         //     return _y;
//         // },
//         set: function (y) {
//             _y = y;
//         }
//     });
//
//     x.getY = function() {
//         return _y;
//     }
// })();
//
// // console.log(x.y);
// x.y = 56;
// console.log(x.getY());
// console.log('y' in x);
// console.log(Object.getOwnPropertyDescriptor(x, 'y'));

// function writeToProp(object, prop, value) {
//     var ownPropertyDescriptor = Object.getOwnPropertyDescriptor(object, prop);
//     if (ownPropertyDescriptor.writable)
//         object[prop] = value;
//     else if (ownPropertyDescriptor.configurable)
//         Object.defineProperty(x, 'y', {value: value});
//     else {
//         throw "Не могу поменять свойство не записываемое и не конфигурируемое!";
//     }
// }
//
// writeToProp(x, 'y', 56);
// console.log("x.y = " + x.y);
// console.log(x);

// var s = "var x = 5; console.log(x);";
// var f = eval;
// // eval = function () {
// //   console.log("123");
// // };
//
// console.log(Object.getOwnPropertyDescriptor(window, 'eval'));
//
// f(s);

// function f(x,y,z) {
//     console.log(x,y,z);
//     arguments[0] = 5;
//     arguments[1] = 9;
//     arguments[2] = 1;
//     console.log(x,y,z);
// }
// f(1,2,3);

// function f() {
//     var x1 = {};
//     with (x1) {
//         var x = 10;
//         console.log(x);
//         console.log(delete x);
//         console.log(delete x1.x);
//         console.log(x);
//     }
// }
// f();

// function f(x,x,x) {
//     console.log(x);
//     console.log(arguments);
//     arguments[2] = 6;
//     console.log(arguments);
//     console.log(x);
// }
// f(1,2,3);


Object.defineProperty(Function.prototype, 'remember', {
    value: function () { return eval(`${this};${this.name}`); }
});

function factorial(x) {
    return x === 1 ? 1 : x + factorial(x - 1);
}

console.log(factorial(3) === 6 ?
    'Функция знает сама о себе.' : 'Функция НЕ знает сама о себе.');

const factorial1 = factorial;
const factorial2 = factorial.remember();

factorial = 5;

try {
    if (factorial1(3) === 6)
        console.log('Функция factorial1 всё ещё помнит сама себя!');
} catch (e) {
    console.log('Функция factorial1 забыла сама себя...', 'Да'); //Да
}

console.log('Функция factorial2 всё ещё помнит сама себя!', factorial2(3) === 6 ? 'Да' : 'Нет'); //Да
