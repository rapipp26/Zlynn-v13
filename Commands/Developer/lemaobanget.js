const { Client, MessageEmbed, CommandInteraction } = require("discord.js");
const cool = ["768378164942471188", "495488613811879946"];
const config = require("../../Structures/config.json");
const axios = require("axios")
module.exports = { 
    name: 'minecraft', 
    description: 'hhhh',
    /**
     * 
     * @param {CommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute(interaction, client) {
        const response = await axios.get("https://some-random-api.ml/mc?username=martijn102")

        console.log(`${response.data}`)
    }
}