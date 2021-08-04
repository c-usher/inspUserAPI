const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UnitSchema = new mongoose.Schema({
  clientId: {
    type: Schema.Types.ObjectId,
  },
  unitAddedAt: {
    type: Date,
    required: true,
    default: Date.now(),
  },
  unitAddedBy: {
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
  managedStatus: {
    type: Boolean,
    required: true,
    default: false,
  },
  rentalStatus: {
    type: Boolean,
    required: true,
    default: false,
  },
  inspectedStatus: {
    type: Boolean,
    required: true,
    default: false,
  },
  ownerPrefs: [
    {
      prefAddedAt: {
        type: Date,
        required: true,
        default: Date.now(),
      },
      prefAddedBy: {
        type: String,
        maxLength: 50,
        required: [true, "Author is needed."],
      },
      pref: {
        type: String,
        maxLength: 1000,
        required: [true, "Preference is needed."],
        default: "",
      },
    },
  ],
  notes: [
    {
      noteAddedAt: {
        type: Date,
        required: true,
        default: Date.now(),
      },
      noteAddedBy: {
        type: String,
        maxLength: 50,
        required: [true, "Author is needed."],
      },
      note: {
        type: String,
        maxLength: 1000,
        required: [true, "Note is needed."],
        default: "",
      },
      noteStatus: {
        type: Boolean,
        required: true,
        default: false,
      },
    },
  ],
});

module.exports = { UnitSchema: mongoose.model("Unit", UnitSchema) };
