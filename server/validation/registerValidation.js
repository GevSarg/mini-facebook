const Joi = require("joi");

const registerValidation = Joi.object({
  name: Joi.string().min(2).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  avatar: Joi.string().optional(),
});

module.exports = { registerValidation };
