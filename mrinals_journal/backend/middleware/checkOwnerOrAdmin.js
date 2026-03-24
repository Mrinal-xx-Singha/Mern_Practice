/**
 * Generic middleware factory to check if a user is the owner of a document or an admin.
 * @param {Mongoose.Model} Model - The Mongoose model to query.
 * @param {string} paramName - The name of the request parameter containing the document ID.
 * @param {string} userField - The field in the model that stores the owner's ID (default: "author").
 */
module.exports = function (Model, paramName = "id", userField = "author") {
  return async function (req, res, next) {
    try {
      const doc = await Model.findById(req.params[paramName]);
      if (!doc) {
        return res.status(404).json({ error: `${Model.modelName} not found` });
      }

      const isOwner = doc[userField]?.toString() === req.user.id;
      const isAdmin = req.user.role === "admin";

      if (!isOwner && !isAdmin) {
        return res.status(403).json({ error: "Access denied. Unauthorized." });
      }

      // Attach document to request for potential use in the route handler
      req.doc = doc;
      next();
    } catch (error) {
      console.error(`RBAC Error (${Model.modelName}):`, error);
      res.status(500).json({ error: "Server error during permission check" });
    }
  };
};
