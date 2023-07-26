//? Computed properties--------------------------------->>>>>>>>>>>>>>>>>>>>>>>>>>>

let fruit = prompt("Which fruit to buy?", "apple");
let bag = {
  [fruit + "Computers"]: 5,
};
alert(bag.appleComputers); // 5 if fruit="apple"

//? Property value shorthand-- -------------------------->>>>>>>>>>>>>>>>>>>>>>>>>>>

//Instead of name:name we can just write name, like this:

let user = {
  name, // same as name:name
  age: 30,
};

//? Property names limitations-------------------------->>>>>>>>>>>>>>>>>>>>>>>>>>>>>

//! A variable cannot have a name equal to one of the language-reserved words
//! But for an object property, there’s no such restriction - Can be any string or Symbol [other types converted to string]

let obj = {
  for: 1,
  let: 2,
  return: 3,
};
alert(obj.for + obj.let + obj.return); // 6

//! Gotcha
let obj2 = {};
obj2.__proto__ = 5; // assign a number
alert(obj2.__proto__); // [object Object] - the value is an object, didn't work as intended

//? Property existence test, “in” operator--------------->>>>>>>>>>>>>>>>>>>>>>>>>>>>>

user = { name: "John", age: 30, test: undefined };

alert("age" in user); // true, user.age exists
alert("blabla" in user); // false, user.blabla doesn't exist
alert("test" in user); // true, user.test exists [undefined check will fail here]

//? The "for..in" loop------------------------------------>>>>>>>>>>>>>>>>>>>>>>>>>>>

user = {
  name: "John",
  age: 30,
  isAdmin: true,
};

for (let key in user) {
  // keys
  alert(key); // name, age, isAdmin
  // values for the keys
  alert(user[key]); // John, 30, true
}

//?“ordered in a special fashion”:
//-> integer properties are sorted,
//-> others appear in creation order.
