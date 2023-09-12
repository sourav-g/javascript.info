/*
    let func = new Function ([arg1, arg2, ...argN], functionBody);
*/

let sum = new Function('a','b','return a + b');
console.log(sum(1,2));

let func = new Function('console.log(\'ICC Cricket World Cup 2023\');return 1;');
console.log(func()); 

//* USE-CASES :

//* Allows to turn any string into a function. 
//* For example, we can receive a new function from a server and then execute it.
//* To dynamically compile a function from a template.

/*
    let str = ... receive the code from a server dynamically ...
    let func = new Function(str);
    func();
*/

//?  Closure --------------------------------------------------------

// But when a function is created using new Function, its [[Environment]] is set to reference not the current Lexical Environment, but the global one.

function getFunc() {
    let value = "test";
    let func = new Function('alert(value)');  
    return func;
}
getFunc()(); // error: value is not defined

// Regular behaviour

function getFunc() {
    let value = "test";
    let func = function() { alert(value); };
    return func;
}
getFunc()(); // "test", from the Lexical Environment of getFunc


/*
    So if new Function had access to outer variables, it would be unable to find renamed userName.
    If new Function had access to outer variables, it would have problems with minifiers.
    Besides, such code would be architecturally bad and prone to errors.
    To pass something to a function, created as new Function, we should use its arguments.
*/