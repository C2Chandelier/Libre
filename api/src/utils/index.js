const UserModel = require("../models/user");
const AdminModel = require("../models/admin");
const passwordValidator = require("password-validator");
const Joi = require("joi");

function isUser(user) {
  return user instanceof UserModel;
}
function isAdmin(user) {
  return user instanceof AdminModel;
}
function cookieOptions(maxAge) {
  return {
    maxAge,
    httpOnly: true,
    secure: false,
    domain: "localhost",
    sameSite: "Lax",
  };
}

module.exports = {
  isAdmin,
  isUser,
  cookieOptions,
};
