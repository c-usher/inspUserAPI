const express = require("express");
const { route } = require("./unit_router");
const router = express.Router();
const { insertUser, getUserByEmail, getUserById } = require("../model/User_model");
const { hashPassword, comparePassword } = require("../helpers/bcrypt_helper");
const { createAccessJWT, createRefreshJWT } = require("../helpers/jwt_helper");
const { userAuthorization } = require("../middleware/authorization_middleware");

router.all("/", (req, res, next) => {
  // res.json({ message: "this message is from user router" })

  next();
});

//Get user profile route
router.get('/', userAuthorization, async (req, res) => {
  const _id = req.userId;
  const userProfile = await getUserById(_id)
  res.json({user: userProfile});
})

//Create new user route
router.post("/create", async (req, res) => {
  const { name, phone, email, password } = req.body;

  try {
    //HashPass
    const hashedPass = await hashPassword(password);
    const newUserObj = {
      name,
      phone,
      email,
      password: hashedPass,
    };

    const result = await insertUser(newUserObj);
    console.log(result);
    res.json({ message: "new user created!", result });
  } catch (error) {
    console.log(error);
    res.json({ status: "error", message: error.message });
  }
});

//Login user route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.json({ status: "error", message: "Invalid Form Submission" });
  }

  const user = await getUserByEmail(email);

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




module.exports = router;
