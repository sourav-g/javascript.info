// The "prototype" property is widely used by the core of JavaScript itself. 
// All built-in constructor functions use it.


//? Object.prototype --------

//* obj = {} is the same as obj = new Object(), 
//* where Object is a built-in object constructor function, with its own prototype referencing a huge object with toString and other methods.


/*

                 prototype
        Object  ---------->  Object.prototype
  <constructor fn>              - constructor : Objectp
                                - toString : func(){...}
  
                                ^
                                | [[Prototype]]
                                |    

                             obj = new Object()
                             obj = {}   

*/                                