//* Objects can store properties

//? Property flags ---------------->

// Value
// writable     : if true, value can be changed, else readonly
// enumerable   : if true, then listed in loops, else not
// configurable : if true, property can be deleted, and these attributes can be modified, else not

//*"attributes can be modified - meaning overriding the property flags by writing a Object.defineProperty";
//*"that wont work if configurable is FALSE initially";
//* Making a property non-configurable is a one-way road. We cannot change it back with defineProperty.

//! By default, all are TRUE, when a property is created using OBJECT literal
//! By default, all are FALSE, when a property is created using OBJECT.defineProperty

let obj = {
  name: "Sourav",
  age: 31,
};
console.log(Object.getOwnPropertyDescriptor(obj, "name"));
Object.defineProperty(obj, "name", {
  configurable: false,
});
obj.name = "Ghosh";
console.log(obj);

//? Non-writable ---------------------------------------------->

let user = {
  name: "John",
};

Object.defineProperty(user, "name", {
  writable: false,
});

user.name = "Pete";
//! Error: Cannot assign to read only property 'name'
// Error appears only in strict mode or silently ignored

//? Non-enumerable -------------------------------------------->

user = {
  name: "John",
  toString() {
    return this.name;
  },
};

Object.defineProperty(user, "toString", {
  enumerable: false,
});

for (let key in user) console.log(key); // name

//Non-enumerable properties are also excluded from Object.keys:

//? ******    Non-configurable ------------------------------------------>

//* Making a property non-configurable is a one-way road. We cannot change it back with defineProperty.
//* For instance, Math.PI is non-writable, non-enumerable and non-configurable:

/*  << IMPORTANT >>

    Please note: configurable: false prevents changes of property flags and its deletion, while allowing to change its value.

*/

//~ Here user.name is non-configurable, but we can still change it (as it’s writable):

user = {
  name: "John",
};

Object.defineProperty(user, "name", {
  configurable: false,
});

user.name = "Pete"; // works fine
delete user.name; // Error

//~ And here we make user.name a “forever sealed” constant, just like the built-in Math.PI:

user = {
  name: "John",
};

Object.defineProperty(user, "name", {
  writable: false,
  configurable: false,
});

// won't be able to change user.name or its flags
// all this won't work:
user.name = "Pete";
delete user.name;
Object.defineProperty(user, "name", { value: "Pete" });

//? ------------------------------------------------------------------------------------------------------

//! The only attribute change possible: writable true → false
//! We can change writable: true to false for a non-configurable property, thus preventing its value modification (to add another layer of protection). Not the other way around though.

//? Object.defineProperties :: define many properties at once

Object.defineProperties(user, {
  name: { value: "John", writable: false },
  surname: { value: "Smith", writable: false },
  // ...
});

//? Object.getOwnPropertyDescriptors  ::  get all property descriptors at once

//~ One Interesting Use-Case follows

//* Case 1 : Normal way of cloning an object BUT DOES NOT COPY FLAGS

for (let key in user) {
  clone[key] = user[key];
}

//* Case 2 : "Flags-aware" way of cloning an object

let clonedObject = Object.defineProperties(
  {},
  Object.getOwnPropertyDescriptors(obj)
);

// for..in ignores symbolic and non-enumerable properties
// Object.getOwnPropertyDescriptors returns all prop descriptors, including symbolic and non-enumerable
//! Object.assign and for..in are not same for cloning.
//! for..in ignores symbolic properties but Object.assign also copies symbols

//? Sealing an object globally  -------------------------->

//~ Property descriptors work at the level of individual properties.
//~ But following methods that limit access to the whole object:

Object.preventExtensions(obj); //* Forbids the addition of new properties to the object.
Object.seal(obj); //* Forbids adding/removing of properties. Sets configurable: false for all existing properties.
Object.freeze(obj); //* Forbids adding/removing/changing of properties. Sets configurable: false, writable: false for all existing properties.

//~ Following method tests for above behaviour:

Object.isExtensible(obj); //* Forbids adding/removing/changing of properties. Sets configurable: false, writable: false for all existing properties.
Object.isSealed(obj); //* Returns true if adding/removing properties is forbidden, and all existing properties have configurable: false.
Object.isFrozen(obj); //* Returns true if adding/removing/changing properties is forbidden, and all current properties are configurable: false, writable: false.

//! Read ON : Object.seal vs Object.freeze
