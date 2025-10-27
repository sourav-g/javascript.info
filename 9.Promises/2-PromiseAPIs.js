/*
There are 6 static methods of Promise class:

?Promise.all(promises) – waits for all promises to resolve and returns an array of their results. If any of the given promises rejects, it becomes the error of Promise.all, and all other results are ignored.

?Promise.allSettled(promises) (recently added method) – waits for all promises to settle and returns their results as an array of objects with:
   *status: "fulfilled" or "rejected"
   *value (if fulfilled) or reason (if rejected).

?Promise.race(promises) – waits for the first promise to settle, and its result/error becomes the outcome.
    * first settled promise wins

?Promise.any(promises) (recently added method) – waits for the first promise to fulfill, and its result becomes the outcome. If all of the given promises are rejected, AggregateError becomes the error of Promise.any.
    * first successful promise [ sucess seeking API ]
    ! all promises must be rejected to get --> AggregateError : All promises were rejected

?Promise.resolve(value) – makes a resolved promise with the given value.

?Promise.reject(error) – makes a rejected promise with the given error.

Of all these, ?Promise.all is probably the most common in practice.
*/


/*
*Interview Question: "How does Promise.all work, and does it execute promises in parallel?"

Here’s a model answer:

"Promise.all is a static method that takes an array of promises and returns a single new promise. This new promise fulfills when all of the input promises have fulfilled, and its result is an array of their resolved values, in the same order. If any of the input promises reject, the Promise.all immediately rejects with the reason of the first one that failed.

Now, regarding parallelism—this is a common point of confusion. 
!Promise.all enables concurrency, not true parallelism.

The distinction is that JavaScript's main event loop is single-threaded. When you use Promise.all with asynchronous operations like fetch or setTimeout, it kicks them all off concurrently. These I/O-bound tasks are handed off to the browser's Web APIs to run in the background. The main thread isn't blocked and can continue working. This is highly efficient for managing multiple async tasks at once.

However, if one of your promises contains a long-running, synchronous CPU-bound task, like a heavy calculation in a loop, it will block the main thread. Because there's only one thread, nothing else can run until that synchronous task is finished—not even the callbacks from other promises that have already completed.

So, in short: Promise.all is for running multiple asynchronous operations concurrently and waiting for all of them to finish. It does not provide true multi-threading for your JavaScript code."
*/

/*
The code inside a promise's executor function runs synchronously and immediately upon creation. It is a common misconception that everything inside new Promise is automatically asynchronous.​

*The primary purpose of a promise is to handle the result of an operation that "might be" asynchronous. The executor's job is to start that operation, whether it's synchronous or asynchronous

*/
