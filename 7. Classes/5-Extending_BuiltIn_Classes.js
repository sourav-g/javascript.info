//* Built-in classes like Array, Map and others are extendable also.

class PowerArray extends Array {
  isEmpty() {
    return this.length === 0;
  }
}

let arr = new PowerArray(-2, 9, 4, 22, 6);
console.log(arr.isEmpty());

arr = arr.sort((a, b) => a - b);
console.log(arr);

//? TODO more to read here
