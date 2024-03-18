//? Modern prototype methods ---------------------------------------------------

/*
    Object.getPrototypeOf(obj) – returns the [[Prototype]] of obj.
    Object.setPrototypeOf(obj, proto) – sets the [[Prototype]] of obj to proto.

    Object.create(proto[, descriptors]) – creates an empty object with given proto as [[Prototype]] and optional property descriptors.
*/

let animal = {
    eats : true
}
let rabbit = Object.create(animal); // same as rabbit = { __proto__ : animal }
console.log(rabbit.eats); //true

let tiger = Object.create(animal,{
    isPredator:{
        value:true,
        writable: false        
    }
})
console.log(tiger.isPredator);
tiger.isPredator = false;
console.log(tiger.isPredator);
console.log('***************************************')


//? TRULY exact cloning of an object (shallow copy) ---------------------------------------------

//! This call makes a truly exact copy of obj, including all properties: 
//! enumerable and non-enumerable, data properties and setters/getters – everything, and with the right [[Prototype]].

let cloneAnimal = Object.create(Object.getPrototypeOf(tiger),Object.getOwnPropertyDescriptors(tiger));

console.log(cloneAnimal.eats);
console.log(cloneAnimal.isPredator);


/******************************** */
/*
   --> 'prototype' prop of constructor fn since ancient times.
   --> 2012 :  Object.create introduced
   --> 2015 :  Object.setPrototypeOf and Object.getPrototypeOf. Usage of __proto__ deprecated.
   --> 2022 :  Allowed usage of __proto__ in object literals {...}, BUT NOT as a getter/setter [ obj.__proto__ ] 

*/


//! Changing a prototype “on-the-fly” with Object.setPrototypeOf or obj.__proto__= is a VERY SLOW OPERATION as it breaks internal optimizations for object property access operations. So avoid it unless you know what you’re doing, or JavaScript speed totally doesn’t matter for you.

//? Very plain objects : Implementing Object as a plain key-value store----------------------------

//! Cannot use __proto__ as a user-provided key in object. It will interfere with the prototype
//* Create VERY PLAIN objects, without prototype to do so

let person = Object.create(null);
person['__proto__'] = 'Proto here is a user-defined key';
console.log(person.__proto__);



