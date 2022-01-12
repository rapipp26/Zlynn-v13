const { Client, Collection } = require("discord.js");
const client = new Client({ intents: 32767 });
const config = require("./Structures/config.json");

const { promisify } = require("util");
const { glob } = require("glob");
const PG = promisify(glob);
const Ascii = require("ascii-table");

const Errorhandler = require('discord-error-handler')

client.commands = new Collection();
client.config = require("./Structures/config.json");

const { DisTube } = require("distube");
const { SpotifyPlugin } = require("@distube/spotify");

client.distube = new DisTube(client, {
    emitNewSongOnly: true,
    leaveOnFinish: true,
    emitAddSongWhenCreatingQueue: false,
    plugins: [new SpotifyPlugin()]
});
module.exports = client;

require("./Structures/mongo.js")(client);
require("./Systems/GiveawaySys")(client);

["Events", "Commands"].forEach(handler => {
    require(`./Structures/Handlers/${handler}`)(client, PG, Ascii);
});

const handle = new Errorhandler(client, {
    webhook: { id: '909751263481192478', token: 'tIpehWFJUoSmQcg5r5TAn3whks7NFwIS8fhdz-qN0omoDPBSCLsm5o41d_8gJB6RzdtA' }
    })
    process.on('unhandledRejection', error => {
      handle.createrr(client, undefined, undefined, error)
    })

client.login(config.token)