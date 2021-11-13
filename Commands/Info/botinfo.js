const { CommandInteraction, MessageEmbed, Client } = require('discord.js');
const { true1, false1, arrow, reply1, reply2, thumbsup, thumbsdown } = require ('../../config.json');

module.exports = { 
    name: 'botinfo', 
    description: 'Gives the information about me',
    /**
     * 
     * @param {CommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute(interaction, client) {
        const embed = new MessageEmbed()
        .setAuthor("Information about me :3")
        .setThumbnail(client.user.displayAvatarURL({ format: "png" }))
        .setColor("BLURPLE")
        .setFields(
        {
            name: "・Username",
            value: `\`${client.user.username}\``,
            inline: true
        },
        {
            name: "・Discriminator",
            value: `\`${client.user.discriminator}\``,
            inline: true
        },
        {
            name: "・ID",
            value: `\`${client.user.id}\``,
            inline: true
        },
        {
            name: "・Servers",
            value: `\`${client.guilds.cache.size.toLocaleString()}\``,
            inline: true
        },
        {
            name: "・Channels",
            value: `\`${client.channels.cache.size.toLocaleString()}\``,
            inline: true
        },
        {
            name: "・Users",
            value: `\`${client.users.cache.size.toLocaleString()}\``,
            inline: true
        },
        )
        .setFooter(`Executed by ${interaction.user.tag}`, interaction.user.displayAvatarURL({ dynamic: true }))
        .setTimestamp();
        interaction.reply({ embeds: [embed], fetchReply: true })
        interaction.guild.fetchOwner().then(console.log);
    }
}