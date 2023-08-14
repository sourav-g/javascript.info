//~ Destructuring unpacks arrays or objects into a bunch of variables


//? Array destructuring-------------------------------------------------

let arr = ['Sourav' , 'Ghosh'];
let [firstName,lastName] = arr;
console.log(firstName,lastName);
console.log(arr);                  // arr NOT mutated

//* Skip elements using comma

let [fName,,lName] = "Sourav Kumar Ghosh".split(" ");
console.log(fName,lName);

//* Works with any iterable on right
//* Assign to anything on left

let [one,two,three] = new Set([1,2,3]);

let user={};
[user.name,user.age] = "Sourav 31".split(" ");
console.log(user);

//* Loop over object and map properties

user = {
    name: "John",
    age: 30
};

for(let [key,value] of Object.entries(user)){
    console.log(key,value);
}

map = new Map([
    ['name', 'Sam'],
    ['age' , '25']
])

for(let [key,value] of map){
    console.log(key,value);
}

//* Swap variables trick

let guest = 'Vickey';
let admin = 'Sourav';

[guest, admin] = [admin, guest];
console.log(guest,admin);

//* The rest ‘…’ : The value of rest is the array of the remaining array elements.

let [name1, name2, ...rest] = ["Julius", "Caesar", "Consul", "Sourav"];
console.log(rest[0], rest[1]);

//* Default values
//  Default values can be more complex expressions or even function calls. 
//  They are evaluated only if the value is not provided.

let [FName='Sourav',LName='Ghosh'] = ['Vickey']
console.log(FName, LName);   // Vickey Ghosh


//? Object destructuring-------------------------------------------------

let options = {
    title: "Menu",
    width: 100,
    height: 200
};

//The order does not matter, exact name matters 
//If another letiable name, set it as below using( : )

let {title, width='10', height: h='20'} = options;
console.log(title);        // Menu
console.log(width);        // 100
//console.log(height);     // Ref Error : not defined 
console.log(h);            // 200

let nameObj = {
    f_Name : 'Sourav'
}
let {
        f_Name = console.log("This is default value"), 
        l_Name = console.log("This is default value")
    } = nameObj;

//  Extract only what is needed from a complex object
let {c} = {a:'1',b:'2',c:'3',d:'4'};

//* The rest pattern “…”

let newOptions = {
    street: 'DB Para',
    city:   'Siliguri',
    country:'India'
};

let {street, ...others} = newOptions;
console.log(street, others.city, others.country);


//? Nested destructuring -----------------------------------

//extract deeper areas for nested objects

options = {
    size: {
      wid: 100,
      hgt: 200
    },
    items: ["Cake", "Donut"],
    extra: true
};

let {
    size:{
        wid,
        hgt:H
    },
    items:[item1,item2,item3],
    extra,
    title:t='Menu'
} = options;

console.log(wid,H,item1,item2,item3,extra,t); // 100 200 Cake Donut undefined true Menu
//console.log(size,items);                    // Ref Error : not defined

//? Smart function parameters----------------------------

// We can pass parameters as an object, and the function immediately destructurizes them 
// into variables:

let obj = {
    title: "My menu",
    items: ["Item1", "Item2"]
};

showMenu(obj);

function showMenu({title, width=100,height:h=200, items:[items1,items2]}){
   console.log(title);   // My menu
   console.log(width);   // 100
   console.log(h);       // 200
   console.log(items1);  // Item1
   console.log(items2);  // Item2
}
