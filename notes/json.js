// /**========================================================================
//  *                              JSON
//  *========================================================================**/
// JSON (JavaScript Object Notation) is a standardized format for structuring data. Exist as a string.
// Heavily based on the syntax of JS objects.
// Often used when working with external servers and APIs.
// The universal format for transmitting data on the web.
// Can be used independently from JS.

// Check example in example.json file

// JSON validator: https://jsonlint.com/


/**============================================
 *               JSON.parse()
 *=============================================**/
// https://www.w3schools.com/js/js_json_parse.asp
// read = parse
// Parse the data with JSON.parse() and the data becomes a JS object.
// Example

// Suppose we receive this text from a web server:
'{"name":"John", "age":30, "city":"New York"}'

// Using JSON.parse()
const obj = JSON.parse('{"name":"John", "age":30, "city":"New York"}');
console.log(obj.name); //John

// Exceptions
// Date objects not allowed in JSON. Need to convert it as a string, 
  // then convert it back into a data later. Or use reviver function.

// Functions are not alllowed. Write it as a string, then convert back to a function later.
// Try to avoid using functions in JSON. They lose their scope and you would have to used eval() to convert
  // them back into functions.


/**============================================
 *               JSON.stringify()
 *=============================================**/
// Convert JS objects into a string with JSON.stringify()

// Example
const obj2 = {name: "John", age: 30, city: "New York"};

//Use stringify() to convert the object into a string
const myJSON = JSON.stringify(obj2);
console.log(myJSON); //{"name":"John","age":30,"city":"New York"}


/**============================================
 *               Storing the data
 *=============================================**/
// https://www.w3schools.com/js/js_json_stringify.asp

// Example:
const myObj3 = {name: "John", age: 31, city: "New York"};
const myJSON3 = JSON.stringify(myObj3);
localStorage.setItem("testJSON", myJSON3);

// Retrieving data:
let text3 = localStorage.getItem("testJSON");
let obj3 = JSON.parse(text3);
console.log(obj3.name); //John


// Exceptions
// JSON.stringify() will convert any dates into strings.
// Functions are not allowed as object values.
  // The JSON.stringify() function will remove any functions from a 
  // JavaScript object, both the key and the value:

