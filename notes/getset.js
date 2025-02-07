/**========================================================================
 *                           Getter && Setter
 *========================================================================**/
// 2 Kinds of object properties - data & accessor.
// Accessor properties are represented by "getter" and "setter" methods. In an object literal, denoted by get and set.
// Accessor properties are essentially functions that execute on getting and setting a value, but look like regular properties
 //to an external code.
//getters => a function without arguments, that works when a property is read.
//setters => a function with one argument, that is called when the property is set.
//https://www.youtube.com/watch?v=bl98dm7vJt0&ab_channel=ProgrammingwithMosh
//https://www.youtube.com/watch?v=qkAb-4ZR5Yw&ab_channel=ColtSteele
//https://www.youtube.com/watch?v=1WnRom8Yjac&list=PLtwj5TTsiP7uTKfTQbcmb59mWXosLP_7S&index=6&ab_channel=StephenMayeux


//Example
let user = {
    name: 'John',
    surname: 'Smith',

    get fullName() { //just add the keyword 'get' and this method behaves like a property
        return `${this.name} ${this.surname}`;
    }
};

console.log(user.fullName); //John Smith

//If we attempt to assign user.fullName='Alice Cooper', you will still get John Smith. We fix
// this by using set

let user2 = {
    name: 'John',
    surname: 'Smith',

    get fullName() {
        return `${this.name} ${this.surname}`;
    },

    set fullName(value) {
        [this.name, this.surname] = value.split(' ');
    }
};

user.fullName = 'Alice Cooper';
console.log(user2.fullName); //Alice Cooper
console.log(user2.name); // Alice

//Now we have a virtual property fullName. It is readable and writable.

//A property can be either an accessor (has get/set method) or data (has a value) but not both.

//Smarter getters/setters
// getters and setters can be used as wrappers over 'real' property values to gain more control over operations with them.
let user3 = {
    get name() {
        return this._name;
    },

    set name(value) {
        if(value.length < 4) {
            alert("Too short");
            return;
        }
        this._name = value;
    },    
};

user.name = 'Pete';
console.log(user.name); //Pete
user.name = 'Pet';
console.log(user.name); //Too Short

// There is a widely known convention taht properties starting with an underscore _ are internal and should not be 
 // touched from outside the object.

// Example 3
class User {
    constructor(name) {
        this.name = name;
    }

    get name() {
        return this._name;
    }

    set name(value) {
        if(value.length < 4) {
            alert('Name is too short.');
            return;
        }
        this._name = value;
    }
}

let user = new User('John');

// Using for compatibility
//Sometimes it can be hard to remove old code(takes time), therefore we add a getter, like in the example below:
function User(name, birthday) {
    this.name = name;
    this.birthday = birthday;

    // age is calculated from the current date and birthday
    Object.defineProperty(this, 'age', {
        get() {
            let todayYear = new Date().getFullYear();
            return todayYear - this.birthday.getFullYear();
        }
    });
}

let ash = new User('Ash', new Date(1989, 6, 13));


/*================================ Example ==============================*/
//add get to make it behave as a property, otherwise you would need to use
// Person.species() or Worker.species()
class Person {
    static get species() {
        return 'Homo sapiens';
    }

    constructor(firstName, lastName) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.hasJob = false;
    }

    get fullName() {
        return `${this.firstName} ${this.lastName}`;
    }

    setFirstName(firstName) {
        this.firstName = firstName;
    }

    setLastName(lastName) {
        this.lastName = lastName;
    }

    //we do 'set' so that we don't have to repeat person1.setFirstName and person1.setLastName
    set fullName(name) {
        name = name.split(' ');
        this.setFirstName(name[0]);
        this.setLastName(name[1]);
    }
}

class Worker extends Person {
    constructor(firstName, lastName) {
        super(firstName, lastName);
        this.firstName = firstName;
        this.lastName = lastName;
        this.hasJob = true;
    }
}

const person1 = new Person('Mimsoo', 'Entertainment');

console.log(Person.species); //Home sapiens
console.log(Worker.species); //Home sapiens
console.log(person1.fullName); // Mimsoo Entertainment
person1.fullName = 'Ash Luchowa';
console.log(person1.fullName); // Ash Luchowa
console.log(person1.firstName); //Ash
