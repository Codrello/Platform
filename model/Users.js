const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const User = new Schema({
    name:{
        type: String,
        required: true
    },
    Surname:{
        type: String,
        required: true
    },
    FatherName:{
        type: String,
        required: true
    },
    DateBirth:{
        type: String,
        required: true
    },
    username:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    JSHSHIR:{
        type: Number,
        required: true
    },
    Region:{
        type: String,
        required: true
    },
    District:{
        type: String,
        required: true
    },
    Jinsi:{
        type: String,
        required: true
    },
    Email:{
        type: String,
        required: true
    },
    Workph:{
        type: String,
        required: true
    },
    Homeph:{
        type: String,
        required: true
    },
    Muassasasi:{
        type: String,
        required: true
    },
    Muassasasi2:{
        type: String,
        required: true
    },
    Division:{
        type: String,
        required: true
    },
    Position:{
        type: String,
        required: true
    },
    Courses:{
        type: Array,
        required: true
    },
    // UserImg: {
    //     type: String,
    //     required: true
    // },
    Date:{
        type: String
    },
    type:{
        type: String
    },

});

module.exports = mongoose.model("Users", User);