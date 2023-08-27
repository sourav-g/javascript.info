//* Variables, declared with var, are either function-scoped or global-scoped. They are visible through blocks.
//* With var, we can redeclare a variable any number of times. If we use var with an already-declared variable, it’s just ignored:
//* “var” variables can be declared below their use
//* Declarations are hoisted, but assignments are not.


//? IIFE ------------
// In the past, as there was only var, and it has no block-level visibility, programmers invented a way to emulate it. What they did was called “immediately-invoked function expressions” (abbreviated as IIFE).

(function() {

    var message = "Hello";
  
    alert(message); // Hello
  
  })();

  // Here, a Function Expression is created and immediately called. So the code executes right away and has its own private variables.

  // Ways to create IIFE

(function() {
    alert("Parentheses around the function");
  })();
  
  (function() {
    alert("Parentheses around the whole thing");
  }());
  
  !function() {
    alert("Bitwise NOT operator starts the expression");
  }();
  
  +function() {
    alert("Unary plus starts the expression");
  }();