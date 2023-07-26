// objects are stored and copied “by reference”
// primitive values: strings, numbers, booleans, etc – are always copied “as a whole value”

let user = { name: "John" };
let admin = user; // copying the reference,but the object itself is not duplicated.

admin.name = "Pete"; // changed by the "admin" reference
alert(user.name); // 'Pete', changes are seen from the "user" reference

//? Comparison by reference---------------------------------------------------

let a = {};
let b = a; // copy the reference
alert(a == b); // true, both variables reference the same object
alert(a === b); // true

let c = {};
let d = {}; // two independent objects
alert(c == d); // false

//! For comparisons like obj1 > obj2 or for a comparison against a primitive obj == 5, objects are converted to primitives. [Rare comparisons]

//? Const objects can be modified ---------------------------------------------

const person = {
  name: "John",
};

person.name = "Pete"; // (*)
alert(person.name); // Pete

//* 1. value of user is constant
//* 2. Object properties can change [ CAN be made constant using Property descriptors & flags]

//? Cloning and merging, "Object Duplication" -----------------------------------------

//* 1. By iterating properties and copying to a new object
//* 2. Using Object.assign(target, ...sources)

user = { name: "John" };

let permissions1 = { canView: true };
let permissions2 = { canEdit: true };

// copies all properties from permissions1 and permissions2 into user
Object.assign(user, permissions1, permissions2);

// now user = { name: "John", canView: true, canEdit: true }
alert(user.name); // John
alert(user.canView); // true
alert(user.canEdit); // true

// ~ Notes ->
// If the copied property name already exists, it gets overwritten:
// There are also other methods of cloning an object, e.g. using the spread syntax
