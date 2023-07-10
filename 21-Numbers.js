//* 1.  Regular numbers -> stored in 64-bit format IEEE-754
//                         (“double precision floating point numbers”)
//                        [ 52 bits - for mantissa (representing a number between 0 and 1)]
//                        [ 11 bits - for exponent (-1022 to 1023)]
//                        [ 1 bit   - for sign (positive or negative) ]

//* 2.  BigInt numbers ->  represent integers of arbitrary length

let billion = 1000000000;
billion = 1_000_000_000; //! JS engine ignores _
billion = 1e9; //1 * 10^9 ; better way of writing large numbers

let mсs = 0.000001;
mcs = 1e-6;
console.log(1234e-2 === 1234 / 100);

//? Hex [0x], binary[0b] and octal[0o] numbers ---------->
//? For other number systems -> use parseInt

//* Hex -> to represent colors, encode characters

console.log(0xff); // 255
console.log(0xff); // 255 (the same, case doesn't matter)

let a = 0b11111111; // binary form of 255
let b = 0o377; // octal form of 255

console.log(a == b); // true, the same number 255 at both sides

//? num.toString(base) ---------------------------->

let num = 255;
console.log(num.toString(16)); // string representation of num in hex
console.log((123456).toString(36));

//* base=16 is used for hex colors, character encodings etc, digits can be 0..9 or A..F.
//* base=2 is mostly for debugging bitwise operations, digits can be 0 or 1.
//! base=36 is the maximum, digits can be 0..9 or A..Z. The whole latin alphabet is used to represent a number. [ to turn a long numeric identifier into something shorter ; to make URL short]

//? Rounding [ deals with decimal-part of a number ] --------------------------->

//* Math.floor - Rounds up [ 3.1 -> 3, -1.1 -> -2 ]
//* Math.ceil  - Rounds down [ 3.1 -> 4, -1.1 -> -1 ]
//* Math.round - Rounds to nearest [ 3.1 -> 3, 3.6 -> 4, 3.5 -> 4, -1.1 -> -1]
//* Math.trunc - Removes after decimal point w/o rounding [ 3.1 -> 3, -1.12 -> -1]

//? Round the number to n-th digit after the decimal ? -------------->

// 1.2345 Round by 2 ==> 1.23

//* 2 approaches

//~ Approach 1 -> Multiply & Divide

num = 1.23456;
console.log(Math.round(num * 100) / 100); // 1.23456 -> 123.456 -> 123 -> 1.23 (number)

//~ Approach 2 -> Using toFixed(n)

num = 1.23456;
console.log(num.toFixed(2)); // "1.23" (string)
console.log(+num.toFixed(2)); // 1.23 (number)
console.log(Number(num.toFixed(2))); // 1.23 (number)

num = 12.34;
console.log(num.toFixed(5)); //12.34000, added zeroes to make exactly 5 digits
console.log(+{}); // NaN

//? Imprecise calculations -> LOSS of precision ( *************** INTERESTING ***********8 ) ---------------------------->

console.log(1e500); // Infinity [  exceeds 62 bit storage ]

console.log((0.1).toFixed(20)); // 0.10000000000000000555
console.log((0.2).toFixed(20)); // 0.20000000000000001110
console.log(0.1 + 0.2); // 0.30000000000000004 ;******** “precision losses” add up *******
console.log(+(0.1 + 0.2).toFixed(1)); // 0.3

/* Explanation for above ->

   --> //* A number is stored in memory in its binary form
   --> Fractions like 0.1, 0.2 that look simple in the decimal system are actually unending fractions in their binary form.
   --> What is 0.1? It is one divided by ten 1/10, one-tenth. In decimal numeral system such numbers are easily representable. Compare it to one-third: 1/3. It becomes an endless fraction 0.33333(3).
   --> //* In the binary numeral system, the division by powers of 2 is guaranteed to work, but 1/10 becomes an endless binary fraction.
   --> //* There’s just no way to store "exactly" 0.1 or 0.2 using the binary system
   --> //* The numeric format IEEE-754 solves this by rounding to the nearest possible number. These rounding rules normally don’t allow us to see that “tiny precision loss”, but it exists.

*/

console.log((0.1 * 10 + 0.2 * 10) / 10); // 0.3
console.log((0.28 * 100 + 0.14 * 100) / 100); // 0.4200000000000001

//! Multiply/divide approach reduces the error, but doesn’t remove it totally.

console.log(9999999999999999); //10000000000000000
// Two zeroes (+0 and -0)

//? Tests: isFinite and isNaN-------------------------------------------->

//* isNaN(value) converts its argument to a number and then tests it for being NaN

console.log(isNaN(NaN)); // true
console.log(isNaN("str")); // true

//* isFinite(value) converts its argument to a number and returns true if it’s a regular number, not NaN/Infinity/-Infinity:

console.log(isFinite("15")); // true
console.log(isFinite("str")); // false, because a special value: NaN
console.log(isFinite(Infinity)); // false, because a special value: Infinity

//! NaN does not equal anything
console.log(NaN === NaN); //false

//! Number.isNaN and Number.isFinite methods are the more “strict” versions of isNaN and isFinite functions. They do not autoconvert their argument into a number, but check if it belongs to the number type instead.

//* Number.isNaN(value) returns true if the argument belongs to the number type and it is NaN. In any other case it returns false

console.log(Number.isNaN(NaN)); // true
console.log(Number.isNaN("str" / 2)); // true

// Note the difference:
console.log(Number.isNaN("str")); // false, because "str" belongs to the string type, not the number type
console.log(isNaN("str")); // true, because isNaN converts string "str" into a number and gets NaN as a result of this conversion

//* Number.isFinite(value) returns true if the argument belongs to the number type and it is not NaN/Infinity/-Infinity. In any other case it returns false.

console.log(Number.isFinite(123)); // true
console.log(Number.isFinite(Infinity)); // false
console.log(Number.isFinite(2 / 0)); // false

// Note the difference:
console.log(Number.isFinite("123")); // false, because "123" belongs to the string type, not the number type
console.log(isFinite("123")); // true, because isFinite converts string "123" into a number 123

//? ************Object.is ----------------------------------------------->

//* Best for 2 edge cases

// 1. Object.is(NaN, NaN) === true
// 2. Object.is(0, -0)    === false    // technically correct, since sign bit will be different
// 3. All other cases => Object.is(a,b) is same as a===b

//? parseInt and parseFloat --------------------------------------------->

//* Numeric conversion using a plus + or Number() is strict, value must be number else fails
//* Hence use the above 2 for values like 12px, 100pt

console.log(parseInt("100px")); // 100
console.log(parseFloat("12.5em")); // 12.5

console.log(parseInt("12.3")); // 12, only the integer part is returned
console.log(parseFloat("12.3.4")); // 12.3, the second point stops the reading
console.log(parseInt("a123")); // NaN, the first symbol stops the process

//? parseInt(str, radix) ----------------------------------->
console.log(parseInt("0xff", 16)); // 255
console.log(parseInt("ff", 16)); // 255, without 0x also works

console.log(parseInt("2n9c", 36)); // 123456

//? Other math functions ----------------------------->

console.log(Math.random()); // 0.1234567894322
console.log(Math.random()); // ... (any random numbers)
console.log(Math.max(3, 5, -10, 0, 1)); // 5
console.log(Math.min(1, 2)); // 1
console.log(Math.pow(2, 10)); // 2 in power 10 = 1024

//! Further readings =======================================>

//* https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number
//* https://indepth.dev/posts/1139/here-is-what-you-need-to-know-about-javascripts-number-type#why-0-1-0-2-is-not-0-3
//* https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math
