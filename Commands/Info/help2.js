const { CommandInteraction, MessageEmbed, Client, MessageActionRow, MessageSelectMenu } = require('discord.js');
const config = require ('../../Structures/config.json');

module.exports = { 
    name: 'help2', 
    description: 'New help command with menu',
    /**
     * 
     * @param {CommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute(interaction, client) {
		const row = new MessageActionRow()
			.addComponents(
				new MessageSelectMenu()
					.setCustomId('select')
					.setPlaceholder('Nothing selected')
					.addOptions([
						{
							label: 'Select me',
							description: 'This is a description',
							value: 'first_option',
						},
						{
							label: 'You can select me too',
							description: 'This is also a description',
							value: 'second_option',
						},
					]),
			);

            interaction.reply({ fetchReply: true, content: 'Test', components:[row] })
    }
}