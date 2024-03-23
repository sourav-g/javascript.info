class User{
    constructor(name){
        this.name = name;
    }
    sayHi(){
        console.log(this.name);
    }
}

let user = new User('Sourav');
user.sayHi();


//? What class does behind-the-scenes in JS ? -----------------------------

//* 1. Creates a function named User, and the function content is taken from the constructor, if any
//* 2. Stores class methods in User.prototype

console.log(typeof User);  //function
console.log(User === User.prototype.constructor);  //true
console.log(Object.getOwnPropertyNames(User.prototype));  // constructor, sayHi


//? Important differences between using Class vs Function constructor approach ------

//* 1. Function created by class is labelled by a special internal property [[IsClassConstructor]] : true
//* 2. Unlike a regular function, it must be called with `new`.
//* 3. Class methods are non-enumerable. Sets enumerable:false for all methods in prototype.
//* 4. Always use strict.


//? Class expression ----------------------------------

//! Just like functions, classes can be defined inside another expression, passed around, returned, assigned, etc. 

let Person = class {
    sayHi(){
        console.log("Hello");
    }
}

let sourav = new Person();
sourav.sayHi();

//! We can even make classes dynamically on-demand.

function makeClass(phrase){
    return class{
        constructor(name){
            this.name = name;
        }
        sayHi(){
            console.log(`Hi ${this.name}, ${phrase}`)
        }
    }
}

let Girl = makeClass("you're beautiful !!");
let tanesha = new Girl("Tanesha");
tanesha.sayHi();

//? Getters/setters -----------------------------------------


class Human {

    //* class fields, they are set on individual objects and NOT on prototypes
    age = 32;

    constructor(name) {
      // invokes the setter
      this.name = name;
    }

    //* Created in Human.prototype
    get name() {                              
      return this._name;
    }

    //* Created in Human.prototype
    set name(value) {
      if (value.length < 4) {
        console.log("Name is too short.");
        return;
      }
      this._name = value;
    }

    //* Computed Names
    ['say' + 'Hi']() {
        console.log("Hello");
    }
  
  }
  
  user = new Human("John");
  console.log(user.name); // invokes the getter; value --> John
  user.name = 'a';        // invokes the setter    
  user = new Human("");   // Name is too short.
  

  //? Making bound methods with class fields -----------------------

  //* Functions in JavaScript have a dynamic this. It depends on the context of the call.
  //! So if an object method is passed around and called in another context, this won’t be a reference to its object any more. The problem is called "losing this".

  //* Approaches to Fix :
  /*
    1. Pass a wrapper-function, such as setTimeout(() => button.click(), 1000).
    2. Bind the method to object, e.g. in the constructor.
    3. Make the method attach to object, instead of prototype. (easy way)
  */

class Button {
    constructor(value) {
        this.value = value;
    }

    //* Method attaches to 'each object'
    //* ( since arrow functions dont have 'this', taken from outer)
    click = () => {
        console.log('click',this);  
    }

    //* Method attaches to 'each object'
    blur = function(){
        console.log('blur',this);  
    }

    //* Method attaches to Prototype
    hover(){
        console.log('hover',this);  
    }

    
}

let button = new Button("hello");
button.click();  // Button
button.blur();   // Button
button.hover();  // Button
setTimeout(button.click, 1000); // Button
setTimeout(button.blur, 1500); // window
setTimeout(button.hover, 2000); // window


//setTimeout('console.log(333)', 3000); // undefined , but evals to 333 in browser
