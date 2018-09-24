const mongoose = require("mongoose");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const config = require("config");

const photoSchema = new mongoose.Schema({
  restaurant: {
    type: String,
    required: [true, "can't be blank"],
    minlength: 1,
    maxlength: 50
  },
  author: {
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    name: { type: String }
  },
  city: {
    type: String,
    required: [true, "can't be blank"],
    minlength: 2,
    maxlength: 100
  },
  description: String,
  photo: {
    type: String
  },
  tags: [],
  created_at: {
    type: Date,
    default: Date.now()
  }
});

function validatePhoto(photo) {
  const schema = {
    restaurant: Joi.string()
      .min(1)
      .max(50)
      .required(),
    author: Joi.string(),
    city: Joi.string().required(),
    description: Joi.string(),
    photo: Joi.string().required()
  };

  return Joi.validate(photo, schema);
}

const Photo = mongoose.model("Photo", photoSchema);

exports.photoSchema = photoSchema;
exports.Photo = Photo;
exports.validatePhoto = validatePhoto;
