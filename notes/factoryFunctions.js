////////////////////////////////////////////////
//closures
//Functions in JavaScript form closures.
//A closure gives you access to an outer function's scope from an inner function, even after the outer function has been terminated.
//In JavaScript, closures are created every time a function is created, at function creation time.
//closures are the ability of a child function to access variables from a higher level scope even after the functions have been called
//or closed or closed over.
//https://www.youtube.com/watch?v=80O6L2Ez3GM&ab_channel=BroCode

function outer() {
    const outerVar = 'Hey, I am an outer var';

    function inner() {
        const innerVar = 'Hey, I am an inner var';
        console.log(outerVar);
        console.log(innerVar);
    };

    return inner;
};

outer()(); //Hey...
const innerFn = outer(); //Hey...
innerFn(); //also works
//we can stick a function into a variable, then later have access to that function. A closure comes into play
//because you can access the function even though the outer function is done.
//JS is able to create functions inside of functions and it can still reach outside to the parent scope,
//even though the outer function is done running, it will still maintain that variable in memory, able to access it later.
//the variable is not cleaned up or garbagge collected.


////////////////////////////////////////////////
//Factory Functions
//A function that returns an object.
//work very similar to constructors but using the power of closures.
//instead of using the new keyword to create an object, they set up and return the new object when you call the function.
//They do not use a prototype, which incurs a performance penalty, although not significant unless you are creating thousands of
//objects

//constructor
const User = function (name) {
    this.name = name;
    this.discordName = '@' + name;
}

//Factory Function
function createUser(name) {
    const discordName = '@' + name;
    return { name, discordName };
}
console.log(createUser('Ash'));


//Object shorthand notation
const firstName = 'Bob';
const firstName2 = 'Bobba';
const age = 28;
const color = 'red';

//Old way of creating an object
const newObject = {
    firstName: firstName2,
    age: age,
};

//New way
const anotherObject = {
    firstName2,
    age,
    color,
};
//console.log neatly with the new way
console.log(firstName2, age, color); // Bobba 28 red
console.log({ firstName2, age, color }); // {firstName2: 'Bobba', age: 28, color: 'red'}


////////////////////////////////////////////////
//Example
const counterCreator = () => {
    let count = 0; //<!-- closure: inner function has access to this private variable
    return () => {
        console.log(count);
        count++;
    };
};

const counter = counterCreator(); //<!-- To use this function, we have to assign it to a variable

counter(); //0
counter(); //1
counter(); //2
counter(); //3


////////////////////////////////////////////////
//Destructuring assignment
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
//Example 1
[a, b] = [10, 20];
console.log(a); //10
console.log(b); //20

//Example 2
const array = [1, 2, 3, 4, 5];
const [zerothele, firstEle, ...rest] = array;

console.log(zerothele); //1
console.log(firstEle); //2
console.log(rest); //[3,4,5]

//Example 3.1: Object Destructuring
const obj2 = {
    x: 1,
    y: 2,
};
const { x, y } = obj2;

console.log(x); //1
console.log(y); //2

//Example 3.2
const f = {
    p: 42,
    q: true,
};

const {
    p: foo,
    q: bar,
} = f;

console.log(f); //{p: 42, q: true}
console.log(foo); //42
console.log(bar); // true

//Example 4.2
const arr = [1, 2, 3];
[arr[0], arr[2]] = [arr[2], arr[0]];
console.log(arr); //[3,2,1]

//Example 5: parsing an array returned from a function
function f() {
    return [1, 2, 3];
}

const [a, , b] = f();
console.log(a); //1
console.log(b); //3 *ignored 2 with an extra ','


////////////////////////////////////////////////
//Private variables and functions
function createUser(name) {
    const discordName = '@' + name;

    let reputation = 0;
    const getReputation = () => reputation; //private variable *
    const giveReputation = () => reputation++; //private variable *

    return { name, discordName, getReputation, giveReputation };
}

const user1 = createUser('Mimsoo');
user1.giveReputation();
user1.giveReputation();

console.log({
    discordName: user1.discordName,
    reputation: user1.getReputation(),
}); // {discordName: '@Mimsoo', reputation: 2}


//*a private variable or function uses closures to create smaller, dedicated variables and functions
// within a factory function itself.
//This way, we can create neater code, without polluting the returned object with unnecessary variables that
//we create while creating the object itself. Often, we do not need every single function within a factory to be
//returned with the object or exposed to an internal variable. You can use them privately since closures allows you to.
//In this case, we did not need control of the reputation variable itself. To avoid things like accidentally settng
//reputation to -18000.

//Private Variables Example
function createGame(gameName) {
    let score = 0;
    return function win() { //if you omit return, you will get an error saying hockeyGame is not a function
        score++;
        return `Your name ${gameName} score is ${score}`
    }
}
const hockeyGame = createGame('Hockey');
const soccerGame = createGame('soccer');
//this allows us to maintain multiple games at once
//even though score variable is the same variable name, because we have created 2 seperate win() functions by using
//the createGame() function, they each have their own private variable score.



////////////////////////////////////////////////
//Prototypal inheritance with factory Functions

