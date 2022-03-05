const { model, Schema } = require("mongoose");

module.exports = model("warnings", new Schema ({
    GuildID: String,
    ExecuterID: String,
    ExecuterTag: String,
    UserID: String,
    UserTag: String,
    WarnID: String
}))