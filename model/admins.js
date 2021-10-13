const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Admins = new Schema({
    username: {
        type: String,
        required: true
    },
    Email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    AdminImg: {
        type: String,
        required: true
    },
    Date:{
        type: String
    },
    type:{
        type: String
    },
});

module.exports = mongoose.model("admins", Admins);
