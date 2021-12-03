const { Client, CommandInteraction, MessageEmbed, MessageActionRow, MessageSelectMenu } = require("discord.js");
const { true1, false1, arrow, reply1, reply2 } = require ("../../Structures/config.json")
const config = require('../../Structures/config.json');

module.exports = {
    name: "interactionCreate",
    /**
     * 
     * @param {CommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute(interaction, client) {
        if(interaction.isCommand()) {
            const command = client.commands.get(interaction.commandName);
            if(!command) return interaction.reply({ embeds: [
                new MessageEmbed()
                .setColor("NAVY")
                .setDescription(`${false1} **|** *An error occured while running this command ╰（‵□′）╯*`)
            ]}) && client.commands.delete(interaction.commandName);

            command.execute(interaction, client)
        }

        if (interaction.isSelectMenu()) {
            const { message, user } = interaction;
            const userId = user.id;
            const authorId = message.interaction.user.id;
                if (userId === authorId) {
            if (interaction.customId === 'select') {
                if(interaction.values[0] === '1') {
                    const embed1 = new MessageEmbed()
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
                    .setImage("https://cdn.discordapp.com/attachments/848032759939203072/911567264011132938/Zlynn_Banner.png")
                    .setFooter(`Executed by ${interaction.user.tag}`, interaction.user.displayAvatarURL({ dynamic: true }))
                    .setTimestamp();
                    interaction.update({ embeds: [embed1] })
                }
                if(interaction.values[0] === '2') {
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
                    .setImage("https://cdn.discordapp.com/attachments/848032759939203072/911567264011132938/Zlynn_Banner.png")
                    .setFooter(`Executed by ${interaction.user.tag}`, interaction.user.displayAvatarURL({ dynamic: true }))
                    .setTimestamp();
                    interaction.update({ embeds: [embed2] })
                }
                if(interaction.values[0] === '3') {
                    const embed3 = new MessageEmbed()
                    .setAuthor("Images commands! (✿◡‿◡)", client.user.avatarURL({ format: "png" }))
                    .setColor("BLURPLE")
                    .setDescription("`[]` : Optional\n`()` : Required\n`{}` : Choices")
                    .addFields(
                        {
                            name: "/blur",
                            value: "```/blur (user)```"
                        },
                        {
                            name: "/gay",
                            value: "```/gay (user)```"
                        },
                        {
                            name: "/simpcard",
                            value: "```/simpcard (user)```"
                        },
                        {
                            name: "/stupid",
                            value: "```/stupid (user)```"
                        },
                        {
                            name: "/youtube",
                            value: "```/youtube (text)```"
                        }
                    )
                    .setImage("https://cdn.discordapp.com/attachments/848032759939203072/911567264011132938/Zlynn_Banner.png")
                    .setFooter(`Executed by ${interaction.user.tag}`, interaction.user.displayAvatarURL({ dynamic: true }))
                    .setTimestamp();
                    interaction.update({ embeds: [embed3] })
                }
                if(interaction.values[0] === '4') {
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
                            value: "```/stupid (color code)```"
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
                    interaction.update({ embeds: [embed4] })
                }
                if(interaction.values[0] === '5') {
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
                            value: "```/music volume {options}```"
                        },
                        {
                            name: "/blacklist_word",
                            value: "```/blacklist_word {action} (word)```"
                        }
                    )
                    .setImage("https://cdn.discordapp.com/attachments/848032759939203072/911567264011132938/Zlynn_Banner.png")
                    .setFooter(`Executed by ${interaction.user.tag}`, interaction.user.displayAvatarURL({ dynamic: true }))
                    .setTimestamp();
                    interaction.update({ embeds: [embed5] })
                }
                if(interaction.values[0] === "6") {
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
                    interaction.update({ embeds: [embed6] })
                }
            }
        } else return;
            const menu = new MessageSelectMenu()
            .setCustomId('kontol')
            .setPlaceholder('Select Module')
            .setDisabled(true)
            .addOptions([
                {
                    label: 'Select me',
                    description: 'This is a description',
                    value: '1',
                },
            ]);
    
            const row = new MessageActionRow()
                .addComponents([ menu ]);

            setTimeout(() => {
				interaction.editReply({ content: `${config.false1} **|** *This message is now inactive.*`, components: [row] })
			}, 30000)
        }
    }
}