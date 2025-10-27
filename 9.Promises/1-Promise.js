//* Namaste JS Promise lecture summary

/*
 * 1. Before promise we used to depend on callback functions which would result in 
 *    1.) Callback Hell (Pyramid of doom) 
 *    2.) Inversion of control -> passing cb fn() to another fn(), making us dependent on it. Whereas when we use .then() we can control when we call the cb(callback) function.
 *    3.) Callback Hell (Pyramid of doom) is a result of inversion of control.
 */
/*
 *   2. Inversion of control is overcome by using promise.
 *       2.1) A promise is an object that represents eventual completion/failure of an asynchronous *operation.
 *       2.2) A promise has 3 states: pending | fulfilled | rejected.
 *       2.3) As soon as promise is fulfilled/rejected => It updates the empty object which is assigned *undefined in pending state.
 *        2.4) A promise resolves only once and it is immutable. 
 *       2.5) Using .then() we can control when we call the cb(callback) function.

 *   3. To avoid callback hell (Pyramid of doom) => We use promise chaining. This way our code expands vertically instead of horizontally. Chaining is done using '.then()'
 *   4. A very common mistake that developers do is not returning a value during chaining of promises. Always remember to return a value. This returned value will be used by the next .then()
 */


// Inversion of control + Callback hell:
/*getData(function(a) {           // You lose control here
    getMoreData(a, function(b) { // More control lost
        getEvenMoreData(b, function(c) { // Pyramid forms
            // You're at the mercy of each function's timing
        });
    });
});

// Promise solution - YOU control the flow:
getData()
    .then(a => getMoreData(a))    // You decide when to call
    .then(b => getEvenMoreData(b)) // You control the chain
    .then(c => console.log(c));   // Clean, readable flow
*/

 //? Important points:--Promises--------------------------------------------

 //"A Promise is like a receipt for something that will happen in the future. You get the receipt immediately, but the actual result comes later."
 //Real-world Analogy:
 //~ You order food online → You get a receipt (Promise) → 
 //~ Food is being prepared (pending state) → 
 //~ Food arrives (fulfilled) or gets cancelled (rejected)


 /**
  * "A Promise represents the eventual result (completion/failure) of an asynchronous operation"
    ~ It's an object that will have a value in the future
    ~ You can attach callbacks to handle success or failure
"Three states: pending, fulfilled, rejected"
    ~ Pending: "I'm working on it"
    ~ Fulfilled: "Done successfully"
    ~ Rejected: "Something went wrong"
"Key benefits over callbacks:"
    ~ No callback hell: Chain operations vertically instead of nesting
    ~ Better error handling: Use .catch() instead of error-first callbacks
    ~ Composable: Easy to combine multiple async operations
  */


//* Creating promises

let promise = new Promise(function(resolve, reject){
    // executor (code)
    // resolve(value) - if the job is finished successfully, call resolve
    // reject(error) - if an error occurs, call reject
    // the executor should do a job (something that takes time) and then call resolve/reject
    // after 1 second signal that the job is done with the result "done"
    setTimeout(()=>resolve("done"),1000);
})
console.log(promise);

//? Promise {<pending>}
//?     [[Prototype]] : Promise
//?         catch: ƒ catch()
//?         constructor: ƒ Promise()
//?         finally: ƒ finally()
//?         then: ƒ then()
//?         Symbol(Symbol.toStringTag): "Promise"
//?         [[Prototype]]: Object
//?     [[PromiseState]]: "fulfilled"
//?     [[PromiseResult]]: "done"

promise.then(function(result){
    console.log(result);
},function(error){
    console.log(error);
});

    
//! In SW, we iterate a tab JSON recursively, identify library nodes and then trigger await getLibraryJSON(). This causes HOL blocking. We await a promise to resolve before moving on to the next iteration.   

//* Detailed explanation on async programming and promises in JS
//* https://www.perplexity.ai/search/so-is-promise-chaining-and-obs-yrbLDSWXTyqVmkaf.Zx4gg [PDF downloaded as well]



//? Promise chaining fundas
// https://www.perplexity.ai/search/can-anybody-please-explain-why-JlyiMVBwSw.ZhEZ5eOhXHg