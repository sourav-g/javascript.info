class Animal {
    constructor(name) {
      this.speed = 0;
      this.name = name;
    }
    run(speed) {
      this.speed = speed;
      console.log(`${this.name} runs with speed ${this.speed}.`);
    }
    stop() {
      this.speed = 0;
      console.log(`${this.name} stands still.`);
    }
}
  
class Rabbit extends Animal {
    hide() {
        super.stop();
        console.log(`${this.name} hides!`);
    }
}

//~ ---------------------------------------------------------------------------

let animal = new Animal("Tiger");
let rabbit = new Rabbit("White Rabbit");

rabbit.run(5); // White Rabbit runs with speed 5.
rabbit.hide(); // White Rabbit hides!

console.log(animal);
console.log(rabbit);

//console.log(Object.getPrototypeOf(Rabbit) == Animal);               //true
//console.log(Object.getPrototypeOf(Animal) == Function.prototype);   //true
//console.log(Object.getPrototypeOf(rabbit) == Rabbit.prototype);     //true
//console.log(Object.getPrototypeOf(animal) == Animal.prototype);     //true
 


