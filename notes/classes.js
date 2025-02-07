/**========================================================================
 *?                           CLASSES
 *========================================================================**/

// https://javascript.info/class
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes
// https://www.youtube.com/watch?v=vdT-wjEoH-0&list=PLtwj5TTsiP7uTKfTQbcmb59mWXosLP_7S&index=1&ab_channel=StephenMayeux

// Classes in JS are built on prototypes
// Body of a class is executed in 'strict mode'
// A class can only have 1 constructor method

/**============================================
 *               Example
 *=============================================**/
class User {

    // constructor
    constructor(name) {
        this.name = name;
    }

    // method
    sayHi() {
        alert(`${this.name} says hi!`);
    }
}

/**============================================
 *             Example 2
 *=============================================**/
class Person {
    constructor(firstName, LastName) {
        this.firstName = firstName;
        this.LastName = LastName;
        this.hasJob = false;
    }

    fullName() {
        return `${this.firstName} ${this.LastName}`;
    }

    setFirstName(firstName) {
        this.firstName = firstName;
    }

    setLastName(LastName) {
        this.LastName = LastName;
    }
}

const ashwin = new Person('Ashwin', 'Luchowa');

/**============================================
 *               Usage
 *=============================================**/
let ash = new User('Ash');
ash.sayHi(); //Ash says hi!

// note: no comma between class methods

// In JS, class is a kind of a function
console.log(typeof ash); //object
console.log(typeof User); //function

/**============================================
 *               What is a class?
 *=============================================**/
// 1. in class User, it creates a function named User which is the result of the class declaration.
// the function code is taken from the constructor method.
// 2. Stores class methods, such as sayHi, in User.prototype
// after new User object is created, when we call its method, its taken from the prototype.
// so the object has access to class methods.

// a function created by class is labelled by a special internal property [[IsClassConstructor]]: true
// classes always 'use strict'

// Class Expression
// class expressions may have a name. If so, it's visible inside the class only.
let User = class MyClass {
    sayHi() {
        alert(MyClass);
    }
};

new User().sayHi(); //works, shows MyClass definition
alert(MyClass); //error, not available outside of the class

// E.g.2 make class dynamically "on-demand", like this:
function makeClass(phrase) {
    return class {
        sayHi() {
            alert(phrase);
        }
    };
}

//create a new class
let User = makeClass('Hello');


/**============================================
 *               Class Fields
 *=============================================**/
// Previously, classes only had methods. Class fields is a syntax that allows to add any properties. Example 'name' property.
// Class fields are similar to object properties, not variables. Therefore we don't use keywords like const.
// By declaring fields up-front, class definitions become more self-documenting and fields are always present, helping with
// optimizations.
// For class fields, they are set on individual objects, not User.prototype:
class User {
    myName = 'Ash';

    sayHi() {
        alert(`Hello, ${this.myName}!`);
    }
}

new User().sayHi(); //Hello, Ash!

// assign values using more complex expressions and function calls
class User {
    name = prompt('Name please?', 'Mimsoo');
}

let user = new User();
console.log(user.name); //Mimsoo


// making bound methods with class fields
// this problem is called "losing this"
class Button {
    constructor(value) {
        this.value = value;
    }

    click() {
        alert(this.value);
    }
}

let button = new Button('hello');

setTimeout(button.click, 1000); //undefined


/*================= How to fix it? =================*/
// pass a wrapper-function
setTimeout(() => button.click, 1000); //hello
// bind the method to object, e.g. in the constructor
click = () => {
    alert(this.value);
}
// ... is created on a per-object basis, there's a seperate function for each Button object, with this inside
// it referencing that object. We can pass button.click() around anywhere and the value of this will always be
// correct. Useful in browser environment, specially for event listeners.


/**============================================
 *               Summary
 *=============================================**/
// MyClass is a function (the one we provide as constructor), while methods, getters and setters are written
// to MyClass.prototype.
class MyClass {

    // property
    // prop = value;

    // constructor
    constructor(name) {
        this.name = name;
    }

    // method
    sayHi() {
        console.log(`${this.name} says hi!`);
    }

    //get something(...) {} //getter method
    //set something(...) {} //setter method

    //[Symbol.iterator]() {} //method with computed name (symbol here)
}


