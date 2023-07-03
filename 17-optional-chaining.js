// The optional chaining ?. is a safe way to access nested object properties, even if an intermediate property doesn’t exist.

//? The “non-existing property” problem------------>

alert(
  user.address ? (user.address.street ? user.address.street.name : null) : null
);

alert(
  user.address && user.address.street && user.address.street.name
    ? user.address.street.name
    : null
);

let html = document.querySelector(".elem")
  ? document.querySelector(".elem").innerHTML
  : null;

//? Optional chaining-------------------------------->

//* The optional chaining ?. stops the evaluation if the value before ?. is undefined or null and returns undefined.

let user = {};
alert(user?.address?.street); // undefined (no error)
html = document.querySelector(".elem")?.innerHTML; // will be undefined, if there's no element

//! DON'T OVERUSE => We should use ?. only where it’s ok that something doesn’t exist. Else, coding errors may be unnecessary silenced.

//! The variable before ?. must be declared
// ReferenceError: person is not defined
person?.address;
person?.["address"];

//! The optional chaining ?. has no use on the left side of an assignment.
user?.name = "John"; // Error, doesn't work
// because it evaluates to: undefined = "John"

//? Short-circuiting ------------------------------------>

//As it was said before, the ?. immediately stops (“short-circuits”) the evaluation if the left part doesn’t exist.

//? Other variants: ?.(), ?.[] ------------------------->

let userAdmin = {
  admin() {
    alert("I am admin");
  },
};

let userGuest = {};
userAdmin.admin?.(); // I am admin
userGuest.admin?.(); // nothing happens (no such method)


//? Summary ------------>

//*  obj?.prop
//*  obj?.[prop]
//*  obj.method?.()




