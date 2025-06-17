const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ error: "Access Denied. No token." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; //Attach user info to request
    next();
  } catch (error) {
    res.status(403).json({ error: "Invalid token" });
  }
};
