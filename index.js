const { Client, Collection } = require("discord.js");
const client = new Client({ intents: 32767 });
const { token } = require("./config.json");

const { promisify } = require("util");
const { glob } = require("glob");
const PG = promisify(glob);
const Ascii = require("ascii-table");

client.commands = new Collection()

require("./mongo.js")(client);
require("./Systems/GiveawaySys")(client);

["Events", "Commands"].forEach(handler => {
    require(`./Handlers/${handler}`)(client, PG, Ascii);
});
client.login(token)