const Joi = require('joi');

function validatePost(post) {
  const schema = Joi.object({
    title: Joi.string().required(),
    body: Joi.string().required(),
    active: Joi.boolean().required(),
    location: Joi.object({
      type: Joi.string().valid('Point').required(),
      coordinates: Joi.array().items(Joi.number()).required().length(2),
    }).required(),
  });

  return schema.validate(post);
}

module.exports = validatePost;
