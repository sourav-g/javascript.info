//* In JavaScript, functions are objects.
//* A good way to imagine functions is as callable “action objects”.
//* We can not only call them, but also treat them as objects: add/remove properties, pass by reference etc.

//? ----The “name” property--------------

function sayHi() {
    alert("Hi");
}
alert(sayHi.name); // sayHi

let sayHi = function() {
    alert("Hi");
};
alert(sayHi.name); // sayHi (there's a name!)

//? -----The “length” property-----------

//* There is another built-in property “length” that returns the number of function parameters, for instance:

function f1(a) {}
function f2(a, b) {}
function many(a, b, ...more) {}

alert(f1.length); // 1
alert(f2.length); // 2
alert(many.length); // 2   // rest parameters are not counted.

//? Custom properties-------------

function sayHi() {
    alert("Hi");
    // let's count how many times we run
    sayHi.counter++;
  }
  sayHi.counter = 0; // initial value
  
  sayHi(); // Hi
  sayHi(); // Hi
  
  alert( `Called ${sayHi.counter} times` ); // Called 2 times

  //! A property assigned to a function like sayHi.counter = 0 does not define a local variable counter inside it. In other words, a property counter and a variable let counter are two unrelated things.We can treat a function as an object, store properties in it, but that has no effect on its execution. Variables are not function properties and vice versa. These are just parallel worlds.


  //? -----Named Function Expression-----------

  let sayHi = function myName (who) {
    alert(`Hello, ${who}`);
  };

  /*
    There are two special things about the name 'myName', that are the reasons for it:

    1. It allows the function to reference itself internally.
    2. It is not visible outside of the function.
*/

let sayHi = function myName(who) {
    if (who) {
      alert(`Hello, ${who}`);
    } else {
        myName("Guest"); // use myName to re-call itself
    }
  };

  //! The “internal name” feature described here is only available for Function Expressions, not for Function Declarations. For Function Declarations, there is no syntax for adding an “internal” name.

