const express = require("express");
const { userAuthorization } = require("../middleware/authorization_middleware");
const { addUnit, getUnits } = require("../model/unit/Unit_model");
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
    console.log(unitObj);

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
    const userId = req.userID;
    const result = await getUnits(userId);

    return res.json({
      status: "success",
      result,
    });
  } catch (error) {
    res.json({ status: "error", message: error.message });
  }
});
module.exports = router;
