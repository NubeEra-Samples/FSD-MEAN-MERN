// closures
function outer() {
  let count = 0;           // variable in outer function
  return function inner() { // inner function forms a closure
    count++;
    console.log(count);
  };
}

const counter = outer(); // outer() runs once
counter(); // 1
counter(); // 2
counter(); // 3

// Explanation in bullets:
/////////////////////////////////
// > inner() is a closure because it remembers 'count' from outer().
// > count persists across multiple calls to counter().
// > Allows private state that cannot be accessed directly from outside.


// rest parameters
function sum(...numbers) { // 'numbers' is an array of all arguments
  return numbers.reduce((total, num) => total + num, 0);
}

console.log(sum(1, 2, 3));       // 6
console.log(sum(4, 5, 6, 7, 8)); // 30

// Explanation in bullets:
/////////////////////////////////
// > ...numbers is the rest parameter.
// > Collects all remaining arguments into an array.
// > Makes functions flexible for any number of arguments.

//dynamic property
const propName = 'age';
const person = {
  name: 'Alice',
  [propName]: 25   // dynamic property name
};

console.log(person.name); // Alice
console.log(person.age);  // 25

// Explanation in bullets:
/////////////////////////////////
// > [propName] lets you use a variable as the property name.
// > Useful for creating objects with keys determined at runtime.
// > Can be combined with expressions, e.g., [propName + '_years']: 25.

// map
const numbers = [1, 2, 3, 4];
const doubled = numbers.map(n => n * 2);

console.log(doubled); // [2, 4, 6, 8]

// Explanation in bullets:
/////////////////////////////////
// > map() creates a new array by applying a function to each element.
// > Original array remains unchanged.
// > Ideal for transforming data.


// filter
const evenNumbers = numbers.filter(n => n % 2 === 0);

console.log(evenNumbers); // [2, 4]

// Explanation in bullets:
/////////////////////////////////
// > filter() creates a new array with elements that pass a test.
// > Does not modify the original array.
// > Useful for selecting specific items.


// reduce
const sum = numbers.reduce((total, n) => total + n, 0);

console.log(sum); // 10

// Explanation in bullets:
/////////////////////////////////
// > reduce() combines array elements into a single value.
// > Takes a callback with accumulator and current value.
// > Initial value is optional but recommended.


// find
const firstEven = numbers.find(n => n % 2 === 0);

console.log(firstEven); // 2

// Explanation in bullets:
/////////////////////////////////
// > find() returns the first element that satisfies the condition.
// > Returns undefined if no element matches.
// > Useful for searching an array.


// forEach
numbers.forEach(n => console.log(n * 2));
// Output: 2, 4, 6, 8 (logged separately)

// Explanation in bullets:
/////////////////////////////////
// > forEach() executes a function for each array element.
// > Does not return a new array.
// > Useful for side effects like logging or updating external variables.


// let and const
let x = 10;
x = 20; // okay

const y = 30;
// y = 40; // Error: Assignment to constant variable

console.log(x, y); // 20, 30

// Explanation in bullets:
/////////////////////////////////
// > let allows block-scoped variables that can be reassigned.
// > const creates block-scoped constants that cannot be reassigned.
// > Both are preferable over var for predictable scoping.


// Default Parameters
function greet(name = 'Guest') {
  console.log(`Hello, ${name}!`);
}

greet('Alice'); // Hello, Alice!
greet();        // Hello, Guest!

// Explanation in bullets:
/////////////////////////////////
// > Provides default values for function parameters.
// > Avoids undefined when arguments are missing.
// > Simplifies function calls and improves readability.


// Object Shorthand Syntax
const name = 'Alice';
const age = 25;

const person = { name, age }; // shorthand for { name: name, age: age }

console.log(person); // { name: 'Alice', age: 25 }

// Explanation in bullets:
/////////////////////////////////
// > Allows you to create objects using variables directly.
// > Reduces redundancy when key names match variable names.
// > Works for methods as well: { greet() { ... } }


// Ternary Operator (condition ? true : false)
const ageCheck = 18;
const message = ageCheck >= 18 ? 'Adult' : 'Minor';

console.log(message); // Adult

// Explanation in bullets:
/////////////////////////////////
// > Short-hand if-else statement in a single line.
// > Returns one of two values based on a condition.
// > Improves readability for simple conditions.


// Optional Chaining (?.)
const user = { profile: { name: 'Alice' } };
console.log(user.profile?.name);      // Alice
console.log(user.contact?.email);     // undefined

// Explanation in bullets:
/////////////////////////////////
// > ?. safely accesses nested object properties.
// > Returns undefined instead of throwing an error if property doesn't exist.
// > Useful for handling optional or missing data.


// Nullish Coalescing (??)
const value = null;
const defaultValue = value ?? 'Default';

console.log(defaultValue); // Default

// Explanation in bullets:
/////////////////////////////////
// > ?? returns the right-hand value only if the left-hand value is null or undefined.
// > Different from || which also considers false, 0, or '' as falsy.
// > Useful for setting default values safely.


// Arrow Functions (() => {})
const add = (a, b) => a + b;
console.log(add(2, 3)); // 5

const greet = name => console.log(`Hello, ${name}!`);
greet('Alice'); // Hello, Alice!

// Explanation in bullets:
/////////////////////////////////
// > Arrow functions provide a shorter syntax for writing functions.
// > They do not have their own 'this', inheriting it from the surrounding scope.
// > Ideal for callbacks and simple one-liners.


// Destructuring (Objects & Arrays)
// Object destructuring
const person = { name: 'Alice', age: 25 };
const { name, age } = person;
console.log(name, age); // Alice 25

// Array destructuring
const numbers = [1, 2, 3];
const [first, second] = numbers;
console.log(first, second); // 1 2

// Explanation in bullets:
/////////////////////////////////
// > Destructuring allows extracting values from objects or arrays into variables.
// > Simplifies code and reduces the need for repetitive property access.
// > Can use default values and rename variables: const { name: userName = 'Guest' } = person;


// Template Literals (`Hello ${name}`)
const user = 'Alice';
const message = `Hello, ${user}! Welcome to ES6.`;
console.log(message); // Hello, Alice! Welcome to ES6.

const multiline = `This is
a multi-line
string.`;
console.log(multiline);

// Explanation in bullets:
/////////////////////////////////
// > Template literals use backticks (`) instead of quotes.
// > Allow embedding variables and expressions with ${}.
// > Support multi-line strings without concatenation.
