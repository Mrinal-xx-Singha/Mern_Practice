const express = require("express");
const requestRouter = express.Router();
const {userAuth} = require("../middlewares/auth")

requestRouter.post("/sendConnectionRequest", userAuth, async (req, res) => {
  const user = req.user;
  res.status(200).send(user.firstName + "Sent the connection request");
});

module.exports = requestRouter;
