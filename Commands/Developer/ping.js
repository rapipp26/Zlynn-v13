const { CommandInteraction, MessageEmbed } = require("discord.js");

module.exports = {
    name: "ping",
    description: "Ping",
    permission: "ADMINISTRATOR",
    /**
     * 
     * @param {CommandInteraction} interaction 
     */
    async execute(interaction) {
        interaction.reply({ content: "Pong!" })
    }
}