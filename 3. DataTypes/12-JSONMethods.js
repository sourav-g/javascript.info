//? ----JSON.stringify-----------

//* The JSON (JavaScript Object Notation) is a general format to represent values and objects.

// JSON.stringify to convert objects into `JSON string`
// JSON.parse to convert `JSON string` back into an object.

let student = {
    name: 'John',
    age: 30,
    isAdmin: false,
    courses: ['html', 'css', 'js'],
    spouse: null
};
let jsonStr = JSON.stringify(student);

//* jsonStr -> JSON-encoded or serialized or stringified or marshalled object.
//* We are ready to send it over the wire or put into a plain data store.
//* The great thing is that nested objects are supported and converted automatically.
//* JSON.stringify can be applied to primitives as well.


// a string in JSON is still a string, but double-quoted
console.log( JSON.stringify('test') ) // "test"
console.log( JSON.stringify(1) ) // 1
console.log( JSON.stringify(true) ); // true
console.log( JSON.stringify([1, 2, 3]) ); // [1,2,3]

//! JSON is data-only language-independent specification
//! So some JavaScript-specific object properties are skipped by JSON.stringify
//! Like -> Function properties (methods) , Symbolic keys and values, Properties that store undefined.


//! Circular Reference gives error while stringifying


//? -----Excluding and transforming: replacer----------

/*

    let json = JSON.stringify(value[, replacer, space])

    If we need to fine-tune the replacement process, like to filter out circular references, we can use the second argument of JSON.stringify
*/

  let room = {
    number: 23
  };
  
  let meetup = {
    title: "Conference",
    participants: [{name: "John"}, {name: "Alice"}],
    place: room                        // meetup references room
  };
  
  room.occupiedBy = meetup;            // room references meetup
  
  console.log( JSON.stringify(meetup, ['title', 'participants','name','place','number']) );
  
  // {"title":"Conference","participants":[{"name":"John"},{"name":"Alice"}],"place":{"number":23}}

  console.log( JSON.stringify(meetup, function replacer(key,value){
        return (key == 'occupiedBy') ? undefined : value;
  }));

  // {"title":"Conference","participants":[{"name":"John"},{"name":"Alice"}],"place":{"number":23}}


  /*
    Please note that replacer function gets every key/value pair including nested objects and array items. It is applied recursively. The value of this inside replacer is the object that contains the current property.

    The first call is special. It is made using a special “wrapper object”: {"": meetup}
  */

//? ----Formatting: space--------------------

console.log( JSON.stringify(meetup, function replacer(key,value){
    return (key == 'occupiedBy') ? undefined : value;
},2));

/*
    {
    "title": "Conference",
    "participants": [
        {
        "name": "John"
        },
        {
        "name": "Alice"
        }
    ],
    "place": {
        "number": 23
    }
    }
*/

console.log( JSON.stringify(meetup, function replacer(key,value){
    return (key == 'occupiedBy') ? undefined : value;
},'$'));

/*

    {
    $"title": "Conference",
    $"participants": [
    $${
    $$$"name": "John"
    $$},
    $${
    $$$"name": "Alice"
    $$}
    $],
    $"place": {
    $$"number": 23
    $}
    }

*/

//?-----Custom “toJSON”---------------------------

//* Like toString for string conversion, an object may provide method toJSON for to-JSON conversion. JSON.stringify automatically calls it if available.

  room = {
    number: 23,    
  };
  
  meetup = {
    title: "Conference",
    date: new Date(Date.UTC(2017, 0, 1)),
    room
  };
  
  console.log( JSON.stringify(meetup) );
  /*
    {
      "title":"Conference",
      "date":"2017-01-01T00:00:00.000Z",  // because all dates have a built-in toJSON method which returns such kind of string.
      "room": {"number":23}               
    }
  */

    //----------------------------------------------------------------

    room = {
        number: 23,    
        toJSON() {
            return this.number;
        }
    };
    meetup = {
        title: "Conference",
        date: new Date(Date.UTC(2017, 0, 1)),
        room
      };
    
    console.log( JSON.stringify(room) );    // 23

    console.log( JSON.stringify(meetup) );
 /*
    {
      "title":"Conference",
      "date":"2017-01-01T00:00:00.000Z", 
      "room": 23          
    }
  */


    //?--------JSON.parse   => decode a JSON string------------------------------------------ 

    /*

    let value = JSON.parse(str, [reviver]);

    */

    let userData = '{ "name": "John", "age": 35, "isAdmin": false, "friends": [0,1,2,3] }';
    let user = JSON.parse(userData)
    console.log(user.name);           // John
    console.log(user.friends);        // [ 0, 1, 2, 3 ]


  //! Typical JSON mistakes  ****************************************************************

  //!     let json = `{
  //!       name: "John",                     // mistake: property name without quotes
  //!       "surname": 'Smith',               // mistake: single quotes in value (must be double)
  //!       'isAdmin': false                  // mistake: single quotes in key (must be double)
  //!       "birthday": new Date(2000, 2, 3), // mistake: no "new" is allowed, only bare values
  //!       "friends": [0,1,2,3]              // here all fine
  //!     }`;

  //! ********************************************************************************


  //?------Using reviver---------------------

let str = '{"title":"Conference","date":"2017-11-30T12:00:00.000Z"}';

parsedValue = JSON.parse(str, function(key, value) {
    if (key == 'date') return new Date(value);
    return value;
});

console.log(parsedValue.date.getDate());     // 30