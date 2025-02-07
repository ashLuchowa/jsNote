/**============================================
*                 Closures
*=============================================**/
// A closure is the ability to access a parent level scope from a child scope, even after the parent function has been terminated.

// Example 1.1
function outer() {
    const outerVar = 'Hey I am the outer Var';

    function inner() {
        const innerVar = 'Hey, I am the inner var';
        console.log(innerVar);
        console.log(outerVar);
    }

    inner();
}

outer();
// Hey, I am the inner var
// Hey, I am the outer Var


// Now this is where closures come into play, where you don't call the inner() function from within the outer() function but at a later
// point in time.

// Example 1.2
function outer() {
    const outerVar = 'Hey I am the outer Var';

    function inner() {
        const innerVar = 'Hey, I am the inner var';
        console.log(innerVar);
        console.log(outerVar);
    }

    return inner; //**
}

const innerFn = outer(); //***
innerFn(); //Hey, I am the...
outer()(); //Hey, I am the... <-- this works as well


// we are running the outer function
// it's creating an outer variable (outerVar)
// ** then we are returning the inner function, which is why we are sticking it*** in in a variable (innerFn).

// You can stick a function into a variable, and then at a later point in time, you can have access to that function.
// A closure comes into play because you can access the function even though the outer function is done.

// JavaScript is able to create functions inside of functions, and it can still reach outside to the parent scope, and even 
// though the outer function is done running, it will still maintain that variable in memory so that we can then access it 
// at a later time.


/**============================================
*             Examples of Closures
*=============================================**/

//Outer Scope here
function createGreeting(greeting = '') {
    const myGreet = greeting.toUpperCase();

    // Inner Scope here
    return function(name) {
        return `${myGreet} ${name}`;
    };
}

const sayHello = createGreeting('hello');
const sayHola = createGreeting('hola');

console.log(sayHello('Ash')); // HELLO Ash
console.log(sayHola('Amigo')); // HOLA Amigo

// Since our inner scope references a variable  that was created in our outer scope, that is what is referred to as closure.
// We still are able to access our outer variables inside of the outer function scope, inside of our inner even 
// after the createGreeting() function has been closed over. That is the whole idea behind closures, it's been closed.


/**============================================
*              Private Variables
*=============================================**/
//Example
function createGame(gameName) {
    let score = 0;

    return function win() { //not adding return will throw an error
        score ++;
        return `Your name ${gameName} score is ${score}`;
    }
}

const hockeyGame = createGame('Hockey');

//Under the hockeyGame variable, we will declare another variable
const soccerGame = createGame('Soccer');

//Even though the score variable is the same variable name, each have their own private variable score.


// Clear explanation on closures
//https://www.youtube.com/watch?v=80O6L2Ez3GM&ab_channel=BroCode