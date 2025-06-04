// File System

// Promise
// Callback
// Synchronous

import * as fs from "fs/promises";
//* Creating Directory

// (async () => {
//   try {
//     await fs.mkdir(
//       "g:\\MERN_PRACTICE\\node_js\\server\\FileSystem\\promise.api\\courses",
//       { recursive: true }
//     );
//     console.log("Folder created");
//   } catch (error) {
//     console.error("Error creating folder:", error);
//   }
// })();

//* Read the content of the folder

// (async () => {
//   try {
//     const files = await fs.readdir(
//       "g:\\MERN_PRACTICE\\node_js\\server\\FileSystem\\promise.api\\courses"
//     );
//     for (const file of files) {
//       console.log(file);
//     }
//   } catch (error) {
//     console.log(error);
//   }
// })();

//* Remove  Folder / Directory
// the folder should be empty

// (async () => {
//   try {
//     await fs.rmdir(
//       "g:\\MERN_PRACTICE\\node_js\\server\\FileSystem\\promise.api\\courses"
//     );
//     console.log("Folder deleted")
//   } catch (error) {
//     console.log(error);
//   }
// })();

//* Create and Write file

(async () => {
  await fs.writeFile("README.md", "Hello Nodejs");
})();
