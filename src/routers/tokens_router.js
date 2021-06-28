const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
  res.json({ message: "here is the new jwt" });

  next();
});

module.exports = router;
