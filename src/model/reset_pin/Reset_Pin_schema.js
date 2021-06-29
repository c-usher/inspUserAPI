const mongoose = require("mongoose");

const ResetPinSchema = new mongoose.Schema({
  pin: {
    type: String,
    minLength: 6,
    maxLength: 6,
  },
  email: {
    type: String,
    maxLength: 50,
    required: true,
  }
});

module.exports = {
  ResetPinSchema: mongoose.model("Reset_Pin", ResetPinSchema)
};
