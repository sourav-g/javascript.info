//* What happens if outer variables change since a function is created ? 
//* Will the function get newer values or the old ones ?
//* What if a function is passed along as an argument and called from another place of code, will it get access to outer variables at the new place?

//? Code blocks -----------------

//* If a variable is declared inside a code block {...}, it’s only visible inside that block.

{
    // Do some job with local variables that should not be seen outside  
    let message = "Hello";  // Only visible in this block
    console.log(message);   // Hello
}
  
//console.log(message);    //! ReferenceError: message is not defined
//let x=1;
//let x=2;                 //! SyntaxError: Identifier 'x' has already been declared


//? Nested functions ---------------

function makeCounter() {
    let count = 0;
  
    return function() {
      return count++;
    };
}
  
  let counter = makeCounter();
  
  console.log( counter() ); // 0
  console.log( counter() ); // 1
  console.log( counter() ); // 2

//* A nested function can be returned: either as a property of a new object or as a result by itself. 
//* It can then be used somewhere else. No matter where, it still has access to the same outer variables.


//? Lexical Environment ---------------