const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    maxLength: 50,
    required: [true, "Please enter  name."],
  },
  phone: {
    type: Number,
    min: [7, "Must be at least 7 digits. Was given {VALUE}"],
    max: 11,
  },
  email: {
    type: String,
    maxLength: 50,
    required: [true, "Please enter password."],
  },
  password: {
    type: String,
    min: [8, "Must have at least 8 characters"],
    max: 100,
    required: [true, "Please enter password."],
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
