const express = require("express");
const router = express.Router();
const {
  insertUser,
  getUserByEmail,
  getUserById,
  updatePassword,
  storeUserRefreshJWT,
  verifyUser,
} = require("../model/user/User_model");
const { hashPassword, comparePassword } = require("../helpers/bcrypt_helper");
const { createAccessJWT, createRefreshJWT } = require("../helpers/jwt_helper");
const { userAuthorization } = require("../middleware/authorization_middleware");
const {
  setPassResetPin,
  getPinByEmail,
  delPin,
} = require("../model/reset_pin/Reset_Pin_model");
const { emailProcessor } = require("../helpers/email_helper");
const {
  resetPassReqValidation,
  updatePassValidation,
  newUserValidation,
} = require("../middleware/form_validation_middleware");
const { delJWT } = require("../helpers/redis_helper");
const verifyUrl = "http://localhost:3000/verify/";

router.all("/", (req, res, next) => {
  next();
});

//*Get user profile route
router.get("/", userAuthorization, async (req, res) => {
  const _id = req.userId;
  const userProfile = await getUserById(_id);
  const { name, email } = userProfile;
  res.json({
    user: {
      _id,
      name,
      email,
    },
  });
});

//*Verify user email route
router.patch("/verify", async (req, res) => {
  try {
    const { _id, email } = req.body;

    const result = await verifyUser(_id, email);

    if (result && result.id) {
      return res.json({
        status: "success",
        message: "Your account has been verified and activated!",
      });
    }

    return res.json({
      status: "error",
      message: "Request Invalid!",
    });
  } catch (error) {
    console.log(error);
    res.json({
      status: "error",
      message: "Request Invalid!",
    });
  }
});

//*Create new user route
router.post("/create", newUserValidation, async (req, res) => {
  const { name, phone, email, password } = req.body;

  try {
    //*HashPass
    const hashedPass = await hashPassword(password);
    const newUserObj = {
      name,
      phone,
      email,
      password: hashedPass,
    };

    const result = await insertUser(newUserObj);

    //Sends the confirmation email
    await emailProcessor({
      email,
      type: "user-confirmation",
      verifyLink: `${verifyUrl}${result._id}/${result.email}`,
    });

    res.json({ status: "success", message: "new user created!", result });
  } catch (error) {
    console.log(error);
    let message = "Unable to create new user at this time!";
    if (error.message.includes("duplicate key error collection")) {
      message = "This email already has an account";
    }
    res.json({ status: "error", message });
  }
});

//*Login user route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.json({ status: "error", message: "Invalid Form Submission" });
  }

  const user = await getUserByEmail(email);

  if (!user.isVerified) {
    return res.json({
      status: "error",
      message: "Your account is not verified!",
    });
  }

  const passFromDb = user && user._id ? user.password : null;

  if (!passFromDb)
    return res.json({ status: "error", message: "Invalid Email or Password!" });

  const result = await comparePassword(password, passFromDb);
  if (!result) {
    return res.json({ status: "error", message: "Invalid Email or Password!" });
  }

  const accessJWT = await createAccessJWT(user.email, `${user._id}`);
  const refreshJWT = await createRefreshJWT(user.email, `${user._id}`);

  res.json({
    status: "success",
    message: "Login Success!",
    accessJWT,
    refreshJWT,
  });
});

//*Reset password route
router.post("/reset-password", resetPassReqValidation, async (req, res) => {
  const { email } = req.body;

  const user = await getUserByEmail(email);

  if (user && user._id) {
    const setPin = await setPassResetPin(email);
    await emailProcessor({
      email,
      pin: setPin.pin,
      type: "request-new-password",
    });
    return res.json({
      status: "Success",
      message: "A reset pin is on its way!",
    });
  }

  res.json({
    status: "error",
    message: "Unable to send reset pin at this time.",
  });
});

//*Password update route
router.patch("/reset-password", updatePassValidation, async (req, res) => {
  const { email, pin, newPassword } = req.body;
  const getPin = await getPinByEmail(email, pin);
  if (getPin._id) {
    const dbPinDate = getPin.addedAt;
    const expTime = 1;

    let expDate = dbPinDate.setDate(dbPinDate.getDate() + expTime);

    const today = new Date();

    if (today > expDate) {
      return res.json({ status: "error", message: "Invalid or expired pin." });
    }

    const hashedPass = await hashPassword(newPassword);
    const user = await updatePassword(email, hashedPass);

    if (user._id) {
      await emailProcessor({ email, type: "update-password-success" });
      delPin(email, pin);
      return res.json({
        status: "success",
        message: "Your password has been updated!",
      });
    }
  }
  res.json({ status: "error", message: "Unable to update your password!" });
});

//*Logout route
router.delete("/logout", userAuthorization, async (req, res) => {
  const { authorization } = req.headers;
  const _id = req.userId;
  delJWT(authorization);
  const result = await storeUserRefreshJWT(_id, "");

  if (result._id) {
    return res.json({
      success: "success",
      message: "Logged out successfully!",
    });
  }
  res.json({
    success: "error",
    message: "Unable to log you out...",
  });
});

module.exports = router;
