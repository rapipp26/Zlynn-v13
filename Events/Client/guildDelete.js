const { CommandInteraction, Client, MessageEmbed } = require("discord.js");

module.exports = {
    name: 'guildDelete',
    /**
     * @param {CommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute(interaction, client) {
        const guild = interaction;

        const embed = new MessageEmbed()
        .setColor("GREEN")
        .setTitle("The bot left a server")
        .setDescription(`${client.user.tag} was removed from a server.`)
        .setFields(
            {name: "Guild Name:", value: `${guild.name}`, inline: true},
            {name: "Guild Members:", value: `${guild.memberCount}`, inline: true},
            {name: "Total Guilds", value: `${client.guilds.cache.size}`},
            {name: "Total Users", value: `${client.users.cache.size}`}
        )
        .setTimestamp();
        
        const logC = client.channels.cache.get("948060231332692022")

        logC.send({ embeds: [embed] })
    },
};