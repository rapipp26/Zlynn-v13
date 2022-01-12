const { CommandInteraction, MessageEmbed, Client, MessageActionRow, MessageSelectMenu, MessageButton } = require('discord.js');
const config = require ('../../Structures/config.json');

module.exports = { 
    name: 'help', 
    cooldown: 10,
    description: 'New help command with menu',
    /**
     * 
     * @param {CommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute(interaction, client) {

		const b1 = new MessageButton()
		.setLabel("Anime")
		.setEmoji("🍙")
		.setCustomId("1")
		.setStyle("SUCCESS")
		const b2 = new MessageButton()
		.setLabel("Fun")
		.setEmoji("😂")
		.setCustomId("2")
		.setStyle("SUCCESS")
		const b3 = new MessageButton()
		.setLabel("Images")
		.setEmoji("📷")
		.setCustomId("3")
		.setStyle("SUCCESS")
		const b4 = new MessageButton()
		.setLabel("Information")
		.setEmoji("📣")
		.setCustomId("4")
		.setStyle("SUCCESS")
		const b5 = new MessageButton()
		.setLabel("System")
		.setEmoji("👔")
		.setCustomId("5")
		.setStyle("SUCCESS")
		const b6 = new MessageButton()
		.setLabel("Moderation")
		.setEmoji("🧥")
		.setCustomId("6")
		.setStyle("SUCCESS")

		const row = new MessageActionRow()
			.addComponents([ b1, b2, b3, b4, b5 ]);

			const row2 = new MessageActionRow()
			.addComponents([ b6 ]);

        interaction.reply({ content: "Please select a button.", components: [row, row2], fetchReply: true })
    }
}