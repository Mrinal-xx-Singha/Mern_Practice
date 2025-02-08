const express = require("express");
const profileRouter = express.Router();
const { userAuth } = require("../middlewares/auth");
const { validateProfileEditData } = require("../utils/validation");
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

// Profile edit API
profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    if (!validateProfileEditData(req)) {
      throw new Error("Invalid edit request");
    }

    //* auth middleware has attached user
    const loggedInUser = req.user;

    Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));

    await loggedInUser.save();

    res
      .status(200)
      .json({
        message: `${loggedInUser.firstName}, your Profile Updated Successfully !!!`,
        data: loggedInUser,
      });
  } catch (error) {
    res.status(400).send("Error : " + error.message);
  }
});

// FORGOT PASSWORD API
// profileRouter.patch("/profile/password",userAuth, async(req,res)=>{

// })

module.exports = { profileRouter };
