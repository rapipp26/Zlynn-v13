module.exports = {
    name: "interactionCreate",
    /**
     * 
     * @param {CommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute(interaction, client) {
        if(!interaction.isButton()) return;
        if(!["1", "2", "3", "4", "5", "6" ].includes(interaction.customdId)) return;

        switch(interaction.customId) {
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
                    .setFooter(`Executed by ${interaction.user.tag}`, interaction.user.displayAvatarURL({ dynamic: true }))
                    .setTimestamp();
                    return interaction.editReply({ embeds: [embed3] });
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
                    .setFooter(`Executed by ${interaction.user.tag}`, interaction.user.displayAvatarURL({ dynamic: true }))
                    .setTimestamp();
                    return interaction.editReply({ embeds: [embed4] });
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
                        .setFooter(`Executed by ${interaction.user.tag}`, interaction.user.displayAvatarURL({ dynamic: true }))
                        .setTimestamp();
                        return interaction.editReply({ embeds: [embed5] });
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
                            .setFooter(`Executed by ${interaction.user.tag}`, interaction.user.displayAvatarURL({ dynamic: true }))
                            .setTimestamp();
                            return interaction.editReply({ embeds: [embed6] })
        }
        setTimeout(() => {
            interaction.editReply({ content: `*This message is now inactive ${client.config.false1}*`, components: [ ] })
        }, 30000)
    }
}