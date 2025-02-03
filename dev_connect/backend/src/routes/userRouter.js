const express = require("express");
const { userAuth } = require("../middlewares/auth");
const { ConnectionRequest } = require("../models/connectionRequest");
const userModel = require("../models/userModel");
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

// Feed API
userRouter.get("/user/feed", userAuth, async (req, res) => {
  try {
    //? user should see all the userCards expect himself
    //? not see card of his connection which is already connected
    //? not see the card of ignored profile
    //? not see already send the connection request

    //? Example -> Rahul = [Ms,virat,ELon,ELon1] all the profiles expect himself
    const loggedInUser = req.user;

    //* string needs to comvert to integer

    const page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 10;

    //* limit sanitization
    limit = limit > 50 ? 50 : limit;

    // calculate skip
    let skip = (page - 1) * limit;

    //* Find all connection requests (sent + received)
    const connectionRequests = await ConnectionRequest.find({
      $or: [{ fromUserId: loggedInUser._id }, { toUserId: loggedInUser._id }],
    }).select("fromUserId toUserId");

    //* Peoples whom i want to hide from my feed [data structure]
    const blockedUsersFromFeed = new Set();
    connectionRequests.forEach((req) => {
      blockedUsersFromFeed.add(req.fromUserId.toString());
      blockedUsersFromFeed.add(req.toUserId.toString());
    });

    //* reverse query
    const users = await userModel
      .find({
        $and: [
          { _id: { $nin: Array.from(blockedUsersFromFeed) } },
          { _id: { $ne: loggedInUser._id } },
        ],
      })
      .select(userArray)
      //* built in functions for pagination
      .skip(skip)
      .limit(limit);

    res.send(users);
  } catch (error) {
    res.status(400).json({ message: "Error:" + error.message });
  }
});

module.exports = { userRouter };
