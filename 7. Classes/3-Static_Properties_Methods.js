//* Class definition --------------------------

class Student {
  static {
    // ✅ Executed when the class is first evaluated
    console.log("Inside class definition :");
    console.log(this); // Class definition
  }

  //* attaches to each object

  name;
  gender;
  marks;
  result;

  //* static properties attaches to class directly

  static instituteCode;
  static isExamConducted;

  //* constructor method attaches to Student.prototype

  constructor(name, gender, rollNo) {
    this.name = name;
    this.gender = gender;
    this.marks = "00";
    this.rollNo = rollNo; //* properties having getter/setter attaches to Student.prototype
    console.log("Inside class contructor fn :");
    console.log(this); // object instance
  }

  //* attaches to Student.prototype

  get rollNo() {
    console.log("Inside prop getter fn :");
    console.log(this); // object instance
    return this._rollNo;
  }

  //* attaches to Student.prototype

  set rollNo(num) {
    console.log("Inside prop setter fn :");
    console.log(this); // object instance
    if (num <= 0) {
      console.log("Roll Number cannot be negative or zero.");
      return;
    }
    this._rollNo = Student.instituteCode + num;
  }

  //* attaches to Student.prototype
  getName() {
    return this.name;
  }

  //* attaches to instance only
  getGender = function () {
    return this.gender;
  };

  //* attaches to instance only
  getMarks = () => {
    return this.marks;
  };

  //* static methods attaches to class directly

  static sortStudentsByMarks(student1, student2) {
    console.log("Inside static method :");
    console.log(this); //! undefined
    return student2.marks - student1.marks;
  }

  static sortStudentsByRoll(student1, student2) {
    const rollNo1 = student1.rollNo.replace(Student.instituteCode, "");
    const rollNo2 = student2.rollNo.replace(Student.instituteCode, "");
    return rollNo1 - rollNo2;
  }
}

//*---Driver Code--------------------------------

const getRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min);
};

Student.instituteCode = "GT";
let students = enrollStudents();
Student.isExamConducted = true;
allotMarks(students);
publishRanks(students);

function enrollStudents() {
  return [
    new Student("Sourav", "M", "904"),
    new Student("Prem", "M", "823"),
    new Student("Meghana", "F", "811"),
    new Student("Arjun", "M", "009"),
    new Student("Namratha", "F", "815"),
    new Student("Akshay", "M", "002"),
  ];
}

function allotMarks() {
  students.forEach((student) => {
    student.marks = getRandomNumber(0, 100);
    if (student.marks >= 30) {
      student.result = "P";
    } else {
      student.result = "F";
    }
  });
}

function publishRanks(students) {
  console.log(`Inside a normal function at script level : ${this}`);
  students = students.sort(Student.sortStudentsByMarks);
  console.table(students);
}

//? Inheritance of static properties and methods ---------------------------

//* Static properties and methods are inherited

class Animal {}
class Rabbit extends Animal {}

// for statics
console.log(Rabbit.__proto__ === Animal); // true

// for regular methods
console.log(Rabbit.prototype.__proto__ === Animal.prototype); // true

//*Summary ----------------------------------------------------------------------------------------------

//* Static methods are used for the functionality that belongs to the class “as a whole”.
//* It doesn’t relate to a concrete class instance.
//* Static properties are used when we’d like to store class-level data, also not bound to an instance.
