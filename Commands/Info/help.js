const { CommandInteraction, MessageEmbed } = require('discord.js');
const { true1, false1, arrow, reply1, reply2 } = require ('../../config.json');

module.exports = { 
    name: 'help', 
    description: 'Gives my command information!! <3',
    /**
     * 
     * @param {CommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute(interaction, client) {
        const embed = new MessageEmbed()
        .setAuthor("Command Information")
        .addFields(
            {
                name: "Anime",
                value: "\`\`\`/hug\n/wink\n/pat\`\`\`",
                inline: true
            },
            {
                name: "Information",
                value: "\`\`\`/help\n/status\`\`\`",
                inline: true
            },
            {
                name: "Overlay",
                value: "\`\`\`/gay\`\`\`",
                inline: true
            },
            {
                name: "Zoo",
                value: "\`\`\`/bird\n/cat\n/dog\n/fox\n/kangaroo\n/koala\n/panda\n/raccoon\n/redpanda\n/whale\`\`\`",
                inline: true
            },
            {
                name: "Memes",
                value: "\`\`\`/token\n/reddit\n/simpcard\n/stupid\n/youtube\`\`\`",
                inline: true
            }
        )
        .setColor("BLURPLE")
        .setFooter(`Executed by ${interaction.user.tag}`)
        .setTimestamp()
        .setThumbnail(interaction.user.displayAvatarURL({ dynamic: true }))
        interaction.reply({ embeds: [embed], ephemeral: true })
    }
}