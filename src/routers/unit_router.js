const express = require("express");
const { userAuthorization } = require("../middleware/authorization_middleware");
const {
  addUnit,
  getUnits,
  getUnitById,
  updatePrefs,
  addNote,
  updateStatusNote,
  delNote,
} = require("../model/unit/Unit_model");
const router = express.Router();

router.all("/", (req, res, next) => {
  next();
});

//* Create Unit
router.post("/", userAuthorization, async (req, res) => {
  try {
    const {
      unitAddedBy,
      unitNum,
      cleanStatus,
      inHouseStatus,
      managedStatus,
      note,
      noteAddedBy,
      noteStatus,
      prefAddedBy,
      pref,
    } = req.body;
    const userId = req.userId;

    const unitObj = {
      clientId: userId,
      unitAddedBy,
      unitNum,
      cleanStatus,
      inHouseStatus,
      managedStatus,
      ownerPrefs: [
        {
          prefAddedBy,
          pref,
        },
      ],
      notes: [
        {
          noteAddedBy,
          note,
          noteStatus,
        },
      ],
    };

    const result = await addUnit(unitObj);
    if (result._id) {
      return res.json({
        status: "success",
        message: "Unit has been added.",
      });
    }
    res.json({ status: "error", message: "Unable to add unit." });
  } catch (error) {
    res.json({ status: "error", message: error.message });
  }
});

// *Get units
router.get("/", userAuthorization, async (req, res) => {
  try {
    const clientId = req.userId;
    const result = await getUnits(clientId);

    return res.json({
      status: "success",
      result,
    });
  } catch (error) {
    res.json({ status: "error", message: error.message });
  }
});

// *Get unit
router.get("/unit/:_id", userAuthorization, async (req, res) => {
  try {
    const { _id } = req.params;
    const clientId = req.userId;
    const result = await getUnitById(_id, clientId);
    return res.json({
      status: "success",
      result,
    });
  } catch (error) {
    res.json({ status: "error", message: error.message });
  }
});

// *Preferences here
// *Update Preferences
router.put("/unit/prefs/:_id", userAuthorization, async (req, res) => {
  try {
    const { pref, prefAddedBy } = req.body;

    const { _id } = req.params;
    const result = await updatePrefs({ _id, pref, prefAddedBy });
    if (result._id) {
      return res.json({
        status: "success",
        message: "Owner preferences has been updated!",
      });
    }
    res.json({
      status: "success",
      message: "Unable to update owner preferences...",
    });
  } catch (error) {
    res.json({ status: "error", message: error.message });
  }
});

// *Notes Here
// *Update Notes
router.put("/unit/note/:_id", userAuthorization, async (req, res) => {
  try {
    const { note, noteAddedBy } = req.body;
    const { _id } = req.params;

    const result = await addNote({ _id, note, noteAddedBy });
    if (result._id) {
      return res.json({
        status: "success",
        message: "Unit notes has been updated!",
      });
    }
    res.json({
      status: "error",
      message: "Unable to update unit notes...",
    });
  } catch (error) {
    res.json({ status: "error", message: error.message });
  }
});

// *Changes note status to true.
router.patch("/unit/note-status/:_id", userAuthorization, async (req, res) => {
  try {
    const { _id } = req.params;

    const result = await updateStatusNote({ _id });
    if (result._id) {
      return res.json({
        status: "success",
        message: "Unit notes has been updated!",
      });
    }
    res.json({
      status: "error",
      message: "Unable to update unit notes...",
    });
  } catch (error) {
    res.json({ status: "error", message: error.message });
  }
});

// *Deletes the note.
router.patch("/unit/note/:_id", userAuthorization, async (req, res) => {
  try {
    const { _id } = req.params;

    const result = await delNote({ _id });
    if (result) {
      return res.json({
        status: "success",
        message: "Unit note has been deleted.",
      });
    }
    return res.json({
      status: "error",
      message: "Unit note was not deleted.",
    });
  } catch (error) {
    res.json({ status: "error", message: error.message });
  }
});
module.exports = router;