// Extending user factory into a Player factory
// User Factory
function createUser(name) {
    const discordName = '@' + name;

    let reputation = 0;
    const getReputation = () => reputation;
    const giveReputation = () => reputation++;

    return { name, discordName, getReputation, giveReputation };
}

const josh = createUser('Josh');

josh.giveReputation();
console.log(josh.getReputation());

// Player Factory
function createPlayer(name, level) {
    const { getReputation, giveReputation } = createUser(name);

    const increaseLevel = () => level++;
    return { name, getReputation, giveReputation, increaseLevel };
}
let ash = createPlayer('Ash', 1);



//Using Object.assign method to add properties
// Example 1
function createPlayerz(name, level) {
    const user = createUser(name);

    const increaseLevel = () => level++;
    return Object.assign({}, user, { increaseLevel });
}
let ashz = createPlayerz('Ashz', 99);


// Example 2
const proto = {
    hello: function hello() {
        return `Hello, my name is ${this.name}`;
    }
};

const george = Object.assign({}, proto, { name: 'George' });
console.log(george.hello()); //Hello, my name is George



//Example
//create an object that will be used as the prototype object
const objProto = {
    fullName() {
        return `${this.fName} ${this.lName}`;
    }
}

//user object
const createUser = function (fName, lName, levelNum) {
    const initlevel = 5;
    const obj = Object.create(objProto);
    obj.fName = fName;
    obj.lName = lName;
    obj.level = levelNum;
    obj.getUserLevel = function () {
        return this.level + initlevel;
    };
    return obj;
};

const user3 = createUser('Mimsoo', 'Luchowa', 34);
const user2 = createUser('Neo', 'Anderson', 3);


//Object.assign()
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
const target = {
    a: 1,
    b: 2,
};

const source = {
    b: 4,
    c: 5,
};

const returnedTarget = Object.assign(source, target);
console.log(returnedTarget); //{b:2, c:5, a:1}

//Cloning an Object
const obj = {
    a: 1,
};

let copy;
console.log(copy); //undefined
copy = Object.assign({}, obj);
console.log(copy); //{a:1}


//Immediately Invoked Function Expression (IIFE)
//example
const calculator = function () {
    const add = (a, b) => a + b;
    return { add };
}

calculator.add(1, 2); //calculator.add is not a funciton

//wrap in parentheses and immediately call it by adding ()
const calculator2 = (function () {
    const add = (a, b) => a + b;
    const sub = (a, b) => a - b;
    const mul = (a, b) => a * b;
    const div = (a, b) => a / b;
    return { add, sub, mul, div };
})();

calculator2.add(1, 2); //3


// Encapsulation - bundling data, code or something into a single unit, with selective access to the things inside that unit
//itself. Therefore, we don't expose everything to the body of our program. This is called 'namespacing'.
//Namespacing is a technique that is used to avoid naming collisions in our programs
//example, creating multiple functions with the name add.
//Does it add two numbers? Strings? Does it take its input directly from the DOM and display the result?
//instead, we can easily encapsulate them inside a module called 'calculator' which generates an object with
//that name, allowing us to explicitly call calculator.add(a, b) or calculator.sub(a, b).


////////////////////////////////////////////////
//If you create a function inside of another function, that function will only ever be
//available inside of that.
//this is an early example of closure
function sayHi(name) {
    function yell() {
        console.log(name.toUpperCase());
    }
    yell();
};

sayHi('Mimsoo') //MIMSOO
yell() //yell is not defined


////////////////////////////////////////////////
//https://dev.to/tomekbuszewski/module-pattern-in-javascript-56jm
//Modules
//Similar concept to factory functions but instead, wrap function with IIFE. Instead of creating a factory function to use,
// over and over, the module pattern will wrap the factory, and IIFE.
//Exposing a module
//Example 1
const Formatter = (function () {
    console.log('start');
    const log = (message) => console.log(`This ${message}`);

    const makeUppercase = (text) => {
        log('Making Uppercase');
        return text.toUpperCase();
    };
    return { makeUppercase }; //<!-- return an object with it so you can use Formatter.makeUppercase
})();

console.log(Formatter.makeUppercase('Mims'));
//outcomes
// start
// This Making Uppercase
// MIMS

//Modules can house functions, arrays, objects and primitives.

//Example 2
const Formatter2 = (function () {
    let timesRun = 0;

    const log = (message) => console.log(`Logger: ${message}`);

    const setTimesRun = () => {
        log('Setting times run');
        ++timesRun;
    };

    const makeUppercase = (text) => {
        log('Making Uppercase');
        setTimesRun();
        return text.toUpperCase();
    };

    return {
        makeUppercase,
        timesRun,
    }
})();

console.log(Formatter2.makeUppercase('mims'));
console.log(Formatter2.timesRun); //0

Formatter2.timesRun = 10;
console.log(Formatter2.timesRun); //10


//its good practice to treat modules as closed entities. They reside within themselves and nothing more is
// needed for them to exist. But sometimes you may want to work with global object, example the DOM or window.
// to achieve that, module may have dependencies.