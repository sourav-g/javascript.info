// Objects are used for storing keyed collections.
// Arrays are used for storing ordered collections.

//? MAP ---------------------------------->

// Map is a collection of keyed data items, just like an Object.
// But the main difference is that Map allows keys of any type.

// Methods and properties are:

/*

    new Map() – creates the map.
    map.set(key, value) – stores the value by the key.
    map.get(key) – returns the value by the key, undefined if key doesn’t exist in map.
    map.has(key) – returns true if the key exists, false otherwise.
    map.delete(key) – removes the element (the key/value pair) by the key.
    map.clear() – removes everything from the map.
    map.size – returns the current element count.

*/

let obj = {};
let map = new Map();
map.set("1", "str1"); // a string key
map.set(1, "num1"); // a numeric key

//* Unlike objects, keys are not converted to strings. Any type of key is possible.
//* Map can also use objects as keys.

let john = { name: "John" };
map.set(john, 123);
console.log(map.get(john)); //123

obj[john] = 345;
obj[{}] = 678;
console.log(obj["[object Object]"]); //678 ; it converts all Object keys to string "[object Object]"

//? How Map compares keys ---------------->
//It is roughly the same as strict equality ===, but the difference is that NaN is considered equal to NaN. So NaN can be used as the key as well.

//? Iteration over Map ------------------->

/*

map.keys() – returns an iterable for keys,
map.values() – returns an iterable for values,
map.entries() – returns an iterable for entries [key, value], it’s used by default in for..of.

*/

//* Map preserves insertion order, unlike a regular Object

let recipeMap = new Map([
  ["cucumber", 500],
  ["tomatoes", 350],
  ["onion", 50],
]);

for (let vegetable of recipeMap.keys()) {
  console.log(vegetable); // cucumber, tomatoes, onion
}
for (let amount of recipeMap.values()) {
  console.log(amount); // 500, 350, 50
}
for (let entry of recipeMap) {
  // or, recipeMap.entries()
  console.log(entry); // cucumber,500 (and so on)
}
recipeMap.forEach( (value, key, map) => {
  console.log(`${key}: ${value}`); // cucumber: 500 etc
});

//? Object.entries: Map from Object------------------->

// When a Map is created, we can pass an array (or another iterable) with key/value pairs for initialization, like this:

map = new Map(Object.entries(obj));
// here, Object.entries returns array of [key, value] pairs
map = new Map([
  ['1',  'str1'],
  [1,    'num1'],
  [true, 'bool1']
]);

console.log( map.get('1') ); // str1


//? Object.fromEntries: Object from Map---------------->

obj = Object.fromEntries(map.entries());
obj = Object.fromEntries(map);              //same, as standard map iteration returns same key/value pairs
obj = Object.fromEntries([
  ['banana', 1],
  ['orange', 2],
  ['meat', 4]
]);

//? SET ---------------------------------->

/*
  new Set([iterable]) – creates the set, and if an iterable object is provided (usually an array), copies values from it into the set.
  set.add(value)      – adds a value, returns the set itself.
  set.delete(value)   – removes the value, returns true if value existed at the moment of the call, otherwise false.
  set.has(value)      – returns true if the value exists in the set, otherwise false.
  set.clear()         – removes everything from the set.
  set.size            – is the elements count.
*/

//* Iteration APIs same as for Maps