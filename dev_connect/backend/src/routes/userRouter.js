const express = require("express");
const { userAuth } = require("../middlewares/auth");
const { ConnectionRequest } = require("../models/connectionRequest");
const userRouter = express.Router();

// Get all the pending connection requests for the logged in user
userRouter.get("/user/requests", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;

    const connectionRequest = await ConnectionRequest.find({
      toUserId: loggedInUser._id,
      status:"interested"
    });

    res
      .status(200)
      .json({ message: "Data fetched successfully", data: connectionRequest });
  } catch (error) {
    res.status(400).json({ message: "Error:" + error.message });
  }
});

module.exports = { userRouter };
