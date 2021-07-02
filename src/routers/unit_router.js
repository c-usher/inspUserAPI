const express = require("express");
const { addUnit } = require("../model/unit/Unit_model");
const router = express.Router();

router.all("/", (req, res, next) => {
  next();
});

router.post("/", async (req, res) => {
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

    const unitObj = {
      clientId: "60d6834609332b2f9d998806",
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
module.exports = router;
