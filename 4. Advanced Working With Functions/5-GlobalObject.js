//* The global object provides variables and functions that are available anywhere. By default, those that are built into the language or the environment.

// In Browser --> Window
// In Node.js --> Global

//* ANY Environment -> globalThis

/*

In a browser, global functions and variables declared with var (not let/const!) become the property of the global object:
Function declarations have the same effect (statements with function keyword in the main code flow, not function expressions).

Please don’t rely on that! This behavior exists for compatibility reasons. Modern scripts use JavaScript modules where such a thing doesn’t happen.

*/

var gVar = 5;
alert(window.gVar); // 5 (became a property of the global object)

//! Modern scripts use JavaScript modules where such a thing doesn’t happen.

let gLet = 5;
alert(window.gLet); // undefined (doesn't become a property of the global object)


//! That said, using global variables is generally discouraged. There should be as few global variables as possible

//? Using for polyfills--------------

//We use the global object to test for support of modern language features.

if (!window.Promise) {
    alert("Your browser is really old!");
    window.Promise = ()=>{} // custom implementation of the modern language feature

  }