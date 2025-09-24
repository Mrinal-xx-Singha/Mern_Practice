// How do you get access to module.export ?

(function () {
  function addition(a,b) {
    return a+b
  }
  module.exports = addition;
})();
// All the code of the module is wrapper inside the function
// IIFE -> Immediately invoked function expression
// (function (module,require) {
// All code of the modukes
// Keeps variable and functions safe
// })(module.exports={});
// module.exports = {}
// 1st step what type of data is coming 
// 2nd step is Loading the module depends on type file content is loaded according to file type
// 3rd step is it wraps inside an iife 
// 4th step is code evaluation module.exports is returned
// 5th step is caching
