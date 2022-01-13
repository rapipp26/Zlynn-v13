const mongoose = require("mongoose");

const schema = mongoose.Schema({

    userId: {
        type: String,
        required: true
    },

    cash: {
        type: Number,
        default: 0
    },

    bank: {
        type: Number,
        default: 0
    },

    daily: {
        type: Number
    }
});

module.exports = mongoose.model("economy-data", schema)