const { CommandInteraction, MessageEmbed, Client } = require('discord.js');
const config = require ('../../Structures/config.json');
const anime = require("anime-actions");

module.exports = { 
    name: 'cuddle', 
    description: 'Send a cuddle gift',
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
        .setAuthor("Cuddle `(*>﹏<*)′", client.user.avatarURL({ format: "png" }))
        .setImage(await anime.cuddle())
        .setColor("RANDOM")
        .setFooter(`Executed by ${interaction.user.tag}`, interaction.user.displayAvatarURL({ dynamic: true }))
        .setTimestamp()
        interaction.reply({ embeds: [embed] })

        } else if(target) {
            const embed = new MessageEmbed()
            .setAuthor(`${interaction.user.tag} cuddles to ${target.user.tag} >,<`, client.user.avatarURL({ format: "png" }))
            .setImage(await anime.blush())
            .setColor("RANDOM")
            .setFooter(`Executed by ${interaction.user.tag}`, interaction.user.displayAvatarURL({ dynamic: true }))
            .setTimestamp()
            interaction.reply({ embeds: [embed] })

        }
    }
}