const express = require("express");
const { route } = require("./unit_router");
const router = express.Router()
const {insertUser} = require('../model/User_model')

router.all("/", (req, res, next) => {
    
    // res.json({ message: "this message is from user router" })

    next();

})

router.post('/', async (req, res) => {
    try {
            const result = await insertUser(req.body);
            console.log(result);
            res.json({ message: "new user created!", result });

    } catch (error) {
        console.log(error);
        res.json({ status: 'error', message: error.message});
    }
})
module.exports = router;