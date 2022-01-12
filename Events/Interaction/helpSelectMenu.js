const config = require("../../Structures/config.json")
const { Client, CommandInteraction, MessageEmbed, MessageActionRow, MessageSelectMenu, Collection } = require("discord.js");

module.exports = {
    name: "interactionCreate",
    /**
     * 
     * @param {CommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute(interaction, client) {
        if(!interaction.isSelectMenu()) return;
        if(!["select"].includes(interaction.customId)) return;

        const { message, user } = interaction;
        const userId = user.id;
        const authorId = message.interaction.user.id;

        await interaction.deferReply();

            if (userId === authorId) {
              switch(interaction.values[0]) {
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
                    return interaction.editReply({ embeds: [embed] });
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
                return interaction.editReply({ embeds: [embed2] });
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
            return interaction.editReply({ embeds: [embed3] })
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
            return interaction.editReply({ embeds: [embed4] })
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
                return interaction.editReply({ embeds: [embed5] })
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
                    return interaction.editReply({ embeds: [embed6] })
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