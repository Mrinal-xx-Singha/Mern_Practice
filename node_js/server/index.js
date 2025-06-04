// Module wrapper

// iify
// (function (
//     exports,
//     require,
//     module,
//     __filename,
//     __dirname
// ) {
   // <Code>
    
//     console.log("Hello Nodejs")
// })();


// console.log(__filename)
// console.log(__dirname)

import greet from "./ES6Imports/greet.js";
import {p1,p2,p3} from "./ES6Imports/peoples.js"

greet(p1)
greet(p2)
greet(p3)
