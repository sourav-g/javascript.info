//? String comparison

//! ()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\]^_`abcdefghijklmnopqrstuvwxyz{|}
// A (65)               z(122)
// lower -------------> greater
console.log("A".codePointAt(0)); // 65
console.log("z".codePointAt(0)); // 122

//To see whether a string is greater than another, JavaScript uses the so-called “dictionary” or “lexicographical” order.

console.log("Z" > "A"); // true
console.log("Z" > "a"); // false
console.log("Glow" > "Glee"); // true
console.log("Bee" > "Be"); // true

//!Not a real dictionary, but Unicode order
//For instance, case matters. A capital letter "A" is not equal to the lowercase "a".
//Which one is greater? The lowercase "a". Why?
//Because the lowercase character has a greater index in the internal encoding table JavaScript uses (Unicode).

//?Comparison of different types

//*When comparing values of different types, JavaScript converts the values to numbers.

console.log("2" > 1); // true, string '2' becomes a number 2
console.log("01" == 1); // true, string '01' becomes a number 1
console.log(true == 1); // true
console.log(false == 0); // true

//? Strict equality

//A regular equality check == has a problem. It cannot differentiate 0 from false:

console.log(0 == false); // true
console.log("" == false); // true

//*A strict equality operator === checks the equality without type conversion.

console.log(0 === false); // false, because the types are different

//? Comparison with null and undefined

console.log(null === undefined); // false
console.log(null == undefined); // true; not converted to numbers (0 & NaN), only in this case
console.log(null === undefined); //false
console.log(null === null); //true
console.log(null == null); //true
console.log(undefined === undefined); //true
console.log(undefined == undefined); //true

//! An equality check == and comparisons > < >= <= work differently.
//Comparisons convert null to a number, treating it as 0
//On the other hand, the equality check == for undefined and null is defined such that, without any conversions, they equal each other and don’t equal anything else.

console.log(null > 0); // False; coverted to number
console.log(null == 0); // False; not converted
console.log(null >= 0); // True; converted

console.log(undefined > 0); // false ; convert to NaN
console.log(undefined < 0); // false ; convert to NaN
console.log(undefined == 0); // false ; undefined only equals null & undefined

//! NaN always returns false for any comparisons; even with NaN itself.

//? Summary-----------------------

/*
    Comparison operators return a boolean value.
    Strings are compared letter-by-letter in the “dictionary” order.
    When values of different types are compared, they get converted to numbers (with the exclusion of a strict equality check).
    The values null and undefined equal == each other and do not equal any other value.
    Be careful when using comparisons like > or < with variables that can occasionally be null/undefined. Checking for null/undefined separately is a good idea.
*/

//* Read-->

//Unicode encoding of alphabets and numbers in JS
