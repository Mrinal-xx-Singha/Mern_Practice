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
      //* from the parameters 
      const toUserId = req.params.touserId;

      //* again get the status entered from the req.params parameter
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

// accept or reject the connection request
requestRouter.post(
  "/request/review/:status/:requestId",
  userAuth,
  async (req, res) => {
    const loggedInUser = req.user;
    const { status, requestId } = req.params;
    //? Elon => Dhoni
    //? logged in user id => toUserId
    //? status => interested
    //? status [accepted,rejected] only allowed
    //? validate status
    //? request Id should be validated

    //* Validating the status
    const allowedStatus = ["accepted", "rejected"];
    if (!allowedStatus.includes(status)) {
      return res.status(400).json({ message: "Status is  not allowed" });
    }

    const connectionRequest = await ConnectionRequest.findOne({
      _id: requestId,
      toUserId: loggedInUser._id,
      status: "interested",
    });

    if (!connectionRequest) {
      return res.status(404).json({ message: "Connection Request not found!" });
    }

    connectionRequest.status = status;

    const data = await connectionRequest.save();
    res.status(200).json({ message: "Connection request :" + status, data });

    try {
    } catch (error) {
      res.status(400).json({ message: "Error : " + error.message });
    }
  }
);

module.exports = { requestRouter };
