// The "prototype" property is widely used by the core of JavaScript itself.
// All built-in constructor functions use it.

//? Object.prototype -----------------------------------------------------------

//* obj = {} is the same as obj = new Object(),
//* where Object is a built-in object constructor function, with its own prototype referencing a huge object with toString and other methods.

/*

                 prototype
        Object  ---------->  Object.prototype
  <constructor fn>              - constructor : Object
                                - toString : func(){...}
  
                                ^
                                | [[Prototype]]
                                |    

                             obj = new Object()
                             obj = {}   

*/

let obj = {};
console.log(obj.__proto__ === Object.prototype); //true
console.log(obj.toString === obj.__proto__.toString); //true
console.log(obj.toString === Object.prototype.toString); //true
console.log(Object.prototype.toString === obj.__proto__.toString); //true

//?  Other built-in prototypes --------------------------------------------------

/*
*                                                  NULL                                  

                                                    ^ 
                                                    |                                     
*
*                                     Object -->    Object.prototype
                                                    - constructor : Function

                                                     ^
                                                     |
                                                     | [[Prototype]]
                                                     |
*
*
*  Array --> Array.prototype           Function -->  Function.prototype           Number -->  Number.prototype
             - constructor : Array                   - constructor : Function                 - constructor : Number

              ^                                       ^                                       ^  
              | [[Prototype]]                         | [[Prototype]]                         | [[Prototype]]  
              |                                       |                                       |  


*            [1,2,3]                                  function(){...}                         50
*
*/

//? Primitives ----------------------------------------------------------------

//* As we remember, they are not objects. But if we try to access their properties, temporary wrapper objects are created using built-in constructors String, Number and Boolean. They provide the methods and disappear.

//? Changing native prototypes ------------------------------------------------

String.prototype.show = function () {
  console.log(this);
};

"BOOM!".show(); // BOOM!

//! **************************** BAD IDEA ************************

// Prototypes are global, so it’s easy to get a conflict. If two libraries add a method String.prototype.show, then one of them will be overwriting the method of the other.

// So, generally, modifying a native prototype is considered a bad idea.

//! **************************************************************

//* In modern programming, there is only one case where modifying native prototypes is approved. That’s polyfilling.

//* Polyfilling is a term for making a substitute for a method that exists in the JavaScript specification, but is not yet supported by a particular JavaScript engine.

// We may then implement it manually and populate the built-in prototype with it.

//if (!String.prototype.repeat) { // if there's no such method
// add it to the prototype

String.prototype.repeat = function (n) {
  // repeat the string n times

  // actually, the code should be a little bit more complex than that
  // (the full algorithm is in the specification)
  // but even an imperfect polyfill is often considered good enough
  return new Array(n + 1).join(this);
};
//}

console.log("La".repeat(3)); // LaLaLa

//? Borrowing from prototypes -------------------------------------------------

// We can take a method from one object and copy it into another.
// For instance, if we’re making an array-like object, we may want to copy some Array methods to it.

let name = {
  0: "Sourav",
  1: "Ghosh",
  length: 2,
};
name.join = Array.prototype.join;
console.log(name.join(" & "));

//! It works because the internal algorithm of the built-in join method only cares about the correct indexes and the length property. It doesn’t check if the object is indeed an array.

console.log(name.__proto__ === Object.prototype); //true

name.__proto__ = Array.prototype;

console.log(Object.getPrototypeOf(name));
