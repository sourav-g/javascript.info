//* Textual data in strings [ The internal format for strings is always UTF-16 ] ( UTF16 vs UTF 8 ??)
//* no datatype for single character ( no `char` type)

//? String length

console.log(`My\n`.length); // 3

//! Backticks also allow us to specify a “template function” before the first backtick.
//! Read Later -->  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#tagged_templates

//? Accessing characters

let str = `Hello`;
// the first character
console.log(str[0]); // H
console.log(str.at(0)); // H

// the last character
console.log(str[str.length - 1]); // o
console.log(str.at(-1)); // o
console.log(str.at(-2)); // l
console.log(str[-2]); // undefined

//? Strings are immutable -------------------------------------->

let strg = "Hi";
strg[0] = "h"; // doesnt work
console.log(strg[0]); // H

strg = "h" + strg[1]; // replace the string

//? Changing the case

let city = "Istanbul";

console.log(city.toUpperCase()); // ISTANBUL
console.log(city.toLowerCase()); // istanbul
console.log(city.toLocaleUpperCase("en-US")); //returns according to any locale-specific case mappings.
console.log(city.toLocaleLowerCase("TR")); //returns according to any locale-specific case mappings.

//? **** Searching for a substring ***********************************************

//* str.indexOf(substr, pos) ------------------------------->

str = "Widget with  id";
//     012345678910111213
console.log(str.indexOf("Widget")); // 0, because 'Widget' is found at the beginning
console.log(str.indexOf("widget")); // -1, not found, the search is case-sensitive
console.log(str.indexOf("id")); // 1, "id" is found at the position 1
console.log(str.indexOf("id", 2)); // 12 ; The optional second parameter allows us to start searching from a given position.

//~ finding all occurrences

str = "As sly as a fox, as strong as an ox";
let pos = -1;
while (true) {
  let foundPos = str.indexOf(str, pos);
  if (foundPos == -1) break;
  console.log(`Found at ${foundPos}`);
  pos = foundPos + 1; // continue the search from the next position
}

//*  str.lastIndexOf(substr, position) ---------------------------->

//   searches from the end of a string

//*  includes, startsWith, endsWith  ------------------------------->

console.log("Widget".includes("id")); // true
console.log("Widget".includes("id", 3)); // false, from position 3 there is no "id"
console.log("Widget".startsWith("Wid")); // true
console.log("Widget".endsWith("get")); // true

//? ******** Getting a substring ------------------------------->

//*  substring, substr and slice

//*  str.slice(start [, end])  ==>  from start but NOT including end [ start<= end ]
//*                                 (NEVER Swaps start & end)

str = "stringify";
//!    012345678
//!     ...-2 -1

console.log(str.slice(0, 5)); // 'strin'
console.log(str.slice(0, 1)); // 's'
console.log(str.slice(2)); // 'ringify' , goes till end of string
console.log(str.slice(-4, -1)); // 'gif', starts from 4th pos from end

//*  str.substring(start [, end])  ==>  from start but NOT including end  [ start can be > end]
//*                                     (Swaps start & end for start > end)

// these are same for substring
console.log(str.substring(2, 6)); // "ring"
console.log(str.substring(6, 2)); // "ring" ( start  & end swapped)

// ...but not for slice:
console.log(str.slice(2, 6)); // "ring"
console.log(str.slice(6, 2)); // "" (an empty string)  ( start & end NOT swapped)

console.log(str.substring(-2, 5)); // strin
//! Negative arguments are (unlike slice) not supported, they are treated as 0.

//*  str.substr(start [, length])  ==> from start with given length
//! Deprecated

console.log(str.substr(2, 4)); // 'ring', from the 2nd position get 4 characters
console.log(str.substr(-4, 2)); // 'gi', from the 4th position(from end) get 2 characters

/*****Summary

*? method	                 selects…	                                                       negatives

  slice(start, end)	         from start to end (not including end)	   [no swap for s > e]     allows negatives
  substring(start, end)	     between start and end (not including end) [swaps for s > e]	   negative values mean 0
  substr(start, length)	     from start get length characters	                               allows negative start


  VERDICT  =>  Use `slice` for most cases
*/

//*******? Comparing strings ****************

// strings are compared character-by-character in alphabetical order.
// A lowercase letter is always greater than the uppercase.
console.log("a" > "Z"); //true

// Letters with diacritical marks are “out of order”.
console.log("Österreich" > "Zealand"); //true  :p

//~ Each character has a corresponding numeric code.There are special methods that allow to get the character for the code and back:

//* str.codePointAt(pos) ---> Returns a decimal number representing the code for the character at position pos

console.log("Z".codePointAt(0)); // 90
console.log("z".codePointAt(0)); // 122
console.log("z".codePointAt(0).toString(16)); // 7a (if we need a hexadecimal value)

//* String.fromCodePoint(code) ---> Creates a character by its numeric code

console.log(String.fromCodePoint(90)); // Z
console.log(String.fromCodePoint(0x5a)); // Z (we can also use a hex value as an argument)

//? Printing all strings by code ------------------------>>>

str = "";

for (let i = 40; i <= 125; i++) {
  str += String.fromCodePoint(i);
}
console.log(str);
// Output:
// ()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\]^_`abcdefghijklmnopqrstuvwxyz{|}
// lower ------------------------------------------------------------------------>greater

//! The characters are compared by their numeric code. The greater code means that the character is greater.
//? <<<-------------------------------------------------------

//********?  Correct comparisons ***********************

//~ The “right” algorithm to do string comparisons is more complex than it may seem, because alphabets are different for different languages. So, the browser needs to know the "language" to compare.

//~ It provides a special method to compare strings in different languages

// * str.localeCompare(str2)

//   +ve; if str > str2
//   -ve; if str < str2
//    0 ; if equivalent

console.log("Österreich".localeCompare("Zealand")); // -1 ; implies "Österreich" < "Zealand" (not comparing by code)
console.log("Österreich" > "Zealand"); //true;

//! This method has 2 more params : localeCompare(compareString, locales, options)
//                                                                  ^        ^
//                                                                  |        |
//                                                              language  setup rules like case sensitivity

//! READ FURTHER ==>

//! https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/localeCompare
//! https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Collator
//! https://www.tutorialspoint.com/ascii-vs-unicode#:~:text=UNICODE%20is%20a%20superset%20of%20ASCII.&text=ASCII%20supports%20only%20128%20characters,a%20wide%20range%20of%20characters.
//! ***** https://unicodelookup.com/
