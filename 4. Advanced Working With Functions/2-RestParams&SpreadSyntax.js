//? NEW :: Rest parameters ... (in function definition)

//* A function can be called with any number of arguments, no matter how it is defined.
//* The rest parameters gather all remaining arguments,
//! The ...rest must always be last.

function showName(firstName, lastName, ...titles) {
    console.log( firstName + ' ' + lastName ); // Julius Caesar
  
    // the rest go into titles array
    // i.e. titles = ["Consul", "Imperator"]
    console.log( titles[0] ); // Consul
    console.log( titles[1] ); // Imperator
    console.log( titles.length ); // 2
  }
  
  showName("Julius", "Caesar", "Consul", "Imperator");

  
//? OLD ::: The “arguments” variable --------------

  function showName() {
    console.log( arguments.length );
    console.log( arguments[0] );
    console.log( arguments[1] );
  
    // it's iterable
    // for(let arg of arguments) alert(arg);
  }
  
  // shows: 2, Julius, Caesar
  showName("Julius", "Caesar");
  
  // shows: 1, Ilya, undefined (no second argument)
  showName("Ilya");

//! arguments is both array-like and iterable, it’s not an array. 
//! It does not support array methods
//!!!! Arrow functions do not have "arguments" [ along with 'this']


//? Spread syntax (in funtion call)----------

//When ...arr is used in the function call, it “expands” an iterable object arr into the list of arguments.

let arr1 = [1, -2, 3, 4];
let arr2 = [8, 3, -8, 1];

console.log( Math.max(...arr1, ...arr2) ); // 8

//* Any iterable works, not just arrays
let str = "Hello";

console.log( [...str] );        // H,e,l,l,o   // Works only with iterables
console.log( Array.from(str) ); // H,e,l,l,o   // Works with array-liks and iterables [ more universal for turning into array]


//? Copy an array/object ----------------

let arr = [1, 2, 3];
let arrCopy = [...arr]; // spread the array into a list of parameters
                        // then put the result into a new array
// do the arrays have the same contents?
console.log(JSON.stringify(arr) === JSON.stringify(arrCopy)); // true
// are the arrays equal?
console.log(arr === arrCopy); // false (not same reference)

let obj = { a: 1, b: 2, c: 3 };
let objCopy = { ...obj }; // spread the object into a list of parameters
                          // then return the result in a new object

// do the objects have the same contents?
console.log(JSON.stringify(obj) === JSON.stringify(objCopy)); // true
// are the objects equal?
console.log(obj === objCopy); // false (not same reference)