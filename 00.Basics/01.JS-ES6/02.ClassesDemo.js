// Base class (Parent)
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  greet() {
    return `Hi, I'm ${this.name} and I'm ${this.age} years old.`;
  }
}

// Derived class (Child) using Inheritance
class Student extends Person {
  constructor(name, age, course) {
    super(name, age); // call parent constructor
    this.course = course;
  }

  study() {
    return `${this.name} is studying ${this.course}.`;
  }

  // Override method
  greet() {
    return `Hello, I'm ${this.name}, a student of ${this.course}.`;
  }
}

// Button click handler
document.getElementById("showClassDemoBtn").addEventListener("click", () => {
  const classResult = document.getElementById("classResult");

  // Create objects
  const person1 = new Person("Alice", 30);
  const student1 = new Student("Bob", 22, "Computer Science");

  // Display results
  classResult.innerHTML = `
    <strong>Person:</strong> ${person1.greet()}<br>
    <strong>Student:</strong> ${student1.greet()}<br>
    <strong>Study Method:</strong> ${student1.study()}
  `;

  console.log(person1);
  console.log(student1);
});
