const mongoose = require("mongoose");
const { mongoPath } = require("./config.json");

module.exports = async () => {
  await mongoose.connect(mongoPath, {
    useNewUrlParser : true,
    useUnifiedTopoLogy: true,
    //useFindAndModify: false
  })

  return mongoose 
}

mongoose.connection.on("connected", () => {
  console.log("Client is connected to database.")
})