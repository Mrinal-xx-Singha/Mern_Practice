// All Kind of validation

const validator = require("validator");

const validateSignUpData = async (req) => {
  const { firstName, lastName, emailId, password } = req.body;
  if (!firstName || !lastName) {
    return { success: false, message: "Name is not valid!" };
  } else if (firstName.length < 4 || firstName.length > 50) {
    return { success: false, message: "First name should ne 4-50 characters" };
  } else if (!validator.isEmail(emailId)) {
    return { success: false, message: "Email is not valid!" };
  } else if (!validator.isStrongPassword(password)) {
    return { success: false, message: "Password is not strong!" };
  }
  return { success: true }; // if everything is fine
};
const validateProfileEditData = (req) => {
  const allowedEditFields = [
    "firstName",
    "lastName",
    "emailId",
    "age",
    "gender",
    "photoUrl",
    "skills",
    "about",
  ];

  //* returns a boolean
  const isEditAllowed = Object.keys(req.body).every((field) =>
    allowedEditFields.includes(field)
  );
  console.log("ISEDITALLOWED:->" + isEditAllowed);

  return isEditAllowed;
};

module.exports = {
  validateSignUpData,
  validateProfileEditData,
};
