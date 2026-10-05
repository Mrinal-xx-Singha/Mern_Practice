/**
 * Middleware factory that restricts access to specific roles.
 * Usage: requireRole("employer", "admin")
 */
module.exports = (...roles) => (req, res, next) => {
  if (!roles.includes(req.user.role)) {
    return res.status(403).json({
      error: `Access denied. Requires: ${roles.join(" or ")}`
    });
  }
  next();
};
