const Joi = require("joi");

const postsValidation = Joi.object({
  title: Joi.string().required(),
  text: Joi.string().required(),
  tags: Joi.array().items(Joi.string()).default([]),
  views: Joi.number().default(0),
  postImage: Joi.string().optional(),
});

module.exports = postsValidation;
