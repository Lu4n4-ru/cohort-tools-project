const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    name : {
        type: String,
        required: true
    }
});

const User = mongoose.model("User", userSchema)