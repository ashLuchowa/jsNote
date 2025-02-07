// Object constructors
// constructor function is just a regular function. 
// It becomes a constructor when it is called on by an instance with the new keyword.
// We capitalize the first letter of a constructor function by convention.
function Book(title, author, pages, read) {
  this.title = title,
  this.author = author,
  this.pages = pages,
  this.read = read;
  this.info = function() {
    return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read}`
  };
}

const theHobbit = new Book ('The Hobbit', 'J.R.R. Tolkien', 295, 'not read yet');


//All objects in JS have a prototype. The prototype is another object that the original object
// inherits from. The original object has access to all of its prototype's method and properties.

//we can define properties or functions on the original object as shown:
function Player(name, marker) {
  this.name = name;
  this.marker = marker;
  this.sayName = function() {
    console.log(this.name)
  };
}

const player1 = new Player('steve', 'X');
const player2 = new Player('also steve', 'O');

Player.prototype.sayHello = function() {
  console.log('Hello, I\'m a player');
}

player1.sayHello(); // "Hello, I'm a player!"
Object.getPrototypeOf(player1) === Player.prototype; // true
Object.getPrototypeOf(player1) === Object.getPrototypeOf(player2); // true

//.__proto__ has been deprecated and is not recommended

// We use prototypes to:
// 1. save memory: define properties/functions using a centralized, shared object which objects have access to.
// 2. Prototypal Inheritance.

//type Object.prototype into the console.

//use Object.setPrototypeOf() to 'set' prototype of an object.

function Person(name) {
  this.name = name;
}

Person.prototype.sayName = function() {
  console.log(`Hello, I'm ${this.name}`);
};

function Player(name, marker) {
  this.name = name;
  this.marker = marker;
}

Player.prototype.getMarker = function() {
  console.log(`My marker is '${this.marker}'`);
};

Object.getPrototypeOf(Player.prototype) === Object.prototype; // true
Object.getPrototypeOf(Player.prototype) === Person.prototype; // false

// Now make Player objects inherit from Person
Object.setPrototypeOf(Player.prototype, Person.prototype);
//Therefore
Object.getPrototypeOf(Player.prototype) === Person.prototype; // true
// And Object.getPrototype(Player.prototype); returns Person.prototype

const player3 = new Player('steve', 'X');
const player4 = new Player('also steve', 'O');

player3.sayName(); // Hello, I'm steve!
player4.sayName(); // Hello, I'm also steve!

player3.getMarker(); // My marker is 'X'
player4.getMarker(); // My marker is 'O'

//Array
let y = [];
Object.getPrototypeOf(y); //pop, push etc
Object.getPrototypeOf(y) === Array.prototype; //true
y instanceof Array; //true




//Use call() method to copy over properties from one constructor into another constructor
// Initialise constructor functions
function Hero(name, level) {
  this.name = name;
  this.level = level;
}

let hero1 = new Hero('Bjorn', 1);

Hero.prototype.greet = function() {
  return `${this.name} says Hello.`;
}

function Warrior(name, level, weapon) {
  Hero.call(this, name, level);
  this.weapon = weapon;
}

function Healer(name, level, spell) {
  Hero.call(this, name, level);
  this.spell = spell;
}

//Generate Characters
const player5 = new Healer ('Mimsoo', 23, 'Cure');
const player6 = new Warrior ('Ora', 2, 'Axe');

// Link prototypes and add prototype methods
Warrior.prototype.attack = function() {
  return `${this.name} attacks with ${this.weapon}.`;
}

Healer.prototype.heal = function() {
  return `${this.name} heals with ${this.spell}.`;
}

// However
console.log(player5.greet) // player5.greet is not a function
// so we use
Object.setPrototypeOf(Warrior.prototype, Hero.prototype);
Object.setPrototypeOf(Healer.prototype, Hero.prototype);

console.log(player5.greet) // Mimsoo says Hello.

//Loops
let animal = {
  eats: true,
};

let rabbit = {
  jumps: true,
  __proto__: animal,
};

console.log(Object.keys(rabbit)); //jumps
for(let prop1 in rabbit) console.log(prop1); // jumps, eats





////////////////////////////////////////////////
// why both hamsters has apple in stomach even though only speedy ate the apple?
let hamster = {
  stomach: [],

  eat(food) {
    // To fix this
    this.stomach.push(food); //remove
    // and add the line below
    // this.stomach = [food];
  }
};

let speedy = {
  __proto__: hamster
  // or you can simply have each hamster have their own stomach like below
  // stomach: [],
};

let lazy = {
  __proto__: hamster
  // stomach: [],
};

// This one found the food
speedy.eat("apple");
alert( speedy.stomach ); // apple

// This one also has it, why? fix please.
alert( lazy.stomach ); // apple




////////////////////////////////////////////////
//Object.create() creates a new object, using existing object as the prototype of the newly created object.

const person = {
  isHuman: false,
  printIntroduction: function () {
    console.log(`My name is ${this.name}. Am I human? ${this.isHuman}`);
  },
};

const me = Object.create(person);

me.name = 'Matt';
me.isHuman = true;
me.printIntroduction(); // "My name is Matt. Am I human? true"