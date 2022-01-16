const { Message, MessageEmbed } = require("discord.js");
const DB = require("../../Schemas/afkDB");

module.exports = {
    name: "messageCreate",
    /**
     * 
     * @param {Message} message 
     * @param {Client} client 
     */
    async execute(message, client) {
        if(message.author.bot) return;  

        // await DB.deleteOne({ GuildID: guild.id, UserID: message.author.id });

        if(message.mentions.members.size) {
            const embed = new MessageEmbed()
            .setColor("DARK_VIVID_PINK")
            .setAuthor("AFK Status 😴", client.user.avatarURL({ format: "png" }))
            .setFooter("Do not disturb them please!")
            .setTimestamp()

            message.mentions.members.forEach((m) => {
                DB.findOne({ GuildID: message.guild.id, UserID: m.id }, async (err, data) => {
                    if(err) throw err;
                    if(data)
                    embed.addField("Reason",`\`\`\`cs\n# ${data.Status}\n\`\`\``)
                    return message.reply({ embeds: [embed] })
                })
            })
        }

        DB.findOne({ GuildID: message.guild.id, UserID: m.id }, async (err, data) => {
            if(err) throw err;
            if(data)
            await DB.deleteOne({ GuildID: guild.id, UserID: message.author.id });
            return message.reply({ content: `${client.config.true1} Your afk status has been removed.`})
        })
    }
}   