//* Iterable objects are a generalization of arrays.
//~ That’s a concept that allows us to make any object useable in a for..of loop.
//  If an object isn’t technically an array, but represents a collection (list, set) of something, then for..of is a great    syntax to loop over it
//  Objects are not iterable unless they implement the iterable protocol
//  Arrays, Strings are iterable [ has built-in iterators ]

//* Enumerable vs Iterable
//! https://www.youtube.com/watch?v=HZjvoftRvGE&list=PLyuRouwmQCjmRNaK95KJa6lWLnBonVeUd&index=10

// Enumerable -> looping through all 'properties' of Objects that are enumerable (for..in)
// Iterable -> Iterator object attached to the Collection, which provides things from the Collection
//             in the manner defined

//? Symbol.iterator ------------------------------------------------------------->
//! [ How to make an object iterable similar to an array using for..of ?]

let range = {
  from: 1,
  to: 5,
};

//! TypeError: range is not iterable
/*
    for (let num of range) {
        console.log(num);
    }
*/

// 1. call to for..of initially calls this
// Iterator implementation of the iterator interface

range[Symbol.iterator] = function () {
  // ...it returns the "iterator object" :
  // 2. Onward, for..of works only with the iterator object below, asking it for next values
  return {
    current: this.from,
    last: this.to,

    // 3. next() is called on each iteration by the for..of loop

    next() {
      // 4. it should return the value as an object {done:.., value :...}

      if (this.current <= this.last) {
        return { done: false, value: this.current++ };
      } else {
        return { done: true };
      }
    },
  };
};

// now it works!

for (let num of range) {
  console.log(num);
}

//* the iterator object is separate from the object it iterates over

//? String is iterable ---------------------------------------------------->

for (let char of "test") {
  console.log(char); // t, e, s, t
}

//? Calling an iterator explicitly ----------------------------------------->

let str = "Hello";

let iterator = str[Symbol.iterator](); // returns the default iterator implementation for string type
while (true) {
  let result = iterator.next();
  if (result.done) break;
  console.log(result.value); // H, e, l, l, o
}

//? Iterables and array-likes  --------------------------------------------->

// Iterables are objects that implement the Symbol.iterator method, as described above.
// Array-likes are objects that have indexes and length, so they look like arrays.

// For instance, strings are both iterable (for..of works on them) and array-like (they have numeric indexes and length).

//! Both iterables and array-likes are usually not arrays, they don’t have push, pop etc. That’s rather inconvenient if we have such an object and want to work with it as with an array. E.g. we would like to work with range using array methods. How to achieve that?

//? Array.from -------------------->

// takes an iterable or array-like value and makes a “real” Array from it

let arrayLike = {
  0: "Hello",
  1: "World",
  length: 2,
};

let arr = Array.from(arrayLike); // makes new array and copies all items
console.log(arr); // [ 'Hello', 'World' ]
console.log(arr.pop()); //use array methods now

arr = Array.from(range);
console.log(arr); // [ 1, 2, 3, 4, 5 ]

//* Array.from(obj[, mapFn, thisArg])
arr = Array.from(range, (num) => num * num);
