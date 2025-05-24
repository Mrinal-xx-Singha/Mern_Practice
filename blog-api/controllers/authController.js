const User = require("../modeles/User");
const jwt = require("jsonwebtoken");

const createToken = (id) =>
  jwt.sign({ id }, "secret", {
    expiresIn: "7d",
  });

exports.register = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.create({ username, password });

  const token = createToken(user._id);
  res
    .cookie("token", token, {
      httpOnly: true,
    })
    .json({ user: user.username });
};

exports.login = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });

  if (!user || !(await user.comparePassword(password))) {
    return res.status(401).json({ message: "Invalid credentials" });
  }
  const token = createToken(user._id);
  res
    .cookie("token", token, {
      httpOnly: true,
    })
    .json({ user: user.username });
};

exports.logout = (req, res) => {
  res.clearCookie("token").sendStatus(200);
};
