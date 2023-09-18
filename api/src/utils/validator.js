const Joi = require("joi");
const passwordValidator = require("password-validator");
const idRegex = /^[0-9a-fA-F]{24}$/;

function validateId(id) {
  return Joi.string().regex(idRegex, "id").required().validate(id, { stripUnknown: true });
}

function validateString(string) {
  return Joi.string().validate(string, { stripUnknown: true });
}

function validateArray(array) {
  return Joi.array().items(Joi.string().allow(null, "")).validate(array, { stripUnknown: true });
}

function validatePassword(password) {
  const schema = new passwordValidator();
  schema
    .is()
    .min(12) // Minimum length 12
    .has()
    .uppercase() // Must have uppercase letters
    .has()
    .lowercase() // Must have lowercase letters
    .has()
    .digits() // Must have digits
    .has()
    .symbols(); // Must have symbols

  return schema.validate(password);
}

function validateFirstName() {
  return Joi.string().custom((value) => (value ? value.replace(/(?<=^|\s)\S+/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()) : null));
}

module.exports = {
  validateId,
  validateString,
  validateArray,
  validateFirstName,
  validatePassword,
};
