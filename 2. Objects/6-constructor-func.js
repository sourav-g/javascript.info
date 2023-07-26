//? constructor function --> to implement reusable object creation code.

//* Functions called in constructor mode, has own `this`

/*
When a function is executed with new, it does the following steps:

1. A new empty object is created and assigned to this.
2. The function body executes. Usually it modifies this, adds new properties to it.
3. The value of this is returned.
*/

function User(name) {
  // this = {};  (implicitly)
  this.name = name;
  this.isAdmin = false;
  // return this;  (implicitly)
}

let user = new User("Jack");

alert(user.name); // Jack
alert(user.isAdmin); // false

//? ONLY ONCE object creation--------------------------------->

// create a function and immediately call it with new, IIFE
//! func gets invoked without IIFE syntax as well
user = new (function () {
  this.name = "John";
  this.isAdmin = false;
})();

//? Constructor mode test: new.target ------------------------->

function User(name) {
  if (!new.target) {
    // if you run me without new
    return new User(name); // ...I will add new for you
  }
  this.name = name;
}
let john = User("John"); // redirects call to new User
alert(john.name); // John

//? Return from constructors ------------------------------->

function BigUser() {
  this.name = "John";
  return { name: "Godzilla" }; // <-- returns this object
  return; // <-- ignored; returns this
  return 2; // <-- primitives ignored; returns this
}

//? Methods in constructor---------------------------------->

function User(name) {
  this.name = name;
  this.sayHi = function () {
    alert("My name is: " + this.name);
  };
}

john = new User("John");
john.sayHi(); // My name is: John
