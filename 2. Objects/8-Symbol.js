//? Use Case --->  Symbols are often used to add unique property keys to an object that won't collide with keys any other code might add to the object, and which are hidden from any mechanisms other code will typically use to access the object. That enables a form of weak encapsulation, or a weak form of information hiding

// By spec, only 2 primitives may serve as object prop keys:

//* 1. String
//* 2. Symbol

//* Symbol is a built-in object whose constructor returns a symbol primitive — also called a Symbol value or just a Symbol — that's guaranteed to be unique.

//? Symbols => A “symbol” represents a unique identifier. ---------------------->

let id = Symbol();
let id2 = Symbol("id");
console.log(id2.description); // id

let id3 = Symbol("id");
let id4 = Symbol("id");

console.log(id3 == id4); // false

//! Symbols don’t auto-convert to a string

//? Symbols in Object literal => “Hidden” properties ----------------------------------->

// consider, user belongs to a lib codebase
newId = Symbol("id");
anotherId = Symbol("id");
let user = {
  name: "John",
  [newId]: 1,
  [Symbol("againId")]: 3,
};
user[anotherId] = 2;
console.log(user[newId]);      //1
console.log(user[anotherId]);  //2
console.log(user[Symbol("againId")]);  //undefined

//? What’s the benefit of using Symbol("id") over a string "id"? -------------->

//Ans -> As user objects belong to another codebase, it’s unsafe to add fields to them, since we might affect pre-defined behavior in that other codebase. However, symbols cannot be accessed accidentally. The third-party code won’t be aware of newly defined symbols, so it’s safe to add symbols to the user objects.

//! Symbols are skipped by for…in
//! Object.keys(user) also ignores them
//! Object.assign copies both string and symbol properties:

//? Global symbols => global symbol registry => used for application-wide symbol

//there exists a "global symbol registry".
//We can create symbols in it and access them later, and it guarantees that repeated accesses by the same name return exactly the same symbol.

// read from the global registry
id = Symbol.for("id"); // if the symbol did not exist, it is created
let idAgain = Symbol.for("id");
alert(id === idAgain); // true

//? Symbol.keyFor

//The Symbol.keyFor internally uses the global symbol registry to look up the key for the symbol. So it doesn’t work for non-global symbols.

let sym = Symbol.for("name");
let sym2 = Symbol.for("id");

// get name by symbol
alert(Symbol.keyFor(sym)); // name
alert(Symbol.keyFor(sym2)); // id

//? System symbols

/*

Symbol.hasInstance
Symbol.isConcatSpreadable
Symbol.iterator
Symbol.toPrimitive  =>  allows us to describe object to primitive conversion

*/

//! Technically, symbols are not 100% hidden. There is a built-in method Object.getOwnPropertySymbols(obj) that allows us to get all symbols. Also there is a method named Reflect.ownKeys(obj) that returns all keys of an object including symbolic ones.
