
//* setTimeout -> Run a function once after the interval of time.
//* setInterval -> Run a function repeatedly, starting after the interval of time, then repeating continuously at that interval.

//! NOT PART OF JS Specs. Part of browsers and envs.

//? setTimeout ----------------------------------------->

//* let timerId = setTimeout(func|code, [delay(ms)], [arg1], [arg2], ...)

function sayHi(phrase, who) {
    console.log( phrase + ', ' + who );
}
  
let timerId = setTimeout(sayHi, 1000, "Hello", "John"); // Hello, John [ after 1 sec ]
clearTimeout(timerId);

// timerId - number ; in browser
// timerId - timer Object with methods ; in Node.js


//? setInterval ----------------------------------------->

//* let timerId = setInterval(func|code, [delay], [arg1], [arg2], ...)

// Repeat every 1 s

// let counter = 1;
// timerId = setInterval(()=>{
//     console.log('Tick '+counter);
//     counter++
// },1000); 

// Stop after 6 s

// setTimeout(()=>clearInterval(timerId),6000); 


//? [ **** ] Nested setTimeout ------------------------------------------------------->
//? https://javascript.info/settimeout-setinterval#setinterval

//* 2 ways of running something regularly
// 1. setInterval
// 2. Nested setTimeout

let delay = 1000;
counter = 1;
timerId = setTimeout(function tick() {
    console.log('Tick '+counter);
    counter++;
    delay = delay * 2;                 //* Possibility to change delay based on use-case
    timerId = setTimeout(tick,delay);  //  Schedule next call right at the end of first call
},delay);

setTimeout(()=>clearTimeout(timerId),8000);

//* The nested setTimeout is a more flexible method than setInterval. 
//* This way the next call may be scheduled differently, depending on the results of the current one.
//* Nested setTimeout allows to set the delay between the executions more precisely than setInterval.


//? [ **** ] Comparison ------------------------------->

let i = 1;
setInterval(function() {
  func(i++);              // Time taken by Func execution consumes a part of the interval, since scheduler keeps running.
}, 100);                  // Hence, real delay b/w func calls will be less than 100


i = 1;
setTimeout(function run() {
  func(i++);
  setTimeout(run, 100);   // `Guarantees` the fixed delay, since a new call is planned only once the prev func exec is completed
}, 100);


//? Garbage collection and setInterval/setTimeout callback --------->
/*
    When a function is passed in setInterval/setTimeout, an internal reference is created to it and saved in the scheduler. It prevents the function from being garbage collected, even if there are no other references to it.

    --> the function stays in memory until the scheduler calls it
    setTimeout(function() {...}, 100);

    For setInterval the function stays in memory until clearInterval is called.

    There’s a side effect. A function references the outer lexical environment, so, while it lives, outer variables live too. They may take much more memory than the function itself. So when we don’t need the scheduled function anymore, it’s better to cancel it, even if it’s very small.
*/

//? Zero delay setTimeout --------------------->

setTimeout(func, 0);

//* This schedules the execution of func as soon as possible. 
//* But the scheduler will invoke it only after the currently executing script is complete.

//! Event loop: microtasks and macrotasks.
//! https://javascript.info/settimeout-setinterval#zero-delay-settimeout