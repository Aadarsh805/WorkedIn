const mongoose = require("mongoose");
const validator = require('validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please tell us your name!"],
  },
  email: {
    type: String,
    required: [true, "Please provide your email"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Please provide a valid email"],
  },
  designation: {
    type: String,
  },
  linkedinUrl: {
    type: String
  },
  github: {
    type: String
  },
  email: {
    type: String
  },
  twitter: {
    type: String
  },
  personalWebsite: {
    type: String
  },
  photo: String,
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: 8,
    select: false
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please confirm your password'],
    validate: {
      validator: function(el) {
        return el === this.password;
      },
      message: 'Passwords are not the same!'
    }
  },
  connections: {
    type: Array,
  },
  skills: {
    type: Array,
  },
  pastProjects: {
    type: Array
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
