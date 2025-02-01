// All Kind of validation

const validator = require("validator");

const validateSignUpData = async (req) => {
  const { firstName, lastName, emailId, password } = req.body;
  if (!firstName || !lastName) {
    throw new Error("Name is not valid!");
  } else if (firstName.length < 4 && firstName.length > 50) {
    throw new Error("First name should ne 4-50 characters");
  } else if (!validator.isEmail(emailId)) {
    throw new Error("Email is not valid!");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("Password is not strong!");
  }
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
