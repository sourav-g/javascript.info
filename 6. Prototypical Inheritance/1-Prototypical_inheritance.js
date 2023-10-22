//* 'user' object
//* now make 'admin' & 'guest' object

//* Re-use what we have in user, not copy/reimplement methods, just build a new object (admin & guest) on top of it. Prototypal inheritance is a language feature that helps in that.


//? [[Prototype]] -------------------------------------------

// In JS, objects have special hidden propery [[Prototype]]
// which is either null or references another object. This object is called prototype.
// when we read a property from object, and it’s missing, JavaScript automatically takes it from the prototype.

/*
        prototype object
          ^
          |  [[Prototype]]
          |
        object
*/


//? Ways to set [[Prototype]]  ? ----------------------------

//* One of the way is using __proto__  [ historically used ]

let animal = {
    eats:true,
    walk(){
        return 'Animal walking';
    },
    get habitat(){
        return this._habitat;
    },
    set habitat(value){
        this._habitat = value;
    }
}
let rabbit = {
    jumps:true
}
rabbit.__proto__ = animal;
//Object.setPrototypeOf(rabbit,animal);    //! this is the modern way to set prototype of an object
console.log(rabbit.eats);


//! Points to remember : ----------------------------

//* 1. The references can’t go in circles. JavaScript will throw an error if we try to assign __proto__ in a circle.
//* 2. The value of __proto__ can be either an object or null. Other types are ignored.
//* 3. There can be only one [[Prototype]]. An object may not inherit from two others.


//! __proto__ is a historical getter/setter for [[Prototype]]. 
//! __proto__ is not the same as the internal [[Prototype]] property. It’s a getter/setter for [[Prototype]].


//? Writing doesn’t use prototype --------------------------

// The prototype is only used for reading properties.
// Write/delete operations work directly with the object.

rabbit.walk = function(){
    return 'Rabbit walking';
}
console.log(rabbit.walk());
// finds the method immediately in the object and executes it, WITHOUT using the prototype:



//! Accessor properties are an exception, as assignment is handled by a setter function. 
//  So writing to such a property is actually the same as calling a function, a new accessor is NOT Created
//  on the calling object.

rabbit.habitat = 'grasslands';
console.log(rabbit.habitat);    //grasslands   ; state of rabbit modified
console.log(animal.habitat);    //undefined    ; state of animal is protected


//? <<IMPORTANT>> The value of “this” ------------------------------------

// 'this' is not affected by prototypes at all.

//*****  No matter where the method is found: in an object or its prototype. 
//*****  In a method call, this is always the object before the dot.
/*

    We may have a big object with many methods, and have objects that inherit from it. 
    And when the inheriting objects run the inherited methods, they will modify only their own states, 
    not the state of the big object.

    As a result, methods are shared, but the object state is not.
*/


//? for…in loop ----------

// iterates over inherited properties too (only if they are enumerable)

console.log(Object.keys(rabbit)); // [ 'jumps', 'walk', '_habitat' ]
for(prop in rabbit) {
    console.log(prop);  
    // jumps 
    // walk 
    // _habitat 
    // eats       <inherited; data property>
    // habitat    <inherited; accessor property>
}



//? Summary -> Prototype Chain -------------------------------------------

/*

                   null

                    ^
                    |  [[Prototype]]
                    |

                --------------------------------
                | Object.prototype             |
                |    - toString : (){...}      |
                |    - hasOwnProperty : (){...}|
                --------------------------------

                    ^
                    |  [[Prototype]]
                    |

                --------------------------------
                | animal                       |
                |    - eats : true             |
                |    - walk  : (){...}         |
                |    - get habitat(){...}      |
                |    - set habitat(value){...} |
                --------------------------------

                    ^
                    |  [[Prototype]]
                    |
                    
                --------------------------------
                | rabbit                       |
                |    - jumps : true            |
                |    - walk  : (){...}         |
                --------------------------------   

*/