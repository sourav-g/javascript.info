//* 8 basic data types

//* string, number, boolean, objects, BigInt, symbols, null, undefined.

//? number
//-> both integer and floating point numbers. Besides regular numbers, there are so-called “special numeric values” which also belong to this data type: Infinity, -Infinity and NaN.
//-> NaN is sticky. Any further mathematical operation on NaN returns NaN

//? BigInt
//-> In JavaScript, the “number” type cannot safely represent integer values larger than (2^53-1) (that’s 9007199254740991), or less than       -(2^53-1) for negatives.
//-> To be really precise, the “number” type can store larger integers (up to 1.7976931348623157 * 10308), but outside of the safe integer range ±(253-1) there’ll be a precision error, because not all digits fit into the fixed 64-bit storage. So an “approximate” value may be stored.

const bigInt = 1234567890123456789012345678901234567890n;

//? string

//? boolean

//? null
//-> In JavaScript, null is not a “reference to a non-existing object” or a “null pointer” like in some other languages.It’s just a special value which represents “nothing”, “empty” or “value unknown”.

//? undefined
//-> The special value undefined also stands apart. It makes a type of its own, just like null.The meaning of undefined is “value is not assigned”.

//? Objects
//-> Objects are used to store collections of data and more complex entities.

//? Symbols
//-> The symbol type is used to create unique identifiers for objects.

//* Read -->

//! https://en.wikipedia.org/wiki/Double-precision_floating-point_format
