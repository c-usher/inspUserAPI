const express = require("express");
const router = express.Router();
const { verifyRefreshJWT, createAccessJWT } = require("../helpers/jwt_helper");
const { getUserByEmail } = require("../model/user/User_model");

router.get("/", async (req, res, next) => {
  const { authorization } = req.headers;

  const decoded = await verifyRefreshJWT(authorization);
  if (decoded.email) {
    const userProf = await getUserByEmail(decoded.email);

    if (userProf._id) {
      let tokenExp = userProf.refreshJWT.addedAt;
      const dbRefreshToken = userProf.refreshJWT.token;

      tokenExp = tokenExp.setDate(
        tokenExp.getDate() + +process.env.JWT_REFRESH_EXP
      );
      const today = new Date();

      if (dbRefreshToken !== authorization && tokenExp < today) {
        return res.status(403).json({ message: "forbidden" });
      }
      const accessJWT = await createAccessJWT(
        decoded.email,
        userProf._id.toString()
      );

      return res.json({ status: "success", accessJWT });
    }
  }
  res.status(403).json({ message: "Forbidden" });
});

module.exports = router;
