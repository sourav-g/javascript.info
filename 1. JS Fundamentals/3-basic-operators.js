//? unary, binary, operand
//?---------------------------------
/*
    Addition +,
    Subtraction -,
    Multiplication *,
    Division /,
    Remainder %,
    Exponentiation **.
*/

//? String concatenation with binary +
//?-----------------------------------------
// if any of the operands is a string, then the other one is converted to a string too. "STRING has PRIORITY"

alert("1" + 2); // "12"
alert(2 + "1"); // "21"
alert(2 + 2 + "1"); // "41" and not "221"
alert("1" + 2 + 2); // "122" and not "14"

//Here, the first operand is a string, the compiler treats the other two operands as strings too. The 2 gets concatenated to '1', so it’s like '1' + 2 = "12" and "12" + 2 = "122".

//!The binary + is the only operator that supports strings in such a way. Other arithmetic operators work only with numbers and always convert their operands to numbers.

alert(6 - "2"); // 4, converts '2' to a number
alert("6" / "2"); // 3, converts both operands to numbers

//? Numeric conversion, unary +
//?----------------------------------------
// The plus + exists in two forms: the binary form that we used above and the unary form. The unary plus or, in other words, the plus operator + applied to a single value, doesn’t do anything to numbers. But if the operand is not a number, the unary plus converts it into a number.
// It actually does the same thing as Number(...), but is shorter.

// No effect on numbers
let x = 1;
alert(+x); // 1

let y = -2;
alert(+y); // -2

// Converts non-numbers
alert(+true); // 1
alert(+""); // 0

//? Bitwise operators
//?----------------------------------------

//Bitwise operators treat arguments as 32-bit integer numbers and work on the level of their binary representation.

/*
    AND ( & )
    OR ( | )
    XOR ( ^ )
    NOT ( ~ )
    LEFT SHIFT ( << )
    RIGHT SHIFT ( >> )
    ZERO-FILL RIGHT SHIFT ( >>> )
*/

//? Comma
//?----------------------------------------
//The comma operator allows us to evaluate several expressions, dividing them with a comma ,. Each of them is evaluated but only the result of the last one is returned.
let a = (1 + 2, 3 + 4);
alert(a); // 7 (the result of 3 + 4)

(a = 1 + 2), 3 + 4;
alert(a); // 3 (since comma has lowest precedence)

/*
"" + 1 + 0 = "10" // (1)
"" - 1 + 0 = -1 // (2)
true + false = 1
6 / "3" = 2
"2" * "3" = 6
4 + 5 + "px" = "9px"
"$" + 4 + 5 = "$45"
"4" - 2 = 2
"4px" - 2 = NaN
"  -9  " + 5 = "  -9  5" // (3)
"  -9  " - 5 = -14 // (4)
null + 1 = 1 // (5)
undefined + 1 = NaN // (6)
" \t \n" - 2 = -2 // (7)
*/

" \t \n" - 2 = -2 

//!Space characters are trimmed off string start and end when a string is converted to a number. Here the whole string consists of space characters, such as \t, \n and a “regular” space between them. So, similarly to an empty string, it becomes 0.