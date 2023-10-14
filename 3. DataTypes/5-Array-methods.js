//? Add/remove items ---------------------------------------------------->

/*

arr.push(...items) – adds items to the end,
arr.pop() – extracts an item from the end,
arr.shift() – extracts an item from the beginning,
arr.unshift(...items) – adds items to the beginning.

*/
//****************************************************************** */
//?  splice(start[, deleteCount, elem1, ..., elemN])
//! [Mutates array]
//******************************************************************* */

let arr = ["I", "go", "home"];
delete arr[1];
console.log(arr); // [ 'I', empty, 'home' ]

// The arr.splice method is a swiss army knife for arrays. It can do everything: insert, remove and replace elements.

arr = ["I", "go", "home"];

let removedArr = arr.splice(1, 1);
console.log(removedArr); // [ 'go' ]
console.log(arr); // [ 'I', 'home' ]

removedArr = arr.splice(0, 1, "Shillong", "is");
console.log(removedArr); // [ 'I' ]
console.log(arr); // [ 'Shillong', 'is', 'home' ]

// adding without removing

removedArr = arr.splice(2, 0, "forever");
console.log(removedArr); //[]
console.log(arr); //[ 'Shillong', 'is', 'forever', 'home' ]

// negative indices allowed

removedArr = arr.splice(-1, 1, "indeed"); //if deletecount is 0 or -ve, NO elements are removed
console.log(removedArr); // [ 'home' ]
console.log(arr); // [ 'Shillong', 'is', 'forever', 'indeed' ]

//*********************************************************** */
//?  slice([start], [end])   => from start but NOT including end
//! [NEW array]
//********************************************************** */

arr = ["Shillong", "is", "forever", "indeed"];

let copiedArr = arr.slice(1, 3);
console.log(copiedArr); // [ 'is', 'forever' ]

copiedArr = arr.slice(-2);
console.log(copiedArr); // [ 'forever', 'indeed' ]

copiedArr = arr.slice();
console.log(copiedArr); // ENTIRE Array copy

//************************************************** */
//?  concat(arg1, arg2...)
//! [NEW array]
//************************************************** */

arr = [1, 2];
console.log(arr.concat([3, 4])); // [ 1, 2, 3, 4 ]
console.log(arr.concat([3, 4], [5, 6])); // [ 1, 2, 3, 4, 5, 6 ]

console.log(
  arr.concat([3, 4], 5, 6, "a", {
    0: 2,
    1: 3,
    length: 2, //! mandatory if to be seen as an array
    [Symbol.isConcatSpreadable]: true, //! Only then this array-like object is treated as an array and flattened elements added
    //! else the entire object gets added
  })
);
//  [ 1, 2, 3, 4, 5, 6, 'a', 2, 3 ]

arr[Symbol.isConcatSpreadable] = false; //! will Avoid flattening
console.log(arr.concat([3, 4])); // [ [ 1, 2, [Symbol(Symbol.isConcatSpreadable)]: false ], 3, 4 ]
arr[Symbol.isConcatSpreadable] = true;

//! NO Nested Flattening
console.log(arr.concat([3, 4], [5, 6, [7, 8, 9]])); // [ 1, 2, 3, 4, 5, 6, [ 7, 8, 9 ] ]

//? forEach ---------------------------------------------------------------------->

arr = ["JS", "is", "single", "threaded"];
let op = arr.forEach((item, index, arr) => {
  console.log(`${item} is at index = ${index}`);
  return "success";
});
console.log(op); //undefined; return ignored

//? Searching in array ------------------------------------------------------------>

//************************************************** */
//?  indexOf(item, from)     -> looks for `item` starting from index `from` [left to right]
//?  lastIndexOf(item, from) -> looks for `item` starting from index `from` [right to left]
//!  Both uses STRICT equality (===) to find
//************************************************** */

