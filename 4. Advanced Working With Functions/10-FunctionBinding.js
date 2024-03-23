//? Losing “this” -------------->

//* Once a method is passed somewhere separately from the object – `this` is lost.

let user = {
    name : 'Sourav',
    sayHi(){
        console.log(`Hello ${this.name}`);
    }
}

setTimeout(user.sayHi,1000); // Hello undefined
//!OR
let fn = user.sayHi;
setTimeout(fn, 1000);         // Hello undefined

//* Lost user context in above cases
//* setTimeout uses this=window for the function call above.

//? HOW TO PASS OBJECT METHOD SOMEWHERE WITHOUT LOSING CONTEXT ? -------------------------->

//* 1. A wrapper fn [gets object from the outer lexical env]

setTimeout(function() {
    user.sayHi(); // Hello Sourav
}, 1000);

//! If the object changes like below, setTimeout will take that instead
/*user = {
    name : 'Vickey',
    sayHi(){
        console.log(`Hello ${this.name}`);
    }
}*/

//* 2. Use `bind` to fix `this`

person = {
    name : 'Sampa'
}
function sayHi(phrase){
    console.log(`${phrase} ${this.name}`);  // Hello Sampa
}
boundSayHi = sayHi.bind(person);
setTimeout(()=> boundSayHi('Hello'),2000);

//! This has NO impact in above execution, since function is already bound to previous
//! person context
/*person = {
    name : 'Ghosh'
}*/

//? Convenient mass binding of all object methods ---------->

let student = {
    name : 'Sam',
    roll : 65,
    id   : 'JC2345',
    city : 'Mumbai',
    getAddress(){
        return this.city;
    },
    getEnrollmentID(){
        return this.id;
    }
}

for(let prop in student){
    if(typeof student[prop] == 'function'){
        student[prop] = student[prop].bind(student);
    }
}

setTimeout(()=>{
    console.log(student.getAddress());
    console.log(student.getEnrollmentID());
},3000);


//? Partial function application --------->

//* We can bind not only this, but also arguments.

//  let bound = func.bind(context, [arg1], [arg2], ...);

function muliply(a, b) {
    return a * b;
}
let double = muliply.bind(null,2);

console.log(double(2));  //4
console.log(double(3));  //6
console.log(double(4));  //8

//* Partial application is useful when we have a very generic function and want a less universal variant of it for convenience.

//? Partial function application without context ------------------>

// What if we’d like to fix some arguments, but not the context this?
// native bind does not allow that. Passing context is mandatory
// Write custom fn to bind only arguments.

user = {
    firstName : 'Sourav',
    middleName : 'Kumar',
    lastName  : 'Ghosh',
    sayHi(time,message){
        console.log(`[${time}] ${this.firstName} : ${message} !`);
    }  
}

console.log('this 0',this);   //! Window

user.sayHiNow = wrapper(user.sayHi, new Date().getHours()+' : '+new Date().getMinutes());

function wrapper(originalFunc,...argsBound){
    console.log('this 1',this);   //! Window
    return function(...args){
        console.log('this 2',this);   //! User [in this example]
        return originalFunc.call(this, ...argsBound, ...args);
    }
}

user.sayHiNow('Hi, Whats up');