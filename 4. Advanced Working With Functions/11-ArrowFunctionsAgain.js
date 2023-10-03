//* JavaScript is full of situations where we need to write a small function that’s executed somewhere else.
//* It’s in the very spirit of JavaScript to create a function and pass it somewhere.
//* And in such functions we usually don’t want to leave the current context. That’s where arrow functions come in handy.


//? Arrow funtions have no 'this' ------------------------------------------------->
//* Arrow functions cannot be used as constructors, cant run with new


let group = {
    title: "Our Group",
    students: ["John", "Pete", "Alice"],
  
    showList() {
      this.students.forEach(
        //* Arrow functions dont have this, taken from outer.
        student => alert(this.title + ': ' + student)  
      );
    },

    showListRegular() {
        this.students.forEach(function(student) {
          //! Error: Cannot read property 'title' of undefined
          //* Since forEach runs functions with this=undefined by default.
          //* That doesn’t affect arrow functions, because they just don’t have this.
          alert(this.title + ': ' + student);  
        });
    }
};


//? Arrow functions do not have 'arguments' variable -------------------------------->

// That’s great for decorators, when we need to forward a call with the current this and arguments.

function defer(f, ms) {
    return function() {
      setTimeout(() => f.apply(this, arguments), ms);
    };
  }
  
  function sayHi(who) {
    alert('Hello, ' + who);
  }
  
  let sayHiDeferred = defer(sayHi, 2000);
  sayHiDeferred("John"); // Hello, John after 2 seconds


//The same without an arrow function would look like:

function defer(f, ms) {
  return function(...args) {
    let ctx = this;
    setTimeout(function() {
      return f.apply(ctx, args);
    }, ms);
  };
}






