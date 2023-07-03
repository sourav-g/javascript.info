//? A primitive as an object

//* There are many things one would want to do with a primitive, like a string or a number. It would be great to access them using methods.
//* Primitives must be as fast and lightweight as possible.

//? Solution

/*
    1. Primitives are still primitive. A single value, as desired.
    2. The language allows access to methods and properties of strings, numbers, booleans and symbols.
    3. In order for that to work, a special “object wrapper” that provides the extra functionality is created, and then is destroyed.
*/

// Object Wrappers ---> String, Number, Boolean, Symbol and BigInt

alert(typeof 0); // "number"
alert(typeof new Number(0)); // "object"!
let num = Number("123"); // this is OK, since not using as a constructor

//! typeof behaves differently
//! object always is truthy in `if` conditions

//! So dont use explicit wrappers in JS, let them be used internally only

//* null/undefined have no methods, no wrapper objects [ TRUE PRIMITIVES :D ]
