const { CommandInteraction, MessageEmbed, Client, MessageActionRow, MessageSelectMenu } = require('discord.js');
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
    async execute(interaction) {
		const menu = new MessageSelectMenu()
		.setCustomId('select')
		.setPlaceholder('Nothing selected')
		.addOptions([
			{
				label: 'Anime',
				emoji: "🍙",
				description: 'Gives action to your friends or get some motivation from anime characters!',
				value: '1',
			},
			{
				label: 'Fun',
				emoji: "😂",
				description: "Do some fun with your friend using this module.",
				value: '2',
			},
			{
				label: 'Images',
				emoji: "📷",
				description: 'Make fun of your friend\'s or your avatar.',
				value: '3',
			},
			{
				label: 'Information',
				emoji: "📣",
				description: 'Get some information about something using this module.',
				value: '4',
			},
			{
				label: 'System',
				emoji: "👔",
				description: 'Moderate server and listening to music using this module.',
				value: '5',
			},
			{
				label: 'Moderation',
				emoji: "🧥",
				description: 'Use this module to punish someone',
				value: '6',
			},
		]);

		const row = new MessageActionRow()
			.addComponents([ menu ]);

            interaction.reply({ content: "Please select a module.", components:[row] })
    }
}