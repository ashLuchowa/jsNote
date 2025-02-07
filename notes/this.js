/**============================================
 *               this kewword
 *=============================================**/

// in general, this references the object of which the function is a property

let counter = {
    count: 0,
    next: function () {
        return ++this.count;
    },
};

counter.next();
// Inside the next() function, the this references the counter object.


/**============================================
 *      1. this in Simple Function Invocation
 *=============================================**/
function show() {
    console.log(this === window); //true
}
show();

function show2() {
    //if you remove strict mode, it will return true, thus referencing the global object
    'use strict';
    console.log(this === window); //false

    function display() {
        console.log(this === window); //false
    };
    display();
}
show2();


/**============================================
 *          2. this in Method Invocation
 *=============================================**/
let car = {
    brand: 'Honda',
    getBrand: function () {
        return this.brand;
    }
}

console.log(car.getBrand()); //Honda

// Here, this object in the getBrand() method references the car object
// Since a method is a property of an object which is a value, you can store it in a variable.
let brand = car.getBrand;
console.log(brand()); //undefined

//the bind() method creates a new function whose the this keyword is set to a specified value
brand = car.getBrand.bind(car);
console.log(brand()); //Honda


/**============================================
 *      3. this in Constructor Invocation
 *=============================================**/
function Car2(brand) {
    this.brand = brand;
}

Car2.prototype.getBrand = function () {
    return this.brand;
}

let car2 = new Car2('Honda');
console.log(car2.getBrand()); //Honda

// JS creates a new object and sets this to the newly created object.


/**============================================
 *      4. this in Indirect Invocation
 *=============================================**/
function getBrand(prefix) {
    console.log(prefix + this.brand);
}

let honda = {
    brand: 'Honda'
};
let audi = {
    brand: 'Audi'
};

getBrand.call(honda, "It's a "); //It's a Honda
getBrand.call(audi, "It's an "); //It's an Audi

// we called the getBrand() function indirectly using the call() methond of the getBrand function.
// The apply() method is similar to the call() method except that its second argument is an array 
// of arguments.

getBrand.apply(honda, ["It's a "]); // "It's a Honda"
getBrand.apply(audi, ["It's an "]); // "It's an Audi"


/**============================================
*          this in Arrow Functions
*=============================================**/
// the arrow function does not create its own execution context but inherits
// the this from the outer function where the arrow function is defined.

//Example 1
let myFunction = () => this;
console.log(myFunction() === window); //true

// this value is set to the global object.

//Example 2
function Car() {
    this.speed = 120;
};

Car.prototype.getSpeed = () => {
    return this.speed;
};

var car3 = new Car();
console.log(car3.getSpeed()); // 👉 undefined

// Inside the getSpeed() method, this reference the global object, not the Car object
 // but the global object doesn't have a property called speed.
 // Therefore, the this.speed in getSpeed() method returns undefined.