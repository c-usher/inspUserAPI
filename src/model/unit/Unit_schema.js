const mongoose = require("mongoose");

const UnitSchema = new mongoose.Schema({
  clientId: {
    type: Schema.Types.ObjectId,
  },
  addedAt: {
    type: Date,
    required: true,
    default: Date.now(),
  },
  addedBy: {
    type: String,
    maxLength: 50,
    required: [true, "Author is needed."],
  },
  unitNum: {
    type: String,
    maxLength: 5,
    required: [true, "Unit number is needed."],
  },
  cleanStatus: {
    type: Boolean,
    required: true,
    default: false,
  },
  inHouseStatus: {
    type: Boolean,
    required: true,
    default: false,
  },
  ownerPreferences: [
    {
      addedAt: {
        type: Date,
        required: true,
        default: Date.now(),
      },
      addedBy: {
        type: String,
        maxLength: 50,
        required: [true, "Author is needed."],
      },
      preference: {
        type: String,
        maxLength: 1000,
        required: [true, "Preference is needed."],
      },
    },
  ],
  notes: [
    {
      addedAt: {
        type: Date,
        required: true,
        default: Date.now(),
      },
      addedBy: {
        type: String,
        maxLength: 50,
        required: [true, "Author is needed."],
      },
      note: {
        type: String,
        maxLength: 1000,
        required: [true, "Note is needed."],
      },
      status: {
        type: Boolean,
        required: true,
        default: false,
      },
    },
  ],
});

const User = mongoose.model("User", userSchema);

module.exports = User;
