const express = require("express");
const { route } = require("./unit_router");
const router = express.Router();
const { insertUser } = require("../model/User_model");
const { hashPassword } = require("../helpers/bcrypt_helper");

router.all("/", (req, res, next) => {
  // res.json({ message: "this message is from user router" })

  next();
});

router.post("/", async (req, res) => {
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
module.exports = router;
