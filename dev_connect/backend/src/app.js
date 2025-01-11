const express = require("express");
const app = express();

// only handle get calll to /user
// app.get("/user", (req, res) => {
//   res.send({ firstName: "Mrinal", lastName: "Singha" });
// });

app.get("/user",(req,res)=>{
  console.log(req.query)
  res.send({firstName:"Mrinal", lastName:"Singha"})
})

app.post("/user",(req,res)=>{
  console.log('Save data to the database')
  res.send("Data successfully saved to the database")
})

app.delete("/user",(req,res)=>{
  res.send("Deleted Successfully")

})

// this will match all the http method api calls to /test
app.use("/test", (req, res) => {
  res.send("Hello from the server");
});

app.listen(5000, () => {
  console.log("Server running on PORT: 5000");
});
