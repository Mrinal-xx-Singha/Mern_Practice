const express = require("express");
const requestRouter = express.Router();
const { userAuth } = require("../middlewares/auth");
const { ConnectionRequest } = require("../models/connectionRequest");
const userModel = require("../models/userModel");

// Connection Request ignore and interested

requestRouter.post(
  "/request/send/:status/:touserId",
  userAuth,
  async (req, res) => {
    try {
      //* userAuth
      const fromUserId = req.user._id;
      const toUserId = req.params.touserId;

      const status = req.params.status;

      const allowedStatus = ["ignored", "interested"];

      //* check allowed status

      if (!allowedStatus.includes(status)) {
        return res
          .status(400)
          .json({ message: "Invalid status type: " + status });
      }

      //* Where my toUserId === fromUserId

      //* is there is an existing Connectionrequest

      const existingConnectionRequest = await ConnectionRequest.findOne({
        //* MongoDB OR Operator to check
        $or: [
          { fromUserId, toUserId },
          { fromUserId: toUserId, toUserId: fromUserId },
        ],
      });

      //* Check duplicate request
      if (existingConnectionRequest) {
        return res
          .status(400)
          .json({ message: "Connection request already exist" });
      }

      //* check is the user is present in the db or not
      const toUser = await userModel.findById(toUserId);

      if (!toUser) {
        return res.status(404).json({ message: " User not found" });
      }

      const newConnectionRequest = new ConnectionRequest({
        fromUserId,
        toUserId,
        status,
      });

      const data = await newConnectionRequest.save();
      res
        .status(200)
        .json({ message: "Connection Request sent successfully", data });
    } catch (error) {
      res.status(400).send("Error:" + error.message);
    }
  }
);

module.exports = { requestRouter };
