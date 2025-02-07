/**========================================================================
 *                           ES6 MODULES
 *========================================================================**/
//https://peterxjang.com/blog/modern-javascript-explained-for-dinosaurs.html
//https://www.youtube.com/watch?v=cRHQNNcYf6s&ab_channel=WebDevSimplified

// Example
// a file called functionOne.js
const functionOne = () => console.log('FUNCTION ONE!');
export { functionOne };

// another JS file
import { functionOne } from './functionOne';
functionOne(); // this should work as expected!

// There are many benefits with modules.
// 1. Code reuse
// 2. Same benefits as when using factory functions or the module patterns (module patterns and ES6
    //modules are not the same thing)
// 3. Any declarations made in a module are not auto added to the global scope, thus keeping
    //your code cleanly seperated, easy to write and maintain.

// With the introduction of ES6 Modules, IIFEs module pattern is not needed anymore.
// You can export constructors, classes and factory functions from your modules.

/**============================================
 *               1.NAMED EXPORT
 *=============================================**/
//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/export

//named exports most often used when you have multiple values to export in a mobule:
// modules are automatically interpreted in strict mode.

// a file called myModule.js
const function1 = () => 'ONE';
const function2 = () => 'TWO';

export {
    function1,
    function2
};

// to import them:
// then in the top level module, index.js in /src folder
import {function1, function2} from '.myModule';

// every module can have 2 types of export: named and default. Can have multiple named exports
    //but only 1 default export.


/**============================================
 *                  Note
 *=============================================**/
// You need to include this script in your HTML with a <script> element of type="module", 
    //so that it gets recognized as a module and dealt with appropriately.
// You can't run JS modules via a file:// URL — you'll get CORS errors. 
    //You need to run it via an HTTP server.


/**============================================
 *               2.DEFAULT EXPORT
 *=============================================**/
// to export a single value or to have a fallback value for your module:

// module 'my-module.js'
export default function cube(x) {
    return x*x*x;
}

// in another script, import the default export:
import cube from './my-module.js';
console.log(cube(3)); // 27


/**============================================
 *               3.EXPORT FROM
 *=============================================**/
// Example
// Take a look at how we can have the following hierarchy:
// 1. childModule1.js: exporting myFunction and myVariable
// 2. childModule2.js: exporting MyClass
// 3. parentModule.js: acting as an aggregator (and doing nothing else)
// 4. top level module: consuming the exports of parentModule.js


// In childModule1.js
function myFunction() {
    console.log('Hello!');
}
const myVariable = 1;
export { myFunction, myVariable };

// In childModule2.js
class MyClass {
    constructor(x) {
        this.x = x;
    }
}

export { MyClass };

// In parentModule.js
// Only aggregating the exports from childModule1 and childModule2
// to re-export them
export { myFunction, myVariable } from "childModule1.js";
export { MyClass } from "childModule2.js";

// In top-level module
// "collected/bundled" them in a single source
import { myFunction, myVariable, MyClass } from 'parentModule.js';


/**============================================
 *               IMPORT
 *=============================================**/
//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import

// In order to use import declaration in a source file, the file must be interpreted
    // by the runtime as a module. In HTML, add type="module" to the <script> tag.
// Modules are auto interpreted in strict mode.

// import can only be present in modules and only at the top-level. Otherwise an error
    // is thrown. To load modules in non-module contexts, use the dynamic import syntax instead.
    
// All imported bindings cannot be in the same scope as any other declaration.

// 4 types of import declaration:

/**============================================
 *               1.NAMED IMPORT
 *=============================================**/
// Example 1
import { myExport } from "/modules/my-modules.js";

// Example 2
import { foo, bar } from "/modules/my-modules.js";

// Example 3: You can rename an export when importing it. In the example, it inserts shortName into the current scope.
import { reallyReallyLongModuleExportName as shortName } from "/modules/my-module.js";

// Example 4: A module can also export a member as a string literal:
// /modules/my-module.js
// const a = 1;
// export { a as "a-b" };

// import { "a-b" as a } from "/modules/my-module.js";

/**============================================
 *               2.DEFAULT IMPORT
 *=============================================**/
// Example: since the default doesn't specify a name, you can give the identifier any name you like
import myDefault from "/modules/my-module.js";

// Also possible to specify a default import with namespace imports or named imports.
    // The default import will have to be declared first.

import myDefault, * as myModule from "/modules/my-module.js";
// myModule.default and myDefault point to the same binding

//or
import myDefault, { foo, bar } from "/modules/my-module.js";

/**============================================
 *              3.NAMESPACE IMPORT
 *=============================================**/
// The following code inserts myModule into the current scope, containing all the exports from the module
    // located at /modules/my-module.js
import * as myModule from "/modules/my-modules.js";

/**============================================
 *                 4.SIDE EFFECT
 *=============================================**/
//Import an entire module for side effects only, without importing anything. 
    //This runs the module's global code, but doesn't actually import any values.
// This is often used for polyfills, which mutate the global variables.
import "modules/my-modules.js";

// Imported values can only be modified by the exporter.

/**============================================
 *               WEBPACK TUTORIALS
 *=============================================**/
//https://webpack.js.org/guides/asset-management/
//https://www.youtube.com/watch?v=IZGNcSuwBZs&ab_channel=TraversyMedia