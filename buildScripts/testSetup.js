//This file is not transpiled, so must use CommonJs and ES5

//Register babel to transpile before our test run
require('babel-register')();

//Disable webpack features that Mocha does not understand
require.extensions['.css'] = function(){};
