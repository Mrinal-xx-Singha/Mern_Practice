const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

const userAuth = async (req, res, next) => {
  // * Read the token from the request cookies
  // * validate the token
  //  * Find the user

  try {
    const { token } = req.cookies;

    if (!token) {
      throw new Error("Token is not valid!!!");
    }

    // Decode the the data
    const decodedObj = await jwt.verify(token, "secret");

    const { _id } = decodedObj;

    const user = await userModel.findById(_id);

    if (!user) {
      throw new Error("User not found");
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(404).send("Error:" + error.message);
  }
};

module.exports = { userAuth };
