const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  image: String,
});

const User = mongoose.model("User", userSchema);

module.exports = User;
