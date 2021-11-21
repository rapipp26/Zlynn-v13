const { CommandInteraction, MessageEmbed, Client } = require('discord.js');
const config = require ('../../Structures/config.json');

module.exports = { 
    name: 'test', 
    description: 'Test command for developer',
    permissions: "ADMINISTRATOR",
    /**
     * 
     * @param {CommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute(interaction, client) {
        interaction.reply({ content: `${config.piano}`})
    }
}