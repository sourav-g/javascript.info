//* JS Engine keeps a value in memory while it is REACHABLE.
//* Deletes otherwise.

let john = { name: "John" };
john = null;         // object will be garbage collected, as reference is nulled
console.log(john);

let sourav  = { name: "Sourav" };
let array = [ sourav ];
sourav = null;
console.log(array);  // array alive, object is alive as well,  won't be garbage collected


let vickey = { name : 'Vickey' };
let map = new Map();
map.set(vickey,"Hello");
vickey = null;
console.log(map.get(vickey)); // undefined
console.log(map.keys());      // vickey exists as key    

//* If we use an object as the key in a regular Map, then while the Map exists, that object exists as well. It occupies memory and may not be garbage collected.

//?-------WEAKMAP-------------------------------------------------------------------------

//* Keys MUST be objects only ( Maps can have primitives or objects )
//! Does Not prevent garbage collection of key Objects

//! If we use an object as the key in it, and there are no other references to that object – it will be removed from memory (and from the map) automatically.

john = { name: "John" };

let weakMap = new WeakMap();
weakMap.set(john, "...");

john = null; // john garbage-collected

//! WeakMap does not support iteration and methods keys(), values(), entries()
//! Since key deletion can happen anytime, above APIs will be inconsistent anyways
//! So there’s no way to get all keys or values from it.

/*
    weakMap.set(key, value)
    weakMap.get(key)
    weakMap.delete(key)
    weakMap.has(key)
*/

//?----Use Case : Additional Data Storage for objects stored/managed at another place ---------

//* If we’re working with an object that “belongs” to another code, maybe even a third-party library, and would like to store some data associated with it, that should only exist while the object is alive – then WeakMap is exactly what’s needed.

//* We put the data to a WeakMap, using the object as the key, and when the object is garbage collected, that data will automatically disappear as well.

weakMap.set(john, "secret documents");
// if john dies, secret documents will be destroyed automatically

//! Ensures memory-leakage do not happen, by map growing continuously with increasing users

//?----Use Case : Caching --------------------------


//* With map, cache needs to be cleared, if obj is deleted
//* With weakmap, cache is auto-clearing on obj deletion

let cache = new WeakMap();

// calculate and remember the result
function process(obj) {
  if (!cache.has(obj)) {
    let result = /* calculate the result for */ obj;

    cache.set(obj, result);
    return result;
  }

  return cache.get(obj);
}

// main.js
let obj = {/* some object */};

let result1 = process(obj);
let result2 = process(obj);

// ...later, when the object is not needed any more:
obj = null;

// Can't get cache.size, as it's a WeakMap,
// but it's 0 or soon be 0
// When obj gets garbage collected, cached data will be removed as well

//?-------WEAKSET-------------------------------------------------------------------------

//* Only add Objects, NOT primitives
//* An object exists in the set while it is reachable from somewhere else.
//* Like Set, it supports add, has and delete, but not size, keys() and no iterations.



//Summary------->

//! Their main advantages are that they have weak reference to objects, so they can easily be removed by garbage collector.
//! WeakMap and WeakSet are used as “secondary” data structures in addition to the “primary” object storage. Once the object is removed from the primary storage, if it is only found as the key of WeakMap or in a WeakSet, it will be cleaned up automatically.