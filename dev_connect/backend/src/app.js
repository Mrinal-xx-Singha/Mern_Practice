const express = require("express");
const app = express();
const { adminAuth, loginAuth,userAuth } = require("./middlewares/auth");

// Handle auth middle ware for all request's
app.use("/admin", adminAuth);

app.get("/admin/getAllData", (req, res) => {
  res.send("All data sent");
});

app.get("/user",userAuth, (req, res) => {
  res.send("User Data Saved");
});
app.get("/user/signup", userAuth,(req,res)=>{
  res.send("User SignedUp successfully!!")
})

app.get("/login", loginAuth, (req, res) => {
  res.send("User Logged in !!");
});

app.get("/admin/deletUser", (req, res) => {
  res.send("Deleted a user");
});

app.listen(5000, () => {
  console.log("Server running on PORT: 5000");
});
