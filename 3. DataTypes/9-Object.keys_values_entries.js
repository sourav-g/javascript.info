// .keys
// .values
// .entries

//* Generic methods supported by Map, Set, Array
//  Need to implement these, if we create OWN data structure

// Plain objects also support similar methods, but the syntax is a bit different.

//? ----Object.keys, values, entries-----

/*

    Object.keys(obj)     – returns an array of keys.
    Object.values(obj)   – returns an array of values.
    Object.entries(obj)  – returns an array of [key, value] pairs.

*/

//? -----Why the difference ? -------------

let map = new Map([
    [ 1 ,'abc'],
    ['2','def']
]);
console.log(map.keys());            //  [Map Iterator] { 1, '2' }     (Iterable)

let obj = {
    '1':'abc',
    '2':'def'
};
console.log(Object.keys(obj));      //   [ '1', '2' ]                 (Real Array ???)
//obj.keys();                       //   Error : Not a function


//* For flexibility

// Since Objects are base DS, one can have own object say 'data' that implements 'data.keys()'
// It that case it would be a conflict
// So static method is kept.

//! Object.keys/values/entries ignore symbolic properties
//! Object.getOwnPropertySymbols that returns an array of only symbolic keys. 
//! Reflect.ownKeys(obj) that returns all keys.

//?---------(Important) **** Transforming objects---------------------------

// Objects do not have Array methods (map,filter,etc....)

//* Convert to Array  --> Object.entries(obj)
//* Apply method      --> like map
//* Convert to Object --> Object.fromEntries(array)

obj = {
    'name': 'Sam',
    'age' :  35,
    'rank':  3
}

var arr = Object.entries(obj);
var modArr = arr.map((item) => [item[0],item[1]+' new']);
obj = Object.fromEntries(modArr);
console.log(obj);

/*

{ 
   name: 'Sam new', 
   age: '35 new', 
   rank: '3 new' 
}

 */