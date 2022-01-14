const { CommandInteraction, MessageEmbed, Client, MessageActionRow, MessageSelectMenu, MessageButton } = require('discord.js');
const config = require ('../../Structures/config.json');

module.exports = { 
    name: 'help', 
    cooldown: 10,
    description: 'Command list',
    /**
     * 
     * @param {CommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute(interaction, client) {
		const row = new MessageActionRow()
		.addComponents(
			new MessageButton()
			.setLabel("Command List")
			.setEmoji(`${client.config.setting}`)
			.setStyle("LINK")
			.setURL("https://rapipp.gitbook.io/zlynn/command-list"),
			new MessageButton()
			.setLabel("Support Server")
			.setStyle("LINK")
			.setURL("https://discord.gg/AUWhsArSWb")
			.setEmoji(`${client.config.server}`)
		)
		interaction.reply({ content: "Please click this button below to get the command list.", components: [row] })
    }
}