//* In terms of OOP, delimiting of the internal interface from the external one is called encapsulation.

class CoffeeMachine {
  //* Protecting “waterAmount” [access under control using getter/setter : kind of a protected property]
  _waterAmount = 0;

  constructor(power) {
    this._power = power;
  }

  set waterAmount(value) {
    if (value <= 0) return;
    this._waterAmount = value;
  }

  get waterAmount() {
    return this._waterAmount;
  }

  //* Read-only “power”, no setting present
  get power() {
    return this._power;
  }
}

let coffeeMachine = new CoffeeMachine(100);
coffeeMachine.waterAmount = 200;
coffeeMachine.power = 150; //* Will not set since no setter
console.log(coffeeMachine);

//? Protected fields are inherited ------------------------------------------------

//* If we inherit class MegaMachine extends CoffeeMachine,
//* then nothing prevents us from accessing this._waterAmount or this._power from the methods of the new class.

//? Private “#waterLimit” [ recent addition ] -------------------------------------

class CoffeeMachine2 {
  #waterLimit = 200;

  #fixWaterAmount(value) {
    if (value < 0) return 0;
    if (value > this.#waterLimit) return this.#waterLimit;
  }

  setWaterAmount(value) {
    this.#waterLimit = this.#fixWaterAmount(value);
  }
}

let coffeeMachine2 = new CoffeeMachine2();

// can't access privates from outside of the class
coffeeMachine2.#fixWaterAmount(123); // Error
coffeeMachine2.#waterLimit = 1000; // Error

//* Private fields are not available as this['#name']

//* Summary --------------------------------------------------------------------------------------------------------
/*
     1. Protected fields start with _. That’s a well-known convention, not enforced at the language level.
        Programmers should only access a field starting with _ from its class and classes inheriting from it.
     2. Private fields start with #. JavaScript makes sure we can only access those from inside the class.

*/

//! Advanced Read : https://www.mgaudet.ca/technical/2021/5/4/implementing-private-fields-for-javascript
