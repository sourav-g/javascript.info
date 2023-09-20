//? Functions in JS can be -

//* 1. passed around
//* 2. used as objects [ attach properties ]
//* 3. forward calls between functions [ wrapper and actual func ]
//* 4. decorate them [ wrapper ]

//? Memoize functions -> Transparent caching
//? Memoizing specifically involves caching the return values of a function
//! https://www.freecodecamp.org/news/understanding-memoize-in-javascript-51d07d19430e/

function slow(...args){
    console.log(args);
    console.log('Running --> CPU heavy task');
    for(let i=0; i<1_00_000; i++){}
    return args;
}

function generateHash(args){
    args = args.join('**');   //* hashing func will vary depending on i/p complexity
    return args;
}

function cachingDecorator(func){
    let cache = new Map();
    return function(...args){
        let key = generateHash(args);
        console.log(key);
        if(cache.has(key)){
            console.log('From cache');
            return cache.get(key);
        }
        let value = func.call(this,args);
        cache.set(key,value);
        return value;
    }
}

slow = cachingDecorator(slow);
console.time("slowTimer");
slow(1,2);
console.timeEnd("slowTimer");
console.time("cacheTimer");
slow(1,2);
console.timeEnd("cacheTimer");
console.time("againSlowTimer");
slow(4,'5');
console.timeEnd("againSlowTimer");


//?  func.apply --------------------->

//~ func.call(context, ...args);  //* iterable args 
//~ func.apply(context, args);    //* array-like args

//* For objects which are BOTH iterable & array-like [ real arrays ], use `apply` which is faster.


//? Call forwarding -------------->

//* Passing all arguments along with the context to another function is called call forwarding.

let wrapper = function() {
    return func.apply(this, arguments);
};

//? Borrowing a method ------------>

function hash() {
    console.log(arguments);
    
    console.log( arguments.join() ); 
    //! Error: arguments.join is not a function
    //! Since, arguments object is both iterable and array-like, but not a real array.
    
    //* Method borrowing
    console.log( [].join.call(arguments) ); // 1,2

    //* 1. Borrow a join method from a regular array ( [].join )
    //* 2. Run it in the context of arguments ( [].join.call )

}
hash(1, 2);


//? Decorators and function properties ----------------->

// It is generally safe to replace a function or a method with a decorated one, except for one little thing. If the original function had properties on it, like func.calledCount or whatever, then the decorated one will not provide them. Because that is a wrapper. So one needs to be careful if one uses them.

// There exists a way to create decorators that keep access to function properties, but this requires using a special Proxy object to wrap a function.