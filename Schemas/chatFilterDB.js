const { model, Schema } = require("mongoose");

module.exports = model("ChatFilter", new Schema({
    Guild: String,
    Log: String,
    Words: [String]
}))