const mongoose = require("mongoose");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const config = require("config");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "can't be blank"],
    minlength: 5,
    maxlength: 50
  },
  email: {
    type: String,
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
    unique: true
  },
  bio: String
});

userSchema.methods.generateAuthToken = function() {
  return jwt.sign(
    { _id: this._id, name: this.name },
    config.get("jwtPrivateKey")
  );
};

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
