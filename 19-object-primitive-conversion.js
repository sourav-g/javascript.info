//! ***********TRICKY TOPIC **********=>

//  How an object converts to primitive and how to customize it ?

//? Conversion rules -> object to primitives [boolean, number, string]

//* To boolean -> No conversion to boolean. All objects true in boolean context
//* To number  -> When subtract objects or apply math
//* To string  -> When o/p an object with console.log() & similar contexts

//~ We can implement string and numeric conversion by ourselves, using special object methods.

//? How does JavaScript decide which conversion to apply? ---"Using Hints"----->

/*

   3 types of type conversion called hints

   => "string" cases :
       
   console.log(obj);
   anotherObj[obj] = 123;


   => "number" cases (maths):

    let num = Number(obj);          //explicit
    let n = +obj;                   //unary plus; (except binary plus)
    let delta = date1 - date2;
    let greater = user1 > user2;    
    
    / gotcha!! Works with both string and number, but does not use default


   => "default" cases (rare, when operator NOT SURE what type to expect):

    / binary plus uses the "default" hint
    let total = obj1 + obj2;
    
    / obj == number uses the "default" hint
    if (user == 1) { ... };
   */

//? To do the conversion, JavaScript tries to find and call three object methods:

/*  ***************** Conversion Algorithm ************************

    1) Call obj[Symbol.toPrimitive](hint) 
           the method with the symbolic key Symbol.toPrimitive (system symbol), if such method exists,

    2) Otherwise if hint is "string"
           try calling obj.toString() or obj.valueOf(), whatever exists.

    3) Otherwise if hint is "number" or "default"
           try calling obj.valueOf() or obj.toString(), whatever exists.

******************************************************************************/

let obj = {};
obj[Symbol.toPrimitive] = function (hint) {
  // here goes the code to convert this object to a primitive
  // it must return a primitive value
  // hint = one of "string", "number", "default"
};

let user = {
  name: "John",
  money: 1000,

  [Symbol.toPrimitive]: function (hint) {
    // return {};                           //!TypeError: Cannot convert object to primitive value
    console.log(`hint: ${hint}`);
    return hint == "string" ? `{name: "${this.name}"}` : this.money;
  },
};

// conversions demo:
alert(user); // hint: string -> {name: "John"}
console.log(user); // shows as object
console.log(+user); // hint: number -> 1000
console.log(user + 500); // hint: default -> 1500
console.log(user.valueOf() === user); // true ; since `by default` valueOf() returns the obj itself

//? toString/valueOf------------------------------------>

//~ If there’s no Symbol.toPrimitive then JavaScript tries to find methods toString and valueOf:
//  They provide an alternative “old-style” way to implement the conversion.

// For string      -> toString() --> [ if not exist/returned obj ] --> valueOf() --> [returns obj] -> ignored
// For other hints -> valueOf() -->  [ if not exist/returned obj ] --> toString()--> [returns obj] -> ignored

//* By default, a plain object has following toString and valueOf methods:

//The toString method returns a string "[object Object]".
//The valueOf method returns the object itself.

user = { name: "John" };

console.log(user); // [object Object]
console.log(user.valueOf() === user); // true

//? Without using Symbol.toPrimitive

user = {
  name: "John",
  money: 1000,

  // for hint="string"
  toString() {
    return `{name: "${this.name}"}`;
  },

  // for hint="number" or "default"
  valueOf() {
    return this.money;
  },
};

alert(user); // toString -> {name: "John"}
console.log(user); // shows as object
console.log(+user); // valueOf -> 1000
console.log(user + 500); // valueOf -> 1500

//? Further conversions

/*

If we pass an object as an argument, then there are two stages of calculations:

The object is converted to a primitive (using the rules described above).
If necessary for further calculations, the resulting primitive is also converted.

*/

obj = {
  // toString handles all conversions in the absence of other methods
  toString() {
    return "2";
  },
};

console.log(obj * 2); // 4, object converted to primitive "2", then multiplication made it a number
