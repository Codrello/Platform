const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Contracts = new Schema({
    Userid: {
        type: String
    },
    Cardholder:{
        type: String,
        required: true
    },
    ContractImg: {
        type: String,
        required: true
    },
    Date:{
        type: String
    },
});

module.exports = mongoose.model("contract", Contracts);