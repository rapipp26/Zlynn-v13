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

            const m = await interaction.reply({ content: "Please select a button.", components: [row, row2], fetchReply: true })
		   
			const collector = m.createMessageComponentCollector({ componentType: 'BUTTON', time: 15000 });

			collector.on('collect', async i => {
				switch(i.customId) {
					case "1" :
						const embed = new MessageEmbed()
						.setAuthor("Anime commands! ヾ(≧▽≦*)o", client.user.avatarURL({ format: "png" }))
						.setColor("BLURPLE")
						.setDescription("`[]` : Optional\n`()` : Required\n`{}` : Choices")
						.addFields(
							{
								name: "/anime baka",
								value: "```cs\n# No Usage\n```"
							},
							{
								name: "/anime bite",
								value: "```cs\n# No Usage\n```"
							},
							{
								name: "/anime blush",
								value: "```cs\n# No Usage\n```"
							},
							{
								name: "/anime cuddle",
								value: "```cs\n# No Usage\n```"
							},
							{
								name: "/anime dance",
								value: "```cs\n# No Usage\n```"
							},
							{
								name: "/anime quote",
								value: "```cs\n# No Usage\n```"
							},
							{
								name: "/anime slap",
								value: "```cs\n# No Usage\n```"
							},
							{
								name: "/anime bonk",
								value: "```cs\n# No Usage\n```"
							},
							{
								name: "/anime waifu",
								value: "```cs\n# No Usage\n```"
							},
							{
								name: "/anime wallpaper",
								value: "```cs\n# No Usage\n```"
							},
							{
								name: "/anime hug",
								value: "```cs\n# No Usage\n```"
							},
							{
								name: "/anime sad",
								value: "```cs\n# No Usage\n```"
							},
						)
						await interaction.update({ embeds: [embed] });
						return b1.setDisabled(true)
						case "2" : 
						const embed2 = new MessageEmbed()
						.setAuthor("Fun commands! (*^▽^*)", client.user.avatarURL({ format: "png" }))
						.setColor("BLURPLE")
						.setDescription("`[]` : Optional\n`()` : Required\n`{}` : Choices")
						.addFields(
							{
								name: "/emojify",
								value: "```/emojify (text)```"
							},
							{
								name: "/pokemon",
								value: "```/pokemon (name)```"
							},
							{
								name: "/wouldyourather",
								value: "```cs\n# No Usage\n```"
							},
						)
						await interaction.update({ embeds: [embed2] });
						return b2.setDisabled(true)
						case "3" :
							const embed3 = new MessageEmbed()
							.setAuthor("Images commands! (✿◡‿◡)", client.user.avatarURL({ format: "png" }))
							.setColor("BLURPLE")
							.setDescription("`[]` : Optional\n`()` : Required\n`{}` : Choices")
							.addFields(
								{
									name: "No Image Commands atm.",
									value: "```cs\n# Image commands is currently under maintenance.```"
								},
							)
							.setImage("https://cdn.discordapp.com/attachments/848032759939203072/911567264011132938/Zlynn_Banner.png")
							.setFooter(`Executed by ${interaction.user.tag}`, interaction.user.displayAvatarURL({ dynamic: true }))
							.setTimestamp();
							await interaction.update({ embeds: [embed3] });
							return b3.setDisabled(true)
						case "4" :
							const embed4 = new MessageEmbed()
							.setAuthor("Information commands! (❁´◡`❁))", client.user.avatarURL({ format: "png" }))
							.setColor("BLURPLE")
							.setDescription("`[]` : Optional\n`()` : Required\n`{}` : Choices")
							.addFields(
								{
									name: "/botinfo",
									value: "```cs\n# No Usage\n```"
								},
								{
									name: "/github",
									value: "```/github (name)```"
								},
								{
									name: "/covid all",
									value: "```cs\n# No Usage\n```"
								},
								{
									name: "/covid country",
									value: "```/covid country (country name)```"
								},
								{
									name: "/help",
									value: "```cs\n# No Usage\n```"
								},
								{
									name: "/hexcolor",
									value: "```/hexcolor (color code)```"
								},
								{
									name: "/lyric",
									value: "```/lyric (song title)```"
								},
								{
									name: "/status",
									value: "```cs\n# No Usage\n```"
								},
								{
									name: "/reddit",
									value: "```/reddit (subreddit)```"
								},
								{
									name: "/steam",
									value: "```/steam (app/game name)```"
								},
								{
									name: "/translate",
									value: "```/translate (text) (language)```"
								},
								{
									name: "/zoo",
									value: "```/zoo {animal}```"
								},
							)
							.setImage("https://cdn.discordapp.com/attachments/848032759939203072/911567264011132938/Zlynn_Banner.png")
							.setFooter(`Executed by ${interaction.user.tag}`, interaction.user.displayAvatarURL({ dynamic: true }))
							.setTimestamp();
							await interaction.update({ embeds: [embed4] });
							return b4.setDisabled(true)
							case "5" :
								const embed5 = new MessageEmbed()
								.setAuthor("System commands! ○( ＾皿＾)っ ", client.user.avatarURL({ format: "png" }))
								.setColor("BLURPLE")
								.setDescription("`[]` : Optional\n`()` : Required\n`{}` : Choices")
								.addFields(
									{
										name: "/giveaway start",
										value: "```/giveaway (duration) (winners) (prize) [channel]```"
									},
									{
										name: "/music play",
										value: "```/music play (query)```"
									},
									{
										name: "/music volume",
										value: "```/music volume (percent)```"
									},
									{
										name: "/music settings",
										value: "```/music settings {options}```"
									},
									{
										name: "/music filters",
										value: "```/music filters {filters}```"
									},
									{
										name: "/blacklist_word",
										value: "```/blacklist_word {action} (word)```"
									}
								)
								.setImage("https://cdn.discordapp.com/attachments/848032759939203072/911567264011132938/Zlynn_Banner.png")
								.setFooter(`Executed by ${interaction.user.tag}`, interaction.user.displayAvatarURL({ dynamic: true }))
								.setTimestamp();
								await interaction.update({ embeds: [embed5] });
								return b5.setDisabled(true)
								case "6" :
									const embed6 = new MessageEmbed()
									.setAuthor("Moderation commands! φ(゜▽゜*)♪", client.user.avatarURL({ format: "png" }))
									.setColor("BLURPLE")
									.setDescription("`[]` : Optional\n`()` : Required\n`{}` : Choices")
									.addFields(
										{
											name: "/purge",
											value: "```/purge (amount) [target]```",
										},
									)
									.setImage("https://cdn.discordapp.com/attachments/848032759939203072/911567264011132938/Zlynn_Banner.png")
									.setFooter(`Executed by ${interaction.user.tag}`, interaction.user.displayAvatarURL({ dynamic: true }))
									.setTimestamp();
									await interaction.update({ embeds: [embed6] });
									return b6.setDisabled(true)
				}
				collector.on('end', collected => {
					return;
				});
			});
    }
}