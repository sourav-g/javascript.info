//? Losing “this” -------------->

//* Once a method is passed somewhere separately from the object – this is lost.

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
    name : 'Tanesha',
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


student = {
    name : 'Tanesha',
    roll : 23,
    id   : '678',
    city : 'Guwahati',
    getAddress(){
        return this.city;
    },
    getEnrollmentID(){
        return this.id;
    }
}