//? String Conversion

//-> Occurs when we output something. Can be performed with String(value). The conversion to string is usually obvious for primitive values.

//? Numeric Conversion

//-> Occurs in math operations. Can be performed with Number(value).
/*

Value	         Becomes…
------------------------------
undefined	 :   NaN
null	     :    0
true / false :	1 / 0
string	     :    The string is read “as is”, whitespaces (includes spaces, tabs \t, newlines \n etc.) from both sides are ignored. An empty string becomes 0. An error gives NaN.

*/

//? Boolean Conversion

//-> Occurs in logical operations. Can be performed with Boolean(value).
/*

Value	                         Becomes…
------------------------------------------
0, null, undefined, NaN, ""	:    false
any other value	            :    true

*/

//! EXCEPTIONS ------->

//! undefined is NaN as a number, not 0.
//! "0" and space-only strings like " " are true as a boolean.
