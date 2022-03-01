const { CommandInteraction, Client, MessageEmbed } = require("discord.js");

module.exports = {
    name: 'guildDelete',
    /**
     * @param {CommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute(interaction, client) {
        const guild = interaction;

        const Log = new MessageEmbed()
        .setColor("RED")
        .setAuthor({name: `I was removed fromm a guild`, iconURL: client.user.displayAvatarURL()})
        .addFields(
            {name: "Guild Name", value: `\`\`\`${guild.name}\`\`\``},
            {name: "Guild ID", value: `\`\`\`${guild.id}\`\`\``},
            {name: "Guild Owner", value: `<@${guild.ownerId}>`},
            {name: "Guild Members", value: `\`\`\`${guild.memberCount}\`\`\``},
        )
        .setThumbnail(guild.iconURL({ dynamic: true }))
        .setTimestamp();
        
        const logC = client.channels.cache.get("948060231332692022")

        logC.send({ embeds: [Log] })
    },
};