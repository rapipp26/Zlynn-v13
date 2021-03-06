const { MessageEmbed } = require(`discord.js`);
const schema = require("../../Schemas/chatFilterDB");

module.exports = {
    name: "filter",
    cooldown: 10,
    description: "Filter some word(s) from your server",
    permission: "MANAGE_MESSAGES",
    options : [
        {
            name: "clear",
            description: "Clear all word(s) from the data",
            type: "SUB_COMMAND"
        },
        {
            name: "list",
            description: "List your word(s) data.",
            type: "SUB_COMMAND"
        },
        {
            name: "log",
            description: "Setup your filter log channel",
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
            name: "config",
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
                },
                {
                    name: "word",
                    description: "Provide the word to add/remove, add multiple words by placing comma. example: (word1,word2,word3)",
                    type: "STRING",
                    required: true
                }
            ]
        },
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
                if(!Data) return interaction.editReply({ content: `${client.config.cancel} There is no data for the filter system.`, ephemeral: true })
                const embed = new MessageEmbed()
                .setAuthor({ name: "Banned word(s) list!", iconURL: client.user.avatarURL({ format: "png" })})
                .setColor("BLURPLE")
                .setDescription(`${Data.Words.map((a,b) => `\`${b+1}.\` ${a}`).join("\n")}`)
                .setFooter(`Executed by ${interaction.user.tag}`, interaction.user.displayAvatarURL({ dynamic: true }))
                .setTimestamp();
                interaction.editReply({ embeds: [embed] })
                break;
            case "clear" :
                await schema.findOneAndUpdate({ Guild: guild.id }, { Words: [] });
                client.filters.set(guild.id, []);
                interaction.editReply({ content: `${client.config.delete} Cleared the data.`, ephemeral: true })
                break;
            case "log" :
                const logging = options.getChannel("channel").id;

                await schema.findOneAndUpdate({ Guild: guild.id }, { Log: logging }, { new: true, upsert: true })

                client.filtersLog.set(guild.id , logging);

                interaction.editReply({ content: `${client.config.folder} <#${logging}> Has been added for your filter logging channel`, ephemeral: true })
                break;
            case "config" :
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

                                await client.filters.set(guild.id, words);

                                return interaction.editReply({ content: `${client.config.folder} ${words.length} word(s) has been added to the data`});
                            }

                            const newWords = [];

                            words.forEach((w) => {
                                if(data.Words.includes(w)) return;
                                newWords.push(w);
                                data.Words.push(w);
                                client.filters.get(guild.id).push(w);
                            }); 

 
                            interaction.editReply({ content: `${client.config.folder} ${newWords.length} word(s)has been added to the data`});

                            data.save();
                        });
                        break;
                    case "remove" :
                        schema.findOne({ Guild: guild.id }, async (err, data) => {
                            if(err) throw err;
                            if(!data) {
                                return interaction.editReply({ content: `${client.config.cancel} There is no word(s) in the data` })
                            };

                            const removedWords = [];

                            words.forEach((w) => {
                                if(!data.Words.includes(w)) return;
                                data.Words.remove(w);
                                removedWords.push(w);
                            });

                            const newArray = client.filters.get(guild.id).filter((word) => !removedWords.includes(word));

                            client.filters.set(guild.id, newArray)
                            interaction.editReply({ content: `${client.config.delete} ${removedWords.length} word(s) has been removed from the data`})
                            data.save();
                        })
                        break;
                }
                break;
        }

    }
};