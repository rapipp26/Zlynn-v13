const { CommandInteraction, MessageEmbed } = require('discord.js');
const { true1, false1, arrow, reply1, reply2 } = require ('../../config.json');

module.exports = { 
    name: 'gay', 
    description: 'Make target avatar with gay overlay',
    options: [
        {
            name: "target",
            description: "The target to make avataar with gay overlay",
            type: "USER",
            required: true
        },
    ],
    /**
     * 
     * @param {CommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute(interaction, client) {
        const target = interaction.options.getMember("target")
        
        const embed = new MessageEmbed()
        .setAuthor("Pride flag is strict...")
        .setColor("RANDOM")
        .setImage(`https://some-random-api.ml/canvas/gay?avatar=${target.displayAvatarURL()}`)
        .setFooter(`Executed by ${interaction.user.tag}`, interaction.user.displayAvatarURL({ dynamic: true }))
        .setTimestamp()
        interaction.reply({ embeds: [embed] })
    }
}