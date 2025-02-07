/**============================================
*                 Global Scope
*=============================================**/
const first = 'Wes';
const second = 'Bos';
const age = 100;

console.log(first); //Wes
console.log(second); //Bos
console.log(age); //100;
window.first //undefined
window.second //undefined
window.age //100

// That's because var variables are attached to the window object and they are globally scoped. Const and let in the above example
// are still globally scope but not attached to the window.

// Using global scope is almost never a good idea.


/**============================================
*                Function Scope
*=============================================**/
// variables created inside a function only available inside that function.
// think of curly brackets as gates.

//example
const age2 = 100;

function go() {
    // const age2 = 200; //then console.log(age2 will be 200)
    const hair = 'blonde';
    console.log(hair); // blonde
    console.log(age2); // 100 **
}

go();

console.log(age2); // 100
console.log(hair); // hair is not defined

// ** variables, if not found inside of a function, will go up a level higher and look for a variable in that scope.
// If not avaiable in that scope, it will go up a level higher. And so on (multiple nested scope).



/**============================================
*                Block Scope
*=============================================**/
// const variables cannot be reassigned, and let and var variables can be re-assigned. They have a different way of how they are scoped.

//Example 1
if (1 === 1) {
    const cool = true;
}
console.log(cool); //Error

//Example 1.1
if (1 === 1) {
    var cool = true;
}
console.log(cool); //true

//Example 1.2
if (1 === 1) {
    let cool = true;
}
console.log(cool); //Error



//Example 2
function isCool(name) {
    let cool;
    if (name === 'wes') {
        cool = true; //**
    }
    console.log(cool);
    return cool;
}

isCool('wes'); //true
// Here we have a function scope + block scope which is within the if(name === 'wes' {...}).
// ** if const cool = true, it wouldn't work. 
// Var would work however. Because var variables are not blocked scoped. They are function scoped.
// In the example, they are available outside of the if statement block but only inside the isCool() function.

// It's nice to have block scoping because you don't have variables leaking out of it. In the past, we have had for loops.

// Block scoping is one of the reasons people say use const by default, let when you want to re-assign it 
// and don't use var unless there is a specific use case for it.


// Example 3
const dog = 'snickers';

function logDog() {
  console.log(dog);
}
function go() {
  const dog = 'sunny';
  logDog();
}
go(); // snickers



/**============================================
*          Lexical and Static Scoping
*=============================================**/
// So even though the logDog() function is run inside of another function which has a locally scoped dog variable, 
// it doesn't care about where it's run, it cares about where it is defined.

// Because logDog() is defined where it is, since it doesn't have a local variable named dog, it will just go up one level.

// Ideally, the function logDog() would take a parameter of dog and then log whatever parameter value it is passed like below:

const doge = 'snickers';

function logDoge(doge) {
    console.log(doge);
}

function go2() {
    const doge = 'Sunny';
    logDoge('Rufus');
}

go2(); // Rufus

// Because when a function takes in an argument, it will make local variables inside of that function 
// named whatever you named the parameter, and then that is available to them.
// It is taking the value that you pass the first parameter and making a local variable for the function.