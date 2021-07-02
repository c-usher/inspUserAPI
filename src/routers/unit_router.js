const express = require("express");
const router = express.Router();

router.all("/", (req, res, next) => {
  next();
});

router.post("/", (req, res) => {
  res.json({ message: "unit post request hit" });
});
module.exports = router;