arr = [1, 0, false, "a", "c", "d"];
//     0  1    2     3    4    5
//    -6  -5   -4   -3   -2   -1

//    --------indexOf ----------->
//    <-------lastIndexOf---------

console.log(arr.indexOf(0)); // 1
console.log(arr.indexOf(false)); // 2
console.log(arr.indexOf("a", 2)); // 3
console.log(arr.indexOf("a", 4)); // -1

console.log(arr.lastIndexOf("a", 4)); // 3
console.log(arr.lastIndexOf("a", -4)); // -1

//************************************************** */
//?  includes(item, from)    -> looks for `item` starting from index `from` [left to right]
//!  Uses STRICT equality (===) to find
//************************************************** */

arr = [1, 0, false, "a", "c", "d"];
console.log(arr.includes("a")); //true
console.log(arr.includes("1")); //false ; strict equality
console.log(arr.includes("a", 4)); //false
console.log(arr.includes("a", -2)); //false ; since ONLY left -> right direction searching

arr = [NaN];
console.log(arr.indexOf(NaN)); // -1 (wrong, should be 0)
console.log(arr.includes(NaN)); // true (correct)

//************************************************** */
//?  find                       -> returns `first` item if found, else undefined
//?  findIndex / findLastIndex  -> returns index if found, else -1
//!  useful for array of objects
//************************************************** */

let result = arr.find(function (item, index, array) {
  // if true is returned, item is returned and iteration is stopped
  // for falsy scenario returns undefined
});

let users = [
  { id: 1, name: "John" },
  { id: 2, name: "Pete" },
  { id: 3, name: "Mary" },
  { id: 4, name: "John" },
];
console.log(users.findIndex((user) => user.name == "John")); // 0
console.log(users.findLastIndex((user) => user.name == "John")); // 3

//************************************************** */
//?  filter  -> returns array of matching elements
//************************************************** */

let results = arr.filter(function (item, index, array) {
  // if true item is pushed to results and the iteration continues
  // returns empty array if nothing found
});

//? ****IMPORTANT*******Transform an array -------------------------------------------------->

//************************************************** */
//?  map   -> returns array by transforming each item
//! [NEW array] but inside Objects gets mutated (so "always" take a copy)
//************************************************** */

let mappedArray = arr.map(function (item, index, array) {
  // returns the new value instead of item
});

// Use case -> with array of primitives (simple)
// Use case -> with array of objects
let fruits = [
  {
    name: "Mango",
    inStock: false,
  },
  {
    name: "Banana",
    inStock: true,
  },
];
let newFruitsArray = fruits.map((item) => {
  item.price = "50.00";
  return item;
});
console.log(fruits);
//! WARNING ==> Mutated; since `newFruitsArray` is a new array storing pointers to the original objects in memory and NOT the actual objects value
console.log(newFruitsArray);

//* Fixing by taking Clone of an object & performing map on that
newFruitsArray = fruits.map((item) => {
  let clonedItem = { ...item };
  clonedItem.price = "50.00";
  return clonedItem;
});

//*************************************************************************************************************** */
//?  sort  -> sorts the array in place, changing its element order.
//! [Mutates array] (uses Tim Sort, in Chrome)

// READ -> MDN - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
// Good blog - https://www.gregorygaines.com/blog/the-only-javascript-sorting-guide-youll-ever-need/#:~:text=JavaScript%20by%20default%20sorts%20in,shortest%20one%20is%20put%20first.
//***************************************************************************************************************** */

let sortedArr = arr.sort(function (a, b) {
  if (a > b) return 1;
  if (a == b) return 0;
  if (a < b) return -1;
});

//? Use case -> without arguments------------------------------------->
//! " The items are sorted as strings by default ". For strings, lexicographic ordering is applied

arr = [0, 1, 2, 15, -1, 6, 25];
arr.sort();
console.log(arr); // [ -1, 0, 1, 15, 2, 25, 6 ]  sorted as string lexographically using unicode

