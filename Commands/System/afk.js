const { MessageEmbed } = require(`discord.js`)
const DB = require("../../Schemas/afkDB");

module.exports = {
    name: "afk",
    cooldown: 15,
    description: "Set an AFK status.",
    options: [
        {
            name: "set",
            type: "STRING",
            description: "Provide the afk reason",
            required: true
        }
    ],
    /**
     * 
     * @param {CommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute(interaction, client) {
        const { options, user, guild, createdTimestamp } = interaction;
        const reason = options.getString("set");

        try {
            await DB.findOneAndUpdate(
                { GuildID: guild.id, UserID: user.id },
                { Status: reason, Time: parseInt(createdTimestamp / 1000) },
                { new: true, upsert: true }
            )
            const embed = new MessageEmbed()
            .setAuthor("AFK Status 😴", client.user.avatarURL({ format: "png" }))
            .setColor("BLURPLE")
            .setDescription("Your afk status has been set. if someone mention you, the reason you type will reply them.")
            .addField("Reason",`\`\`\`yaml\n${reason}\n\`\`\``)
            .setThumbnail(user.avatarURL({ dynamic: true }))
            .setFooter(`Executed by ${user.tag}`, user.displayAvatarURL({ dynamic: true }))
            .setTimestamp();
            
            return interaction.reply({ embeds: [embed], ephemeral: true })
        } catch (e) {
            console.log(e);         
        }

    }
};