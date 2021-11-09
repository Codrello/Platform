const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Tests = new Schema({
    subject: {
        type: String
    },
    test: {
        type: String
    },
    answer: {
        type: Array
    }
})


module.exports = mongoose.model("Tests", Tests)