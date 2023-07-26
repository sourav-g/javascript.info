//As it treats null and undefined similarly, we’ll use a special term here, in this article. For brevity, we’ll say that a value is “defined” when it’s neither null nor undefined.

result = a ?? b;
result = a !== null && a !== undefined ? a : b;

//* In other words, ?? returns the first argument if it’s not null/undefined. Otherwise, the second one.

//? Common use-case -> provide a default value

let user = "John";
alert(user ?? "Anonymous"); // John (user is not null/undefined)

let nickName = "Supercoder";

// shows the first "defined" value:
alert(firstName ?? lastName ?? nickName ?? "Anonymous"); // Supercoder
// shows the first "truthy" value:
alert(firstName || lastName || nickName || "Anonymous"); // Supercoder

//!In other words, || doesn’t distinguish between false, 0, an empty string "" and null/undefined.
//~They are all the same – falsy values. In practice though, we may want to use default value only when the variable is null/undefined

let height = 0;

alert(height || 100); // 100
alert(height ?? 100); // 0

//? Precedence

//* precedence of the ?? and || are same

//? Using ?? with && or ||

//! It’s forbidden to use it with || or && without explicit parentheses.
let x = 1 && 2 ?? 3; // Syntax error
let y = (1 && 2) ?? 3; // Works