// The main concept of memory management in JavaScript is reachability.

//* 1. Inherently reachable values, which cannot be deleted
// Current executing func, its local vars and params
// Other funcs in the nested call hierarchy
// Global variables

//* 2. Any other value if its reachable by a reference or by chain of references.

//? The global variable "user" references the object {name: "John"}

let user = {
  name: "John",
};

user = null; // Object becomes unreachable, will be garbage-collected

//? Interlinked objects

function marry(man, woman) {
  woman.husband = man;
  man.wife = woman;

  return {
    father: man,
    mother: woman,
  };
}

let family = marry(
  {
    name: "John",
  },
  {
    name: "Ann",
  }
);

delete family.father;
delete family.mother.husband;

//! No incoming reference to John anymore, can be deleted

//? Unreachable island
//  It is possible that the whole island of interlinked objects becomes unreachable and is removed from the memory.

family = null;

//? The basic garbage collection algorithm is called “mark-and-sweep”.

//Some of the optimizations:
//1. Generational collection
//2. Incremental collection
//3. Idle-time collection

//! Further reading
//! https://developer.mozilla.org/en-US/docs/Web/JavaScript/Memory_management
//! https://betterprogramming.pub/deep-dive-into-garbage-collection-in-javascript-6881610239a
