const express = require("express");
const { userAuth } = require("../middlewares/auth");
const { ConnectionRequest } = require("../models/connectionRequest");
const userRouter = express.Router();

//* Send specific data to the client
const userArray = [
  "firstName",
  "lastName",
  "photoUrl",
  "age",
  "skills",
  "about",
  "gender",
];

// Get all the pending connection requests for the logged in user
userRouter.get("/user/requests", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;

    const connectionRequest = await ConnectionRequest.find({
      toUserId: loggedInUser._id,
      //? Status should be pending
      status: "interested",
      // building relation between two tables
    }).populate("fromUserId", userArray);

    res
      .status(200)
      .json({ message: "Data fetched successfully", data: connectionRequest });
  } catch (error) {
    res.status(400).json({ message: "Error:" + error.message });
  }
});

// connections api to get all the accepted requests with the data
userRouter.get("/user/connections", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;

    //? CAN BE FROMUSER ELON => DHONI (ACCEPTED)
    //? CAN BE TOUSER ELON => MARK (ACCEPTED)

    const connectionRequests = await ConnectionRequest.find({
      $or: [
        { toUserId: loggedInUser._id, status: "accepted" },
        { fromUserId: loggedInUser._id, status: "accepted" },
      ],
    })
      .populate("fromUserId", userArray)
      .populate("toUserId", userArray);
    // map the data from the connectionRequests to filter unnecessary data
    const data = connectionRequests.map((row) => {
      if (row.fromUserId._id.toString() === loggedInUser._id.toString()) {
        return row.toUserId;
      }
      return row.fromUserId;
    });

    res.status(200).json({ data: data });
  } catch (error) {
    res.status(400).json({ message: "Error:" + error.message });
  }
});

module.exports = { userRouter };
