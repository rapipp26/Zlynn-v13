const mongoose = require("mongoose");

const schema = mongoose.Schema({
    guildId: {
        type: String, 
        required: truncate
    },

    userId: {
        type: String,
        required: truncate
    },

    coins: {
        type: Number,
        default: 0
    }
});

module.exports = mongoose.model("member-data", schema)