/**========================================================================
 *                Rewrite a function into a class style
 *========================================================================**/

/*================= Function Style =================*/
function Clock({ template }) {

    let timer;

    function render() {
        let date = new Date();

        let hours = date.getHours();
        if (hours < 10) hours = '0' + hours;

        let mins = date.getMinutes();
        if (mins < 10) mins = '0' + mins;

        let secs = date.getSeconds();
        if (secs < 10) secs = '0' + secs;

        let output = template
            .replace('h', hours)
            .replace('m', mins)
            .replace('s', secs);

        console.log(output);
    }

    this.stop = function () {
        clearInterval(timer);
    };

    this.start = function () {
        render();
        timer = setInterval(render, 1000);
    };

}

let clock = new Clock({ template: 'h:m:s' });
clock.start();

/*================= Class Style =================*/
// it is advised to have the methods part of the prototype instead of the main object to save browser's memory.
// the prototype's method are shared across all of their objects.
class Clock {
    constructor({ template }) {
        this.template = template;
    };

    render() {
        let date = new Date();

        let hours = date.getHours();
        if (hours < 10) hours = '0' + hours;

        let mins = date.getMinutes();
        if (hours < 10) hours = '0' + hours;

        let secs = date.getSeconds();
        if (secs < 10) secs = '0' + secs;

        let output = this.template
            .replace('h', hours)
            .replace('m', mins)
            .replace('s', secs);

        console.log(output);
    };

    stop() {
        clearInterval(timer);
    };

    start() {
        this.render();
        this.timer = setInterval(() => this.render(), 1000);
    };
}

let clock2 = new Clock({ template: 'h:m:s' });
clock2.start();


/**============================================
 *               Private properties
 *=============================================**/
// It's an error to reference private fields from outside the class. They can only be read or written within the class body.
// By defining things that are not visible outside of the class, you ensure that your classes' users can't depend on internals, which
// may change from version to version.

class Rectangle {
    #height = 0;
    #width;
    constructor(height, width) {
        this.#height = height;
        this.#width = width;
    }
}

let hi = new Rectangle(10, 10);
console.log(hi.height); //undefined


/**============================================
 *       Inheritance (extend && super)
 *=============================================**/
// The 'extends' keyword is used in class declarations or class expressions 
// to create a class as a child of another constructor (either a class or a function)
class Animal {
    constructor(name) {
        this.name = name;
        this.hasTwoBalls = false;
    }

    speak() {
        console.log(`${this.name} makes a noise.`);
    }
}

class Dog extends Animal {
    constructor(name, walk) {
        super(name); //use super inside this method to call the method from the class it extends from
        this.walk = walk; //new property
        this.hasTwoBalls = true; //overridden the original property
    }

    speak() {
        console.log(`${this.name} barks!`);
    }

    move() {
        console.log(`${this.name} ${this.walk}`);
    }
}

const d = new Dog('Babou', 'walks!');
d.speak(); //Babou barks!
d.move(); //Babou walks!


// If there is a constructor present in the subclass, it needs to first call super() before using this. The super keyword
// can also be used to call corresponding methods of super class.
class Cat {
    constructor(name) {
        this.name = name;
    }
    speak() {
        console.log(`${this.name} makes a noise.`);
    }
}

class Lion extends Cat {
    speak() {
        super.speak();
        console.log(`${this.name} roars.`);
    }
}

const l = new Lion('Fuzzy');


// The extends keyword is used in class declarations or class expressions to create a class that is a child of another class.

/*================= Extending plain objects =================*/
// Classes cannot extend regular objects. Use Object.setPrototypeOf() instead:
const Animal = {
    speak() {
        console.log(`${this.name} makes a noise.`);
    },
};

class Dog {
    constructor(name) {
        this.name = name;
    }
}

Object.setPrototypeOf(Dog.prototype, Animal);

const dog1 = new Dog('Alibaba');
dog1.speak(); //Alibaba makes a noise.


// Example
// Note: #privateField from ClassWithPrivateField base class is private to ClassWithPrivateField and not accesssible from the derived SubClass.
class ClassWithPrivateFields {
    #privateField;

    constructor() {
        this.#privateField = 42;
    }
}

class Subclass extends ClassWithPrivateFields {
    #subPrivateField;

