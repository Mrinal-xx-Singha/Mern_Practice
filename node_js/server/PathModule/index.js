// Path Module
import path from "path";

// gives the last portion of the path
console.log(path.basename("c:\\nodejs\\index.js"));

console.log(path.basename("c:\\nodejs\\index.js", ".js"));

// Gives the directory name
console.log(path.dirname("c:\\nodejs\\index.js"));
// Gives the  Extension name
console.log(path.extname("c:\\nodejs\\index.cpp"));

// Creates the path
console.log(path.join("c:", "mrinal-webdev", "course", "redux-toolkit"));
// Go up a level
console.log(path.join("c:", "mrinal-webdev", "course", "redux-toolkit", ".."));
// Go up a level
console.log(
  path.join("c:", "mrinal-webdev", "course", "redux-toolkit", "..", "..")
);

console.log(path.normalize("c:\\courses\\\redux\\store\\features"));

console.log(path.parse("c:\\nodejs\\index.cpp"));
console.log(path.parse("c:\\nodejs\\index.cpp").base);
console.log(path.parse("c:\\nodejs\\index.cpp").name);
