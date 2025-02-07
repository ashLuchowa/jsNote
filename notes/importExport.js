/**============================================
*              ES6 MODULES (ESM)
*=============================================**/
// https://www.youtube.com/watch?v=cRHQNNcYf6s&ab_channel=WebDevSimplified

////////////// Default and Named exports //////////////
//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/export

// only 1 default export is allowed but multiple named exports allowed

// You need to include this script in your HTML with a <script> element of type="module", 
// so that it gets recognized as a module and dealt with appropriately.

// Entry Points
// Instead of adding every JavaScript file to our HTML in order, we only need to link a single file - the entry point.
<script src="sub.js" type="module"></script>



////////////// Example 1 //////////////
//in main.js
const greeting = 'Hello, stranger!';
const farewell = 'bye';
const ola = 'ola';

// export default greeting;
export { farewell, ola, greeting as default };

// export default farewell; <-- this works as well for default

// export default 1 + 1; <-- synxtax allows any expression

//in sub.js [top-level module linked in your HTML page with script type = 'module']
// import newGreeting {farewell, ola} from "./main"; <-- can use any name such as newGreeting instead of greeting because it is a default export
console.log(newGreeting); //Hello, stranger
console.log(farewell); //bye
console.log(ola); //ola


////////////// Example 2 //////////////
// You can also rename named exports to avoid naming conflicts
export { myFunctions as function1, myVariable as variable };
// export { myFunction as 'my-function' };


////////////// Example 3 //////////////
// module "my-module.js"
function cube(x) {
    return x * x * x;
}

const foo = Math.PI + Math.SQRT2;

const graph = {
    options: {
        color: "white",
        thickness: "2px",
    },
    draw() {
        console.log("From graph draw function");
    },
};

export { cube, foo, graph };

// Then in the top-level modile included in your HTML page, we could have:
import { cube, foo, graph } from "./my-module.js";

graph.options = {
    color: "blue",
    thickness: "3px",
};

graph.draw(); // Logs "From graph draw function"
console.log(cube(3)); // 27
console.log(foo); // 4.555806215962888


////////////// Example 4 //////////////
// You can also bundle exports together
// Example, you have child1.js, child2.js and parent.js and a top-level module

//In child1.js
const myVariable = 1;
export { myVariable };

//In child2.js
class myClass {
    constructor(x) {
        this.x = x;
    }
}
export { myClass };

//in the parent.js module <-- will bundle the two childs
export { myChild1 } from 'child1.js';
export { myChild2 } from 'child2.js';

//in top-level module
import { myChild1, myChild2 } from 'parent.js';



////////////// Import //////////////
//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import

//4 forms of import declarations:
// Named import
import { export1, export2 } from "module-name";


// Default import
import defaultExport from "module-name";


// Namespace import 
import * as name from "module-name";
// Here, myModule represents a namespace object which contains all exports as properties. 
// For example, if the module imported above includes an export doAllTheAmazingThings(), you would call it like this:
myModule.doAllTheAmazingThings();


// Side effect import
// Import an entire module for side effects only, without importing anything. This runs the module's
// global code, but doesn't actually import any values.
import "module-name";
