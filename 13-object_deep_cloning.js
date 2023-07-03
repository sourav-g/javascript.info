//? Nested closing using "structuredClone" global method

//! Problem

let user = {
  name: "John",
  sizes: {
    height: 182,
    width: 50,
  },
};

let clone = Object.assign({}, user);

alert(user.sizes === clone.sizes); // true, same object

//* Soultion

//To fix that and make user and clone truly separate objects, we should use a cloning loop that examines each value of user[key] and, if it’s an object, then replicate its structure as well. That is called a “deep cloning” or “structured cloning”

user = {
  name: "John",
  sizes: {
    height: 182,
    width: 50,
  },
};

clone = structuredClone(user);

alert(user.sizes === clone.sizes); // false, different objects

//* Can clone most data types, such as objects, arrays, primitive values.
//* Supports circular references

user = {};
user.me = user; //circular ref
clone = structuredClone(user);
alert(clone.me === clone); // true

//! Fails when an object has a function property
