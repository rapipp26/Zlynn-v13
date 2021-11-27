const { CommandInteraction, MessageEmbed, Client } = require('discord.js');
const config = require ('../../Structures/config.json');
const anime = require("anime-actions");

module.exports = { 
    name: 'bite', 
    description: 'Send a bite gift',
    options: [
        {
            name: "target",
            description: "Provide a user",
            type: "USER",
            required: false
        }
    ],
    /**
     * 
     * @param {CommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute(interaction, client) {
        const target = interaction.options.getMember("target")

        if(!target) {
        const embed = new MessageEmbed()
        .setAuthor("Bite 🦷", client.user.avatarURL({ format: "png" }))
        .setImage(await anime.bite())
        .setColor("RANDOM")
        .setFooter(`Executed by ${interaction.user.tag}`, interaction.user.displayAvatarURL({ dynamic: true }))
        .setTimestamp()
        interaction.reply({ embeds: [embed] })

        } else if(target) {
            const embed = new MessageEmbed()
            .setAuthor(`${interaction.user.tag} bites ${target.user.tag} ψ(｀∇´)ψ`, client.user.avatarURL({ format: "png" }))
            .setImage(await anime.bite())
            .setColor("RANDOM")
            .setFooter(`Executed by ${interaction.user.tag}`, interaction.user.displayAvatarURL({ dynamic: true }))
            .setTimestamp()
            interaction.reply({ embeds: [embed] })

        }
    }
}