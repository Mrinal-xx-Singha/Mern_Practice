// Pass code from one file to another file

const greet = require("../Modules/greet")
const {person1,
    person2,
    person3} = require("../Modules/peoples")

greet(person1)
greet(person2)
greet(person3)