    constructor() {
        super(); //error if omitted
        this.#subPrivateField = 23;
    }
}

let idea1 = new Subclass();
console.log(idea1); //#privateField: 42, #subPrivateField: 23


/**============================================
 *               What is an instance?
 *=============================================**/
// A class is a blueprint you use to create objects. An object is an instance of a class - a concrete 'thing' you made
//  using a specific class. So 'object' and 'instance' are the same thing, but the word 'instance' indicates the relationship
//  of an object to its class.
class Person {
    constructor(name) {
        this.name = name;
    }
}

const person1 = new Person('Ash'); // person1 is an instance of 'Person' class

/**============================================
 *        Static properties and methods
 *=============================================**/

//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/static#using_static_members_in_classes

// Classes can have static properties and methods.
// Static properties and methods are accessed on the class itself. They cannot be accessed on the instance of a class.
// Static methods are often utility functions, such as functions to create or clone objects
// Static properties are useful for cashes, fixed-configuration or any other data you don't need to be replicated across instances.
// Restrictions: The name of a static property (field or method) cannot be prototype
// Restrictions: The name of a class field (static or instance) cannot be constructor.

// Example:
class ClassWithStaticMethod {
    static staticProperty = 'someValue'; //1
    static staticMethod() { //2
        return 'static method has been called.';
    }
    static { //3
        console.log('Class static initialization block called');
    }
}

console.log(ClassWithStaticMethod.staticProperty); //someValue
console.log(ClassWithStaticMethod.staticMethod()); //static method has been called.
//4

// 1: staticProperty is a static property of ClassWithStaticMethod class. Meaning directly accessible through the class itself
//  rather than through instances of the class.
// 2 Defines a static method within the class. Again accessible through the class itself.
// 3 This is a static initialization block. Executed when the class is defined.
// 4 You are accessing the static property and method of the class, respectively. They are independent of any instances of the class.
// We get an error if we remove static in this example.

// Example
class Triple {
    static customName = "Tripler";
    static description = "I triple any number you provide";
    static calculate(n = 1) {
        return n * 3;
    }
}

class SquaredTriple extends Triple {
    static longDescription;
    static description = "I square the triple of any number you provide";
    static calculate(n) {
        return super.calculate(n) * super.calculate(n);
    }
}

console.log(Triple.description); // 'I triple any number you provide'
console.log(Triple.calculate()); // 3
console.log(Triple.calculate(6)); // 18

const tp = new Triple();

console.log(SquaredTriple.calculate(3)); // 81 (not affected by parent's instantiation)
console.log(SquaredTriple.description); // 'I square the triple of any number you provide'
console.log(SquaredTriple.longDescription); // undefined
console.log(SquaredTriple.customName); // 'Tripler'

// This throws because calculate() is a static member, not an instance member.
console.log(tp.calculate()); // 'tp.calculate is not a function'


/*================= Calling static members from another static method =================*/
//use 'this' keyword
class StaticMethodCall {
    static staticProperty = "static property";
    static staticMethod() {
        return `Static method and ${this.staticProperty} has been called`;
    }
    static anotherStaticMethod() {
        return `${this.staticMethod()} from another static method`;
    }
}
StaticMethodCall.staticMethod();
// 'Static method and static property has been called'

StaticMethodCall.anotherStaticMethod();
// 'Static method and static property has been called from another static method'


/*================= Calling static members from a class constructor and other methods =================*/
// Not directly accessible using 'this' keyword from non-static methods.
// You need to call them using the class name: CLASSNAME.STATIC_METHOD_NAME() / CLASSNAME.STATIC_PROPERTY_NAME
// or calling the method as a property of the constructor.

// Example
class StaticMethodCall {
    constructor() {
        console.log(StaticMethodCall.staticProperty); // 'static property'
        console.log(this.constructor.staticProperty); // 'static property'
        console.log(StaticMethodCall.staticMethod()); // 'static method has been called.'
        console.log(this.constructor.staticMethod()); // 'static method has been called.'
    }

    static staticProperty = "static property";
    static staticMethod() {
        return "static method has been called.";
    }
}

/**============================================
 *               Computed Names
 *=============================================**/
class User {

    ['say' + 'Hi']() {
        alert("Hello");
    }

}

new User().sayHi();