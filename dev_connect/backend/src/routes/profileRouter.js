const express = require("express");
const profileRouter = express.Router();
const { userAuth } = require("../middlewares/auth");
//Profile Api
profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    // const cookies = req.cookies;

    // const { token } = cookies;

    // if (!token) {
    //   throw new Error("Invalid Token!");
    // }

    // * Validate my token

    // const decodedMsg = await jwt.verify(token, "secret");
    // console.log(decodedMsg);
    // const { _id } = decodedMsg;

    // console.log("Logged in user is :" + _id);

    // const user = await userModel.findById(_id);
    const user = req.user;
    // if(!user){
    //   throw new Error("Please log in!")
    // }

    // else please login redirect to login page

    //! console.log(cookies);
    res.status(200).send("Logged in User:" + user);
  } catch (error) {
    res.status(400).send("Error :" + error.message);
  }
});

module.exports = { profileRouter };
