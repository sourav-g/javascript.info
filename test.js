function addUserId(userId) {
  return (item) => {
    item.userId = userId;
    return item;
  };
}

const items = [{ id: 1 }, { id: 2 }];

const newItems = items.map((item) => {
  item.user = "abc";
  return item;
});

//console.log(items);
//console.log(newItems);
//console.log(items == newItems);
//---------------------------------------------------

//Object.create vs new

function Animal(name, habitat){
  this.name = name;
  this.legs = 4;
  this.habitat = habitat;
}

let tiger = new Animal('tiger','Sunderbans');
console.log(tiger);

let lion = Object.create(Animal.prototype,
  {
    //myName is a regular data property
    myName:{
       value:'lion',
       writable:true,
       enumerable:true,
       configurable:true
    },
    //myHabitat is an accessor property
    myHabitat:{
       get(){
         return 'Jungle';
       },
       set(value){
         console.log('Setting...')
       }
    }
  }
);

console.log(lion);

for(let prop in lion){
  console.log(prop);
}
lion.myName = 'No Lion';
lion.myHabitat = 'Grassland';
//delete lion.myName;
//delete lion.myHabitat;
console.log(lion);