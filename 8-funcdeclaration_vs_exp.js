//? When to choose Function Declaration versus Function Expression?

//* Function Declaration ; for most cases
//* Function Expression ; when we need a conditional declaration

let age = prompt("What is your age?", 18);

let welcome;

if (age < 18) {
  welcome = function () {
    alert("Hello!");
  };
} else {
  welcome = function () {
    alert("Greetings!");
  };
}

welcome(); // ok now

/*
    Function Declarations are processed before the code block is executed. They are visible everywhere in the block. 
    In strict mode, when a Function Declaration is within a code block, it’s visible everywhere inside that block. But not outside of it.
    Function Expressions are created when the execution flow reaches them.
*/
