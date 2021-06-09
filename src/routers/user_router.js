const express = require("express");
const { route } = require("./unit_router");
const router = express.Router()

router.all("/", (req, res, next) => {
    
    // res.json({ message: "this message is from user router" })

    next();

})

router.post('/', (req, res) => {
    res.json(req.body);
})
module.exports = router;