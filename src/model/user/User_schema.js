const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    maxLength: 50,
    required: [true, "Please enter  name."],
  },
  phone: {
    type: Number,
    min: [7, "Must be at least 7 digits. Was given {VALUE}"],
    maxLength: 11,
  },
  email: {
    type: String,
    maxLength: 50,
    required: [true, "Please enter password."],
  },
  password: {
    type: String,
    min: [8, "Must have at least 8 characters"],
    maxLength: 100,
    required: [true, "Please enter password."],
  },
  refreshJWT: {
    token: {
      type: String,
      maxLength: 666,
      default: "",
    },
    addedAt: {
      type: Date,
      required: true,
      default: Date.now(),
    },
  },
});

// const User = mongoose.model("User", UserSchema);

module.exports = { UserSchema: mongoose.model("User", UserSchema) };
