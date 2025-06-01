const express = require("express");
const connectDB = require("./utils/db");
require("dotenv").config();
const userRouter= require("./routes/userRoute")
const postRoutes = require("./routes/postRoutes")
const cookieParser = require("cookie-parser")

/**
 * *Collections instead of tables
 * *Documents instead of rows
 * *Schema-less by nature (but you can enforce structure with mongoose )
 * {
 * _id:"9quw189", primary key for a document
 * "name:"Mrinal",
 * 'skills':['React','Node','MongoDB]
 * 'active':true
 * }
*/

// MongoDB is a NoSql document database that stores data in json like bson documents
// mongoose is a ODM (Object Data Modeling) library for mongoDB and Node.js

const app = express();
app.use(express.json())
app.use(cookieParser())



app.use("/api",userRouter );
app.use("/api/posts",postRoutes)
app.listen(3000, () => {
  connectDB();
  console.log("Server is running 🟢");
});
