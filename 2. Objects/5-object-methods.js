//A function that is a property of an object is called its method.

//? “this” in methods---------------------->

let user = {
  name: "John",
  age: 30,

  sayHi() {
    // "this" is the "current object"
    // The value of this is the object “before dot”, the one used to call the method.
    alert(this.name);
  },
};

user.sayHi(); // John

//? “this” is not bound in JS unlike other languages--------------------->

//The value of this is evaluated during the run-time, depending on the context.

//? Arrow functions have no “this”

// Arrow functions are special: they don’t have their “own” this. If we reference this from such a function, it’s taken from the outer “normal” function.
// it’s useful when we actually do not want to have a separate this, but rather to take it from the outer context.

user = {
  firstName: "Ilya",
  sayHi() {
    let arrow = () => alert(this.firstName);
    arrow();
  },
};

user.sayHi(); // Ilya
