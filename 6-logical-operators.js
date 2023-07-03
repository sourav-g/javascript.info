/*
        || (OR), 
        && (AND), 
        ! (NOT), 
        ?? (Nullish Coalescing)
*/

//Although they are called “logical”, they can be applied to values of any type, not only boolean. Their result can also be of any type.

//? OR ------------>

//If an operand is not a boolean, it’s converted to a boolean for the evaluation.
//Finds the first truthy value, or the LAST value if none were found

alert(1 || 0); // 1 (1 is truthy)
alert(null || 1); // 1 (1 is the first truthy value)
alert(null || 0 || 1); // 1 (the first truthy value)
alert(undefined || null || 0); // 0 (all falsy, returns the last value)

//*1. Getting the first truthy value from a list of variables or expressions.
//*2. Short-circuit evaluation ---> It means that || processes its arguments until the first truthy value is reached, and then the value is returned immediately, without even touching the other argument.

true || alert("not printed");
false || alert("printed");

//? AND ------------>

//Finds the first falsy value, or the LAST value if none were found
alert(null && 5); // null
alert(0 && "no matter what"); // 0
alert(1 && 2 && 3); // 3, the last one

//! Precedence of AND && "is higher" than OR ||

//? NOT ------------>

alert(!true); // false
alert(!0); // true

//* NOTE -> A double NOT !! is sometimes used for converting a value to boolean type:

alert(!!"non-empty string"); // true
alert(!!null); // false
alert(Boolean("non-empty string")); // true
alert(Boolean(null)); // false

//!That is, the first NOT converts the value to boolean and returns the inverse, and the second NOT inverses it again. In the end, we have a plain value-to-boolean conversion.

//!The precedence of NOT ! is the highest of all logical operators, so it always executes first, before && or ||.

//* -------------------------------INTERESTING Problems---------------------------------------->

Q1.alert(alert(1) || 2 || alert(3)); //-> alert(1), and outer alert -> 2; [alert(3) -> ignored]
//       ^
//       |
//     shows alert and returns undefined

Q2.alert(alert(1) && alert(2)); //-> alert(1), and outer alert -> undefined

if (-1 || 0) alert("first"); //shows; 0-> falsy, any other integer -> truthy
if (-1 && 0) alert("second");
if (null || (-1 && 1)) alert("third"); //shows
