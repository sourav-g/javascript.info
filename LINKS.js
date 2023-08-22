//? JS Array sort performance & stability

//https://stackoverflow.com/questions/14677060/400x-sorting-speedup-by-switching-a-localecompareb-to-ab-1ab10
//https://blog.vjeux.com/2009/javascript/speed-up-javascript-sort.html
//https://medium.com/@fsufitch/is-javascript-array-sort-stable-46b90822543f

//? Ecmascript version history

//https://webreference.com/javascript/basics/versions/

//? Types of error in JS

//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Errors
//https://blog.bitsrc.io/types-of-native-errors-in-javascript-you-must-know-b8238d40e492

//! pass by value / pass by reference

//? JS Loop comparisons

//https://blog.bitsrc.io/measuring-performance-of-different-javascript-loop-types-c0e9b1d193ed
//https://manumagalhaes.medium.com/comparing-js-iteration-methods-map-filter-foreach-reduce-loops-f83323663ccb


//? Object check 

// https://www.geeksforgeeks.org/how-to-check-if-a-value-is-object-like-in-javascript/

// function isActualObject(value){
//     return Object.prototype.toString.call(value)==='[object Object]';
// }

//? Recursion is TOUGH
//? Recursion vs Iteration

// Recursion is a very useful technique in tree-related algorithms. Divide and Conquer strategy also uses recursion. A key advantage of recursion is that it is remembering the past with the help of call stack structure. Thus those sub problems which can be solved using recursive strategy may be overlapped on each other. Therefore some kind of cache can be introduced in order to reduce excessive function calls which leads to the higher time complexity of the specific algorithm. Dynamic Programming(aka DP) is known as this caching mechanism.