//? Use case -> with array of primitives (simple)---------------------->

arr = [0, 1, 2, 15, -1, 6, 25];
arr.sort((a, b) => {
  if (a > b) return 1;
  if (a == b) return 0;
  if (a < b) return -1;
  //return a-b; (shortcut)
});
console.log(arr); // [ -1, 0, 1, 2, 6, 15, 25 ]

//? Use case -> with array of objects----------------------------------->

const characters = [
  {
    name: "eren",
    titansDefeated: 1,
  },
  {
    name: "mikasa",
    titansDefeated: 20,
  },
  {
    name: "armin",
    titansDefeated: 10,
  },
  {
    name: "foggy",
    titansDefeated: -9,
  },
  {
    name: "xavier",
    titansDefeated: 20,
  },
];

function compareFunc(property, obj1, obj2) {
  if (typeof obj1[property] === "number") {
    return obj1[property] - obj2[property];
  }
  if (typeof obj1[property] === "string") {
    return obj1[property].localeCompare(obj2[property]);
    //Normal English characters : use 1,-1,0 logic
    //For many alphabets, it’s better to use str.localeCompare method to correctly sort letters, such as Ö.
    //! Both are lexicographic
  }
}

characters
  .sort(compareFunc.bind(null, "name"))
  .sort(compareFunc.bind(null, "titansDefeated"));

console.log(characters);
/*

    [
        { name: 'foggy', titansDefeated: -9 },
        { name: 'eren', titansDefeated: 1 },
        { name: 'armin', titansDefeated: 10 },
        { name: 'mikasa', titansDefeated: 20 },  // original maintained for similar titansDefeated (stable sorting)
        { name: 'xavier', titansDefeated: 20 }   // original maintained for similar titansDefeated (stable sorting)
    ]

*/

//****************************************************************** */
//?  reverse  -> sorts the array in place, changing its element order.
//! [Mutates array]
//****************************************************************** */

arr = [1, 2, 3, 4, 5];
arr.reverse();
console.log(arr); // [ 5, 4, 3, 2, 1 ]

//****************************************************************** */
//?  split(delimiter,length)
//?  join(glue)
//! Array NOT Changed
//****************************************************************** */

let names = "Bilbo, Gandalf, Nazgul";
arr = names.split(", ", 2);
console.log(arr); // [ 'Bilbo', 'Gandalf' ]

names = arr.join(" | ");
console.log(names); // Bilbo | Gandalf

//****************************************************************** */
//?  reduce       -> Collection to a single value [ left to right ]
//?  reduceRight  -> [ right to left ]
//! Array NOT Changed
//****************************************************************** */

/*
let value = arr.reduce(
  function (accumulator, item, index, array) {
    ...
  },
  [initial]
);
*/

//The function is applied to all array elements one after another and “carries on” its result to the next call.

arr = [1, 2, 3, 4, 5];
result = arr.reduce((sum, current) => {
  return sum + current;
}, 0); //! No initial value, takes first arr element as initial value (if exists), else TypeError
console.log(result); // 15

//********? Array.isArray**********************

console.log(typeof {}); // object
console.log(typeof []); // object (same)

console.log(Array.isArray({})); // false
console.log(Array.isArray([])); // true

//? Most methods support “thisArg”**********************

/*

arr.find(func, thisArg);
arr.filter(func, thisArg);
arr.map(func, thisArg);

except sort
*/

let army = {
  minAge: 18,
  maxAge: 27,
  canJoin(user) {
    return user.age >= this.minAge && user.age < this.maxAge;
  },
};

users = [{ age: 16 }, { age: 20 }, { age: 23 }, { age: 30 }];

// find users, for who army.canJoin returns true
let soldiers = users.filter(army.canJoin, army); //! army is the this context

alert(soldiers.length); // 2
alert(soldiers[0].age); // 20
alert(soldiers[1].age); // 23
