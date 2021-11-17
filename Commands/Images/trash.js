const { CommandInteraction, MessageEmbed, Client } = require('discord.js');
const { true1, false1, arrow, reply1, reply2, thumbsup, thumbsdown, piano, human, setting } = require ('../../config.json');

module.exports = { 
    name: 'delete', 
    description: 'Delete your friends and throw them to trash',
    options: [
        {
            name: "target",
            description: "Target to delete",
            type: "USER",
            required: true
        }
    ],
    /**
     * 
     * @param {CommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute(interaction, client) {
        const target = interaction.options.getMember("target");

        interaction.reply({ content: `https://api.leoapi.xyz/image/delete?image=${target.avatarURL({ format: "PNG" })}`})

    }
}