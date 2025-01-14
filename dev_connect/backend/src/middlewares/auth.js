const adminAuth = (req, res, next) => {
  // Auth method
  // Logic for fetching all data

  const token = "xyz";
  const isAdminAutorized = token === "xyz";

  if (!isAdminAutorized) {
    res.status(401).send("Unauthorized request");
  } else {
    next();
  }
};

const userAuth = (req, res, next) => {
  // Auth method
  // Logic for fetching all data

  const token = "xyz";
  const isAdminAutorized = token === "xyz";

  if (!isAdminAutorized) {
    res.status(401).send("Unauthorized request");
  } else {
    next();
  }
};

const loginAuth = (req, res, next) => {
  //
  const token = "login";
  const isLogin = token === "login";

  if (!isLogin) {
    res.status(401).send("Not logged in please login");
  } else {
    next();
  }
};

module.exports = { adminAuth, loginAuth, userAuth };
