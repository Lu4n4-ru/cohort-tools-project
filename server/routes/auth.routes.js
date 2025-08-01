const express = require("express")
const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")

const User = require("../models/User.model.js")

const router = express.Router()

const saltRounds = 10;

//signup POST request

router.post("/signup", (req, res, next) => {
    const {email, password, name} = req.body

    if(!email || !password || !name) {
        res.status(400).json({message: "Please provide email, password and name"})
        return
    }

    //REGEx to check password validity
    const passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;

    if(!passwordRegex.test(password)) {
        res.status(400).json({message: "Invalid password"})
    }

})

module.exports = router;