//* There are 2 kinds of properties

//* 1. Data properties     [ most common ]
//* 2. Accessor properties [ essentially functions which executes on getting and setting a value ]

//? Getters & Setters --------------------------------

let user = {
  name: "Sourav",
  surName: "Ghosh",
  get fullName() {
    return `${this.name} ${this.surName}`;
  },
  set fullName(value) {
    [this.name, this.surName] = value.split(" ");
  },
};
console.log(user.fullName);       // Sourav Ghosh
user.fullName = "Vickey Ghosh";
console.log(user.fullName);       // Vickey Ghosh
console.log(user.name);           // Vickey

//* We have a “virtual” property fullName. It is readable and writable.
//* Here, data properties   - name & surName
//*       accessor property - fullName
//! A property can be either, and NOT both


//? Accessor descriptors------------------------------

//* No value or writable
//* Only get,set funcions and enumerable,configurable

user = {
  name: "John",
  surname: "Smith"
};

Object.defineProperty(user, 'fullName', {
  get() {
    return `${this.name} ${this.surname}`;
  },
  set(value) {
    [this.name, this.surname] = value.split(" ");
  },
  enumerable:true
});

for(let key in user) console.log(key);


//? Smarter getters/setters ---------------------------

//* Getters/setters can be used as wrappers over “real” property values to gain more control over operations with them.

user = {
  get name(){
    return this._name;
  },
  set name(value){
    if(value.length < 5){
      console.log("Too short name Not allowed");
      return;
    }
    this._name = value;
  }
}
user.name = 'Tina';
console.log(user.name); // undefined
user.name = 'Sourav';
console.log(user.name); // Sourav

//? Using for compatibility ----------------------------

// * One of the great uses of accessors is that they allow to take control over a “regular” data property at any moment by replacing it with a getter and a setter and tweak its behavior.

function User(name, age) {
  this.name = name;
  this.age = age;
}
let john = new User("John", 25);
alert( john.age ); // 25

//! What if we want to store birthday now and Not age ?
//* ANS : Store birthday and make 'age' an accessor property. This way, old code which uses age still works

function User(name, birthday) {
  this.name = name;
  this.birthday = birthday;

  // age is calculated from the current date and birthday
  Object.defineProperty(this, "age", {
    get() {
      let todayYear = new Date().getFullYear();
      return todayYear - this.birthday.getFullYear();
    }
  });
}