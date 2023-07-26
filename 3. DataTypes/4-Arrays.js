// Objects ---> keyed collections of values
// Arrays --> ordered collection of values

let arr = new Array();
arr = [];

// * An array can store elements of any type.

arr = [
  "Apple",
  { name: "John" },
  true,
  function () {
    console.log("hello");
  },
];
console.log(arr[1].name); // John
arr[3](); // hello

//? Get last elements ----------------------------------->

let fruits = ["Apple", "Orange", "Plum"];

fruits[fruits.length - 1]; //Plum
fruits.at(-1); //Plum
fruits.at(1); //Orange
console.log(fruits.at(1) == fruits.at(-2)); //true

//? Methods pop/push, shift/unshift ==> mutates the array ---------------------->

// Arrays in JavaScript can work both as a queue and as a stack.

//* pop [remove from last] & push [add to last]

fruits = ["Apple", "Orange", "Pear"];
console.log(fruits.pop()); // Pear
console.log(fruits); //[ 'Apple', 'Orange' ]
console.log(fruits.push("Pear")); // 3
console.log(fruits); //[ 'Apple', 'Orange', 'Pear' ]

//* shift [remove from start] & unshift [add to start]

fruits = ["Apple", "Orange", "Pear"];
console.log(fruits.shift()); // Apple
console.log(fruits); // [ 'Orange', 'Pear' ]
console.log(fruits.unshift("Apple")); // 3
console.log(fruits); // [ 'Apple', 'Orange', 'Pear' ]

//adding multiple at once
fruits.push("Orange", "Peach");
fruits.unshift("Pineapple", "Lemon");

//***********?  Internals  ***************/

// An array is a special kind of object.
// arr[0] a form of obj[key]
// extend Objects + adds length property
// since they are objects, hence copied by reference
// engine tries to store its elements in the contiguous memory area, one after another, plus other optimizations

//? Performance

// push & pop are faster
// shift & unsift are slower  ==> since other indices needs to be re-numbered and update length prop

//? Loops

// for
// for..of (shorter)
// for..in (technically possible, since arrays are objects, but DONT USE, since it iterate over ALL props and not only numeric ones. Optimized for generic objects, not arrays, hence slower)

//? Length property

//  automatically updates on modifying array
//! its writable
//  clear the array is: arr.length = 0

arr = [1, 2, 3, 4, 5];
arr.length = 2; // truncate to 2 elements
console.log(arr); // [1, 2]
arr.length = 5; // return length back
console.log(arr[3]); // undefined: the values do not return

//? new Array()

arr = new Array("Apple", "Pear", "etc");
arr = new Array(2); //creates empty array of length = 2

//? Multidimensional arrays

let matrix = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
];

console.log(matrix[1][1]); // 5, the central element

//? toString

arr = [1, 2, 3];
console.log(arr.toString()); // 1,2,3
console.log([] + 1); // "1"
console.log([1] + 1); // "11"
console.log([1, 2] + 1); // "1,21"

//! Arrays do not have Symbol.toPrimitive, neither a viable valueOf, they implement only toString conversion, so here [] becomes an empty string, [1] becomes "1" and [1,2] becomes "1,2".

//? Don’t compare arrays with ==,=== [ since they compare ONLY references like objects]

console.log([] == []); // false
console.log([0] == [0]); // false

//? Comparison with primitives may give seemingly strange results as well:

console.log(0 == []); // true       ; [] object->primitive converted to '', '' converted to 0 (type coercion)
console.log("0" == []); // false    ; [] -> '', '' and '0' are different strings
