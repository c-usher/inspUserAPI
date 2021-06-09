const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
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

const User = model('User', UserSchema);

module.exports = User;
