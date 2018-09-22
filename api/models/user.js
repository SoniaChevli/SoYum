const mongoose = require("mongoose");
const Joi = require("joi");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    lowercase: true,
    required: [true, "can't be blank"],
    unique: true,
    minlength: 5,
    maxlength: 50,
    match: [/^[a-zA-Z0-9]+$/, "is invalid"]
  },
  email: {
    type: String,
    lowercase: true,
    required: [true, "can't be blank"],
    minlength: 5,
    maxlength: 255,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    required: true,
    unique: true
  },
  bio: String
});

//userSchema.plugin(uniqueValidator, { message: "is already taken" });

function validateUser(user) {
  const schema = {
    name: Joi.string()
      .min(5)
      .max(50)
      .required(),
    email: Joi.string()
      .min(5)
      .max(50)
      .required()
      .email(),
    password: Joi.string()
      .min(5)
      .max(255)
      .required()
  };

  return Joi.validate(user, schema);
}
const User = mongoose.model("User", userSchema);

exports.validateUser = validateUser;
exports.User = User;
