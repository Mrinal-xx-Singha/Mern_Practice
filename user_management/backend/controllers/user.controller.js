const UserService = require("../services/user.services");

exports.register = async (req, res, next) => {
  try {
    const user = await UserService.register(req.body);
    res.status(201).json({ message: "User created", user });
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const token = await UserService.login(req.body);
    res.json({ token });
  } catch (error) {
    next(error);
  }
};
