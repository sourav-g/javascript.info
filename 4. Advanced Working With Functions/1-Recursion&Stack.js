//* Recursion is a programming pattern that is useful in situations when a task can be naturally split into several tasks of the same kind, but simpler.

//~ Example : pow(x,n) -> pow(2,3) = 2 * 2 * 2

//? Iterative-------------------------------

function pow(x,n){
    let result = 1;
    for(let i=0; i<n; i++){
        result = result * x;
    }
    return result;
}
console.log(pow(2,3));     // 8

//? Recursive-------------------------------

//~ pow_r(2,3) = (pow_r(2,2) * pow_r(2,1))
//  Recursion Depth : n

function pow_r(x,n){
    if(n==1){
        return x;
    }else{
        return x * pow_r(x,n-1);
    }
}
console.log(pow_r(2,3));   // 8 ; 

//* The maximal number of nested calls (including the first one) is called recursion depth.
//* The maximal recursion depth is limited by JavaScript engine.  [ ~ 10000 reliable ]


//? The Execution Context & Stack----------------

/*

    --> The information about the process of execution of a running function is stored in its execution context.

    --> The execution context is an internal data structure that contains details about the execution of a function: where the control flow is now, the current variables, the value of this (we don’t use it here) and few other internal details.

    --> One function call has exactly one execution context associated with it.

    --> When a function makes a nested call, the following happens:

    --> The current function is paused.
    --> The execution context associated with it is remembered in a special data structure called execution context stack.
    --> The nested call executes.
    --> After it ends, the old execution context is retrieved from the stack, and the outer function is resumed from where it stopped.

*/


//? Recursive traversals---------------------------------

//* Use Case -> calculate sum in a nested tree
//* Write a function to get the sum of all salaries

let company = {
    sales: [{
      name: 'John',
      salary: 1000
    }, {
      name: 'Alice',
      salary: 1600
    }],
  
    development: {
      sites: [{
        name: 'Peter',
        salary: 2000
      }, {
        name: 'Alex',
        salary: 1800
      }],
  
      internals: [{
        name: 'Jack',
        salary: 1300
      }]
    }
};

//! Approach 1 -> First Iteration over root & n level object 
//!            -> Inside if/else for array/object
//! SIDE EFFECT - Sum variable is maintained outside

let totalSalary = 0;
function calculateTotalSalary(object){
    for(let prop in object){
        const value = object[prop];
        if(Array.isArray(value)){
            totalSalary += value.reduce((acc,employee)=>{
                acc += employee.salary;
                return acc;
            },0);
        }else{
            calculateTotalSalary(value);
        }
    }
}
calculateTotalSalary(company);
console.log(totalSalary);

//! Approach 2 -> First if/else for array/object at root & n level object 
//!            -> Inside iteration for object, sum for array

function sumSalaries(department) {
    if (Array.isArray(department)) { 
      return department.reduce((prev, current) => prev + current.salary, 0); // sum the array
    } else { 
      let sum = 0;
      for (let subdep of Object.values(department)) {
        sum += sumSalaries(subdep); // recursively call for subdepartments, sum the results
      }
      return sum;
    }
}
console.log(sumSalaries(company));


//? Recursive structures ---------------------------


//* Use-case : Store ordered list of objects
// let arr = [obj1, obj2, obj3];

// Problem with arrays -

// Delete and insert element are expensive. o(n) -> Use Linked List -> For implementing queue
// Operating with the end (push/pop) is FAST. Stack implementation using array is fine

let list = {
    value: 1,
    next: {
      value: 2,
      next: {
        value: 3,
        next: {
          value: 4,
          next: null
        }
      }
    }
  };

list = { value: 1 };
list.next = { value: 2 };
list.next.next = { value: 3 };
list.next.next.next = { value: 4 };
list.next.next.next.next = null;




//The list can be easily split into multiple parts and later joined back:

let secondList = list.next.next;
list.next.next = null;

//For instance, to prepend a new value, we need to update the head of the list:

list = { value: 1 };
list.next = { value: 2 };
list.next.next = { value: 3 };
list.next.next.next = { value: 4 };

// prepend the new value to the list
list = { value: "new item", next: list };

// To remove a value from the middle, change next of the previous one:

list.next = list.next.next;

//! But search is slow in Linked List. Since no direct access similar to array
// But implementing queue/dequeue -> ordered structure which allows fast insertion/deletion
// from BOTH ends are more important. Acccessing value from middle of queue is NOT needed