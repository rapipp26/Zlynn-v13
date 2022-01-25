const { MessageEmbed } = require(`discord.js`);
const schema = require("../../Schemas/chatFilterDB");

module.exports = {
    name: "bannedword",
    cooldown: 10,
    description: "Ban some word(s) from your server",
    permission: "MANAGE_MESSAGES",
    options : [
        {
            name: "clear",
            description: "Clear all banned word(s) from the data",
            type: "SUB_COMMAND"
        },
        {
            name: "list",
            description: "List your banned word(s) data.",
            type: "SUB_COMMAND"
        },
        {
            name: "log",
            description: "Setup your banned word(s) log channel",
            type: "SUB_COMMAND",
            options: [
                {
                    name: "channel",
                    description: "Provide the log channel",
                    type: "CHANNEL",
                    channelTypes: ["GUILD_TEXT"],
                    required: true
                }
            ]
        },
        {
            name: "action",
            description: "Add/remove word(s) from the data",
            type: "SUB_COMMAND",
            options: [
                {
                    name: "options",
                    description: "Select an option",
                    type: "STRING",
                    required: true,
                    choices: [
                        { name: "Add", value: "add" },
                        { name: "Remove", value: "remove" }
                    ]
                }
            ]
        },
        {
            name: "word",
            description: "Provide the word to add/remove, add multiple words by placing comma. example: (word1, word2, word3)",
            type: "STRING",
            required: true
        }
    ],
    /**
     * 
     * @param {CommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute(interaction, client) {
        await interaction.deferReply();
        
        const { guild, options } = interaction;

        const sub = options.getSubcommand();

        switch(sub) {
            case "list" :
                const Data = await schema.findOne({ Guild: guild.id })
                if(!Data) return interaction.editReply({ content: `${client.config.false1} There is no banned word(s) in this server.`, ephemeral: true })
                const embed = new MessageEmbed()
                .setAuthor({ name: "Banned word(s) list!", iconURL: client.user.avatarURL({ format: "PNG" })})
                .setDescription(`${Data.map((a,b) => b+1 - a).join("\n")}`)
                .setFooter(`Executed by ${interaction.user.tag}`, interaction.user.displayAvatarURL({ dynamic: true }))
                .setTimestamp();
                interaction.editReply({ embeds: [embed] })
                break;
            case "clear" :
                await schema.findOneAndUpdate({ Guild: guild.id }, { Words: [] });
                client.filters.set(guild.id, []);
                interaction.editReply({ content: `${client.config.true1} Cleared the data.`, ephemeral: true })
                break;
            case "log" :
                const logging = options.getChannel("channel").id;

                await schema.findOneAndUpdate({ Guild: guild.id }, { Log: logging }, { new: true, upsert: true })

                client.filtersLog.set(guild.id , logging);

                interaction.editReply({ content: `${client.config.true1} <#${logging}> Has been added for your banned word(s) logging channel`, ephemeral: true })
                break;
            case "action" :
                const cho = options.getString("options");
                const words = options.getString("word").toLowerCase().split(",");

                switch(cho) {
                    case "add" :
                        schema.findOne({ Guild: guild.id }, async (err, data) => {
                            if(err) throw err;
                            if(!data) {
                                await schema.create({
                                    Guild: guild.id,
                                    Log: null,
                                    Words: words
                                })

                                client.filters.set(guild.id, words) 
                                return interaction.editReply({ content: `${client.config.true1} ${words.length} has been added to the data`});
                            }

                            const newWords = []

                            words.forEach((w) => {
                                if(data.Words.includes(w)) return;
                                newWords.push(w),
                                data.Words.push(w)
                                client.filters.get(guild.id).push(w);
                            }); 

 
                            interaction.repl({ content: `${client.config.true1} ${newWords.length} has been added to the data`});

                            data.save();
                        });
                        break;
                    case "remove" :
                        schema.findOne({ Guild: guild.id }, async (err, data) => {
                            if(err) throw err
                            if(!data) {
                                return interaction.editReply({ content: `${client.config.false1} There is no word(s) in the data` })
                            };

                            const removedWords = [];

                            words.forEach((e) => {
                                if(data.Words.include(w)) return;
                                data.Words.remove(w);
                                removedWords.Words.push(w);
                            });

                            const newArray = client.filters.get(guild.id).filter((word) => !removedWords.includes(word));

                            client.filters.set(guild.id, newArray)
                            interaction.editReply({ content: `${client.config.true1} ${removedWords.length} has been removed from the data`})
                            data.save();
                        })
                        break;
                }
                break;
        }

    }
};