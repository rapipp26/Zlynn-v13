const { CommandInteraction, MessageEmbed, Client } = require('discord.js');
const { true1, false1, arrow, reply1, reply2, thumbsup, thumbsdown } = require ('../../config.json');
const music = require("@koenie06/discord.js-music")

module.exports = { 
    name: 'queue', 
    description: 'Get queue of ongoing songs',
    /**
     * 
     * @param {CommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute(interaction, client) {
        console.log(await(music.getQueue({ interaction: interaction })));
    }
}