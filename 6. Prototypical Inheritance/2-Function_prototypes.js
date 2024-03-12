//? "prototype" property of the "constructor" function


let animal = {
   eats : true,
   runs : false
}

//! constructor function

function Rabbit(name){
    this.name = name;
}

Rabbit.prototype = animal; //! When a new rabbit is created, assign its [[Prototype]] to animal

//! creating a new rabbit object
 
let rabbit = new Rabbit('pichu');
console.log(rabbit.eats);


/*
    Rabbit  -----prototype----->    animal

                                      ^
                                      |
                                      | [[Prototype]]
                                      |
                                      |

                                    rabbit  
*/


//* F.prototype `regular` property is used only when new F() is called, to assign the [[Prototype]] of new object.
//* If after object creation, the F.prototype changes. The old object's prototypes DO NOT change.


//? Default F.prototype -----------------------------------

//* The default "prototype" is an object with only property "constructor", that points back to the function itself.

function Tiger(name){
    this.name = name;
}

//default 
//*Tiger.prototype = {constructor:Tiger};
console.log( Tiger.prototype.constructor === Tiger );

let bengalTiger = new Tiger("b_Tiger");
console.log( bengalTiger.constructor === Tiger );

//* We can use constructor property to create a new object using the same constructor as the existing one.

let northBengalTiger = new bengalTiger.constructor("nb_Tiger");

//* That’s handy when we have an object, don’t know which constructor was used for it (e.g. it comes from a 3rd party library), and we need to create another one of the same kind.