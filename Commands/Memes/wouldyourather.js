const { CommandInteraction, MessageEmbed, Client } = require('discord.js');
const { true1, false1, arrow, reply1, reply2, thumbsup, thumbsdown } = require ('../../config.json');

module.exports = { 
    name: 'wouldyourather', 
    description: 'Gives "Would you rather question"',
    /**
     * 
     * @param {CommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute(interaction, client) {
        const API = require('leoapi.xyz');
        const leo = new API();
        const embed = new MessageEmbed();

        leo.fun('wouldyourather', {}).then(async data => {
            embed.setAuthor("Would you rather..? 🤨")
            .setColor("RANDOM")
            .addFields( { name: "Option 1", value: `${data.option_1}`}, { name: "Option 2", value: `${data.option_2}`} )
            .setFooter(`Executed  by ${interaction.user.tag}`)
            .setTimestamp()
            const message = await interaction.editReply({ embeds: [embed], fetchReply: true })
            message.react("1️⃣")
            message.react("2️⃣")
        })

    } 
}