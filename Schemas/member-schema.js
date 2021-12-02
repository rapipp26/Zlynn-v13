const mongoose = require("mongoose");

const schema = mongoose.Schema({

    userId: {
        type: String,
        required: true
    },

    coins: {
        type: Number,
        default: 0
    }
});

module.exports = mongoose.model("member-data", schema)