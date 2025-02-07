/**============================================
 *             npm / Dependencies 
 *=============================================**/
// /https://docs.npmjs.com/creating-a-package-json-file
// Install package.json
// npm init

//set default package.json details
// npm set init-author-email "ashluchowa@gmail.com"

// Ensure packages needed at runtime are present as 'dependencies'.
// --save

// Present packages only used during development phase as 'devDependencies'. Example 'Jest Testing Framework'.
// --save-dev

// If dependency is necessary in both production and development, then use 'dependencies'.
// --save

// - npm is a package manager designed to work with nodeJS.
// - nodeJS is a JavaScript runtime designed to run on the server.
// - we need a module bundler to use npm modules, such as webpack.

/**============================================
 *             Webpack
 *=============================================**/

// - Bundling: provide the bundler with an entry point, it then builds dependency graphs from that file,
// combines all relevant files together, then outputs a single file with all necessary codes needed.
// Can also do other stuff, like image optimisation, code minifying, etc.

// - src is where we keep all of our website's source code, where all our work will be done.
// - dist: when we run webpack to bundle our code, it will output the bundled files into the dist directory
// - to deploy our website, we would only need the dist code. Work inside src, build into dist, then deploy from there.