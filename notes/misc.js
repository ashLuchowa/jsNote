/**============================================
 *                   Quotes
 *=============================================**/
// Any fool can write code that a computer can understand.
// Good programmers write code that humans can understand.
// - Martin Fowler.


/**============================================
 *             Function Invocation
 *=============================================**/
function hello(name) {
  return 'Hello ' + name + '!';
}
// Function invocation
const message = hello('World');


const func = obj.myMethod;
func();             // function invocation
parseFloat('16.6'); // function invocation
isNaN(0);           // function invocation


//Method invocation
const myObject = {
  // helloMethod is a method
  helloMethod: function () {
    return 'Hello World!';
  }
};
const message1 = myObject.helloMethod(); // <!-- method invocation


const words = ['Hello', 'World'];
words.join(', ');   // method invocation

const obj = {
  myMethod() {
    return new Date().toString();
  }
};
obj.myMethod();     // method invocation

//The method invocation requires a property accessor form to call the function (obj.myFunc() 
//or obj['myFunc']()), while function invocation does not (myFunc()).


////////////////////////////////////////////////
var myObject1 = {
  myMethod: function () {
    this;
  }
};
myObject1.myMethod(); // 'this' is myObject1 in the invocation


////////////////////////////////////////////////
function Constructor() {
  this;
}
var object = new Constructor(); // 'this' is object here

////////////////////////////////////////////////
// when defining method with an arrow function
// arrow function is defined in the global context and has 'this' as window object.
//will return undefined
//use function expression instead to solve the problem
// arriw function has a static context and doesn't change on different invocation types.
// regular function does change its context depending on invocation


////////////////////////////////////////////////
//var variables are not block scoped, they are function scoped.
//example, let's say there is a function which has an if statement;
//they would be available outside of an if statement block but inside the function

const dog = 'Snickers';

function logDog() {
  console.log(dog);
}

function go() {
  const dog = 'Sunny';
  logDog();
}

go(); //snickers

//we log snickers instead of sunny because the function is declared within a scope having
//dog variable inside of it, so it will look up for that variable.
//Because logDog() is defined where it is, since it doesn't have a local variable named dog,
//it will just go up one level.



////////////////////////////////////////////////
//Some reasons why constructors are not recommended these days
//https://tsherif.wordpress.com/2013/08/04/constructors-are-bad-for-javascript/


/**============================================
 *          Ways of creating objects
 *=============================================**/
//https://www.linkedin.com/pulse/5-ways-create-object-javascript-jayanth-babu-somineni-royjc/


/**============================================
 *        Composition over inheritance
 *=============================================**/
//https://www.youtube.com/watch?v=nnwD5Lwwqdo&ab_channel=WebDevSimplified 


/**============================================
 *              SOLID Principles
 *=============================================**/
//https://duncan-mcardle.medium.com/solid-principle-1-single-responsibility-javascript-5d9ce2c6f4a5

//------ Single Responsibility ------//
// It says that a class or module should have only a single purpose.
// Exampple, if you have a wallet class, that class should only implement wallet functionality.
// It's fine to call other functionality, but it shouldn't be written here.

//------ Open-Closed ------//
// Open for extension, but closed for modification.
// If we want to add additional functionality, we should be able to do so simple by extending the original functionality,
// without the need to modify it.

//------ Liskov Substitution ------//
// It states that any class should be substitutable for its parent class without unexpected consequences.

//------ Interface Segregation ------//
// It states that an entity should never be forced to implement an interface that contains elements which it will never use.
// Example, a 'Penguin' should never be forced to implement a 'Bird' interface if that 'Bird' interface includes functionality
// relating to flying, as penguins cannot fly.

//------ Dependecy Inversion ------//
// It states that high level code should never depend on low level interfaces, and should instead use abstraction.
// Example: you have a function which calls a Stripe API, it shouldn't affect your function if Stripe changes it's API or you decide to switch to PayPal.
// Isolates modules completely from one another. Instead, all modules now interact with a main module (third party) in the middle.

// Object is the built-in constructor function that almost all objects in JavaScript are instances of, 
// and therefore almost all objects inherit from the object referenced by its .prototype property, Object.prototype.