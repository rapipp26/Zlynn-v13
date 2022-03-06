const { model, Schema } = require("mongoose");

module.exports = model("warnings", new Schema ({
    GuildID: String,
    TargetID: String,
    ExecuterID: String,
    Date: String,
    WarnID: String,
}))