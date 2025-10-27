//* try...catch works synchronously

// If an exception happens in “scheduled” code, like in setTimeout, then try...catch won’t catch it:
// That’s because the function itself is executed later, when the engine has already left the try...catch construct.

try {
  setTimeout(function () {
    noSuchVariable; // script will die here
  }, 1000);
} catch (err) {
  alert("won't work");
}

//To catch an exception inside a scheduled function, try...catch must be inside that function:

setTimeout(function () {
  try {
    noSuchVariable; // try...catch handles the error!
  } catch (err) {
    alert("error is caught here!");
  }
}, 1000);

//! Error object

let error1 = {
  name: "ReferenceError",
  message: "noSuchVariable is not defined",
  stack: "noSuchVariable is not defined\n    at <anonymous>:2:13",
};

//! Throwing our own errors
throw new Error("This is a custom error");

//! Error types

//* ReferenceError
//* SyntaxError
//* TypeError
//* RangeError
//* URIError
//* EvalError
//* InternalError

//For built-in errors (not for any objects, just for errors), the name property is exactly the name of the constructor. 
// And message is taken from the argument.

let error = new Error("Things happen o_O");

alert(error.name); // Error
alert(error.message); // Things happen o_O

//! Rethrowing

//Catch should only process errors that it knows and “rethrow” all others.
//Here readData only knows how to handle SyntaxError, while the outer try...catch knows how to handle everything.

function readData() {
  let json = '{ "age": 30 }';

  try {
    // ...
    blabla(); // error!
  } catch (err) {
    // ...
    if (!(err instanceof SyntaxError)) {
      throw err; // rethrow (don't know how to deal with it)
    }
  }
}

try {
  readData();
} catch (err) {
  alert( "External catch got: " + err ); // caught it!
}


