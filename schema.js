const BaseJoi = require('joi');
const sanitize = require('sanitize-html');

//setting up an extension for joi to set up a function escapeHTML
const extension = (joi) => ({
  type: 'string',
  base: joi.string(),
  messages: {
    'string.escapeHTML': '{{#label}} must not include HTML!'
  },
  rules: {
    escapeHTML: {
      validate(value, helpers) {
        const clean = sanitize(value, {
          allowedTags: [],
          allowedAttributes: {},
        });
        if (clean !== value) return helpers.error('string.escapeHTML', { value })
        return clean;
      }
    }
  }
})

const Joi = BaseJoi.extend(extension)

// Client-side Validation for Campground
module.exports.campgroundSchema = Joi.object({ //to validate our data even before adding it to the database
  campground: Joi.object({ //has to have campground in the url
    title: Joi.string().required().escapeHTML(),
    price: Joi.number().required().min(0),
    location: Joi.string().required().escapeHTML(),
    // image: Joi.string().required(),
    description: Joi.string().required()
  }).required(),
  deleteImages: Joi.array()
})

// Client-side Validation for Reviews
module.exports.reviewSchema = Joi.object({
  review: Joi.object({
    rating: Joi.number().required().min(1).max(5),
    body: Joi.string().required().escapeHTML()
  }).required()
})
